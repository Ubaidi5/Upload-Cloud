import { Button, Modal } from "@/custom";
import { dateFormatter } from "@/helper/dateFormatter";
import styled from "styled-components";

interface Props {
  open: boolean;
  onCancel: () => void;
  order: Order;
}

const OrderDetailsModal: React.FC<Props> = (props) => {
  const { open, onCancel, order } = props;

  const lineItems: Array<LineItem> = JSON.parse(order.lineItems);

  const buyerInfo: BuyerInfo = JSON.parse(order.buyerInfo);

  return (
    <StyledModal open={open} onCancel={onCancel}>
      <div className="flex justify-between">
        <section>
          <h1>Order #{order.orderNumber}</h1>
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
        {lineItems.map((lineItem) => {
          const data = {};

          return (
            <div className="line-item flex">
              <section className="flex items-center gap-2 flex-1">
                <img className="product-image" src={lineItem.mediaItem.url} />
                <div>
                  <p className="fs-14 fw-600">{lineItem.name}</p>
                  <p className="fc-dimm fs-13">Quantity {lineItem.quantity}</p>
                </div>
              </section>

              <section className="flex-1">
                <p>Images will be shown here</p>
              </section>
            </div>
          );
        })}
      </div>

      <Button style={{ marginLeft: "auto", width: 100 }} onClick={onCancel}>
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
