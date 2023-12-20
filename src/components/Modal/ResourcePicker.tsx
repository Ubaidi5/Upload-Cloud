import { MutableRefObject, UIEvent, useCallback, useEffect, useRef, useState } from "react";
import { message, Modal, Input, Button, Spinner } from "@/custom";
import { APIS, errorHandler, useAPI } from "@/apis/config";

import styled from "styled-components";
import CancelIcon from "public/icons/cancel.svg";

import SearchOutlined from "@public/icons/search.svg";

const Loading: React.FC = () => (
  <section className="flex justify-center items-center">
    <div className="text-center">
      <Spinner stroke={3} width={48} />
      <h3>Loading</h3>
    </div>
  </section>
);

type Meta = {
  totalResult: number;
  items: number;
  offset: number;
  search: string;
};

const ResourcePicker: React.FC<ResourcePickerInterface> = (props) => {
  const { open, onCancel, type, onSelection, initialSelections, selectedVariants } = props;

  const metaRef = useRef({ offset: 0, search: "" }) as MutableRefObject<Meta>;
  const timeoutID = useRef() as MutableRefObject<NodeJS.Timeout>;

  const [allProducts, setAllProducts] = useState<ProductInterface[]>([]);

  const [get_products, getProductsLoading] = useAPI(APIS.get_products);

  const getAllProducts = async (body: any) => {
    try {
      const { data } = await get_products({ ...body, limit: 10 });
      const tempData: Array<ProductInterface> = data.products || data.collections;

      /**
       * Populating initial selections
       */
      if (initialSelections && type !== "variants") {
        initialSelections.forEach((product) => {
          const item = tempData.find((p) => p.id === product.id);
          item && (item.isSelected ??= true);
        });
      } else if (initialSelections && type === "variants") {
        // checked all selected variants
        selectedVariants?.forEach((item) => {
          const product = tempData.find((p) => p.id === item.product); // Find current product
          if (!product) return; // Stop if no product found

          if (item.hasOwnProperty("value") === false) {
            product.isSelected ??= true;
            return;
          }

          const variant = product.productOptions.find((v) => v.name === item.option); // Find current variant
          if (!variant) return; // Stop if no vatiant found

          const choice = variant.choices.find((c) => c.value === item.value); // Find current choice
          if (!choice) return; // Stop if no choices found

          choice.isSelected ??= true; // make the choice selected
        });
      }

      metaRef.current.search?.length
        ? setAllProducts([...tempData])
        : setAllProducts([...allProducts, ...tempData]);

      metaRef.current = {
        ...data.metadata,
        totalResult: data.totalResults,
      };
      //--------------------- End of try ----------------------------//
    } catch (err) {
      console.log("ERROR", errorHandler(err));
      message.error(errorHandler(err));
    }
  };

  const on_selection = () => {
    let selectedItems: Array<ProductInterface> = [];
    let selectedVaraints: Array<any> = [];

    if (type === "variants") {
      selectedItems = allProducts.reduce(
        (init: Array<ProductInterface>, product: ProductInterface) => {
          //
          const variants: Array<VariantInterface> = []; // It will contain only selected variant and choices

          if (product.productOptions.length === 0 && product.isSelected) {
            selectedVaraints.push({ product: product.id });
            init.push(product);
            return init;
          }

          product.productOptions.forEach((variant: VariantInterface) => {
            // filtering all selected choices
            const selectedChoices = variant.choices.filter((choice: ChoicesInterface) => {
              if (choice.isSelected) {
                selectedVaraints.push({
                  option: variant.name,
                  value: choice.value,
                  product: product.id,
                });
                return true;
              } else {
                return false;
              }
            });

            // If selected choice length is greater than 0 than this variant and its filterd choice stored in variants array created above.
            if (selectedChoices.length > 0) {
              variants.push({ ...variant, choices: selectedChoices });
            }
          });
          variants.length > 0 && init.push(product); // Push product if any vairant has length greater than 0
          product.productOptions = [...variants]; // Replacing original product options with selected variants

          return init;
        },
        []
      );
    } else {
      selectedItems = allProducts.filter((product: ProductInterface) => product.isSelected);
    }

    // console.log("Selected Variants", selectedVaraints);
    onSelection?.(selectedItems, selectedVaraints);
    onCancel?.();
  };

  const debounce = useCallback(
    (search: string) => {
      clearTimeout(timeoutID.current);

      timeoutID.current = setTimeout(() => {
        metaRef.current.search = search;
        getAllProducts({ offset: 0, search, type });
      }, 600);
    },
    [open]
  );

  const handleScrollEnd = (e: UIEvent<HTMLDivElement>) => {
    const { offsetHeight, scrollHeight, scrollTop } = e.currentTarget;

    if (
      offsetHeight + scrollTop >= scrollHeight && // When scroll to end
      allProducts.length < metaRef.current.totalResult // If all products is not fetched
    ) {
      const offset = metaRef.current.offset + metaRef.current.items;
      getAllProducts({ offset, search: metaRef.current.search, type });
    }
  };

  useEffect(() => {
    if (open) {
      allProducts.length = 0;
      getAllProducts({ offset: 0, type: type, search: metaRef.current.search });
    }
  }, [open]);

  return (
    <StyledModal open={open} onCancel={() => onCancel?.()} style={{ padding: 0 }}>
      <header className="header">
        <div className="p-3 flex items-center justify-between">
          <p className="m-0 pl-1 fs-20 capitalize">{type}</p>
          <CancelIcon style={{ height: 16, width: "auto", cursor: "pointer" }} onClick={onCancel} />
        </div>
      </header>

      <div className="p-3">
        <Input
          onChange={(e) => debounce(e.target.value)}
          placeholder="Search"
          prefix={<SearchOutlined style={{ width: 24, color: "#464545" }} />}
        />
      </div>

      <div className="product-list">
        {getProductsLoading && (allProducts.length === 0 || metaRef.current.search) ? (
          <Loading />
        ) : allProducts.length === 0 ? (
          <div>No products found</div>
        ) : (
          <div
            style={{ overflow: "auto", height: "100%", width: "100%" }}
            onScroll={handleScrollEnd}
          >
            {allProducts.map((product: ProductInterface) => (
              <div key={product.id}>
                <section className="product">
                  <input
                    id={product.id}
                    type="checkbox"
                    className="ml-3 checkbox"
                    checked={
                      type === "variants" && product.productOptions.length > 0
                        ? product.productOptions.every((variant) =>
                            variant.choices.every((choice) => choice.isSelected)
                          )
                        : product.isSelected
                    }
                    onChange={(e) => {
                      product.isSelected = e.target.checked;
                      if (type === "variants") {
                        product.productOptions.forEach((variant) => {
                          variant.choices.forEach((choice) => {
                            choice.isSelected = e.target.checked;
                          });
                        });
                      }
                      setAllProducts([...allProducts]);
                    }}
                  />

                  <label htmlFor={product.id} className="flex items-center px-2">
                    <img
                      src={
                        product.media?.mainMedia?.thumbnail.url ||
                        `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dummy_image.png`
                      }
                      className="product-image"
                    />
                    <p className="m-0" style={{ userSelect: "none" }}>
                      {product.name}
                    </p>
                  </label>
                </section>

                {type === "variants" &&
                  product.productOptions?.map((variant, variantIndex) => (
                    /**
                     * Print variants
                     */
                    <div className="ml-3 mb-2">
                      <p className="mb-1 fw-bold">{variant.name}:</p>
                      <section key={variantIndex} className="flex">
                        {variant.choices.map((choice) => (
                          <section
                            key={`${choice.value}-${product.id}`}
                            className="flex items-center mr-2"
                          >
                            {variant.optionType === "color" ? (
                              <div
                                className={`color-box ${choice.isSelected ? "selected" : ""}`}
                                style={{ backgroundColor: choice.value }}
                                onClick={() => {
                                  choice.isSelected = !choice.isSelected;
                                  setAllProducts([...allProducts]);
                                }}
                              />
                            ) : (
                              <>
                                <input
                                  id={`${choice.value}-${product.id}`}
                                  type="checkbox"
                                  className="checkbox"
                                  checked={choice.isSelected}
                                  onClick={() => {
                                    choice.isSelected = !choice.isSelected;
                                    setAllProducts([...allProducts]);
                                  }}
                                />
                                <label htmlFor={`${choice.value}-${product.id}`} className="ml-1">
                                  {choice.value}
                                </label>
                              </>
                            )}
                          </section>
                        ))}
                      </section>
                    </div>
                  ))}
              </div>
            ))}
            {getProductsLoading && allProducts.length > 0 ? <Loading /> : null}
          </div>
        )}
      </div>

      <section
        className="flex justify-between gap-8 py-3 px-8"
        style={{ borderTop: "1px solid #e1e3e5" }}
      >
        <Button outlined="true">Cancel</Button>
        <Button onClick={on_selection}>Select</Button>
      </section>
    </StyledModal>
  );
};

export default ResourcePicker;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }

  .header {
    border-bottom: 1px solid #e1e3e5;
  }

  .product-list {
    height: calc(100vh - 300px);
    max-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .product {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid #e1e3e5;
  }

  .product-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
  }
`;
