import { Button, Modal } from "@/custom";
import { dateFormatter } from "@/helper/dateFormatter";
import { isEqual } from "@/helper/isEqual";
import styled from "styled-components";
import UCImage from "../UCImage";

interface Props {
  open: boolean;
  onCancel: () => void;
  order: Order;
}

const OrderDetailsModal: React.FC<Props> = (props) => {
  const { open, onCancel, order } = props;

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
        <p className="flex-1">Images</p>
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
                    <UCImage key={imageId} imageId={imageId} orderNumber={order.orderNumber} />
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
