import { Button, Modal, message } from "@/custom";
import { dateFormatter } from "@/helper/dateFormatter";
import { isEqual } from "@/helper/isEqual";
import styled from "styled-components";
// import UCImage from "../UCImage";
import { useState } from "react";
import { APIS, errorHandler, useAPI } from "@/apis/config";
/**
 * Icons
 */
import DownloadIcon from "@public/icons/download.svg";
import LoadingOutlined from "@public/icons/loading.svg";

interface Props {
  open: boolean;
  onCancel: () => void;
  order: Order;
}

const OrderDetailsModal: React.FC<Props> = (props) => {
  const { open, onCancel, order } = props;

  const [loadingIds, setLoadingIds] = useState<Array<string>>([]);

  async function downloadImage(imageId: string, product_name: string, imageNumber: number) {
    try {
      const response = await APIS.get_image({ fileName: imageId });
      const result = await response.blob();
      const url = URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      const extension = imageId.split(".")[1] || "png";
      link.download = `order#${order.orderNumber}__${product_name}_image#${imageNumber}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
      message.error(errorHandler(err));
    } finally {
      const index = loadingIds.indexOf(imageId);
      loadingIds.splice(index, 1);
      setLoadingIds([...loadingIds]);
    }
  }

  const lineItems: Array<LineItem> = JSON.parse(order.lineItems);
  const data: Array<product_options_type> = JSON.parse(order.data);
  const buyerInfo: BuyerInfo = JSON.parse(order.buyerInfo);

  return (
    <StyledModal open={open} onCancel={onCancel} style={{ width: 900 }}>
      <div className="flex justify-between">
        <section>
          <h1 className="fc-light fs-24">Order #{order.orderNumber}</h1>
          <p>Placed on {dateFormatter(order.createdAt)}</p>
          <p>Items ({lineItems.length})</p>
        </section>

        <section className="text-end">
          <p>
            {buyerInfo.firstName} {buyerInfo.lastName}
          </p>
          <p>{buyerInfo.email}</p>
          <p>{buyerInfo.phone}</p>
        </section>
      </div>

      <div className="header flex my-2">
        <p className="flex-1">Product Name</p>
        <p className="flex-1">
          <span>Images </span>
          <span className="fs-11">(Click on download button to get the image)</span>
        </p>
      </div>

      <div>
        {lineItems.map((lineItem, index) => {
          const obj1: { [key: string]: any } = {
            ...lineItem.catalogReference?.options.options,
            ...lineItem.catalogReference?.options.customTextFields,
          }; // this object hold data from line items that comes from the wix order API

          const currentField = data.find((d) => {
            const obj2: any = {}; // This object hold data from selected variants that comes from the app
            d.selected_variants.forEach((v) => (obj2[v.title] = v.value));

            const isMatched = isEqual(obj1, obj2);

            if (lineItem.productName.original === d.name && isMatched) {
              return true;
            }

            return false;
          });

          return (
            <div key={index} className="line-item flex">
              <section className="flex items-center gap-2 flex-1">
                <img className="product-image" src={lineItem.image.url} />
                <div>
                  <p className="fs-14 fw-600">{lineItem.productName.original}</p>
                  <p className="fc-dimm fs-13">Quantity {lineItem.quantity}</p>
                  {Object.entries(obj1).map(([key, value]) => (
                    <p className="fc-dimm fs-13">
                      {key}: {value}
                    </p>
                  ))}
                </div>
              </section>

              <section className="flex-1 flex gap-4">
                {currentField &&
                  currentField.images.map((imageId) => (
                    <div
                      style={{ width: 48, height: 48 }}
                      className="flex items-center justify-center rounded bg-[#6338FA] cursor-pointer"
                      onClick={() => {
                        loadingIds.push(imageId);
                        setLoadingIds([...loadingIds]);
                        downloadImage(imageId, lineItem.productName.original, index + 1);
                      }}
                    >
                      {loadingIds.includes(imageId) ? (
                        <LoadingOutlined style={{ width: 24, color: "#fff" }} className="rotate" />
                      ) : (
                        <DownloadIcon style={{ width: 24, height: 24, color: "#fff" }} />
                      )}
                    </div>
                    // <UCImage key={imageId} imageId={imageId} orderNumber={order.orderNumber} />
                  ))}
              </section>
            </div>
          );
        })}
      </div>

      <Button
        style={{ marginInline: "auto", width: 150, marginTop: 16, height: 40 }}
        onClick={onCancel}
      >
        Close
      </Button>
    </StyledModal>
  );
};

export default OrderDetailsModal;

const StyledModal = styled(Modal)`
  padding: 24px;
  width: 90vh;

  .header {
    padding: 12px;
    background-color: #dfe7ed;
    font-size: 14px;
  }

  .line-item {
    border-bottom: 1px solid #dcdcdc;
    padding: 8px 0;
  }

  .line-item:last-child {
    border: none;
  }

  .product-image {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
