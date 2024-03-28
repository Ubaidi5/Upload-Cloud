"use client";
import Table from "@/custom/Table";
// import DownloadIcon from "@public/icons/download.svg";
import TrashIcon from "@public/icons/trash.svg";
import EyeIcon from "@public/icons/eye-filled.svg";
import { Modal, Button, message } from "@/custom";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { dateFormatter } from "@/helper/dateFormatter";
import OrderDetailsModal from "@/components/Modal/OrderDetailModal";
import { APIS, errorHandler, useAPI } from "@/apis/config";

interface Props {
  instanceId: string;
  orders?: Array<Order>;
}

const Uploads: React.FC<Props> = (props) => {
  const { instanceId } = props;

  const orderRef = useRef() as MutableRefObject<Order>;

  const [allOrders, setAllOrders] = useState<Array<Order>>([]);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [orderDetailModal, toggleDetailModal] = useState(false);
  const [order_loading, toggleLoading] = useState(true);

  const [delete_order, loading] = useAPI(APIS.delete_order);

  async function handleDelete() {
    try {
      await delete_order(orderRef.current._id);
      const index = allOrders.findIndex((o) => o._id === orderRef.current._id);
      index >= 0 && allOrders.splice(index, 1);
      setAllOrders([...allOrders]);
      toggleDeleteModal(false);
    } catch (err) {
      message.error(errorHandler(err));
    }
  }

  async function get_store_orders(instanceId: string) {
    try {
      toggleLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`, {
        method: "GET",
        headers: { "X-InstanceId": instanceId },
        cache: "no-store",
      });

      const data = await response.json();

      setAllOrders(data);
    } catch (err) {
      message.error(errorHandler(err));
    } finally {
      toggleLoading(false);
    }
  }

  useEffect(() => {
    if (instanceId) {
      get_store_orders(instanceId);
    }
  }, [instanceId]);

  return (
    <>
      <Modal
        open={deleteModal}
        onCancel={() => toggleDeleteModal(false)}
        className="py-5"
        style={{ width: 500 }}
      >
        <h1 className="text-center fc-danger fs-24">Warning!</h1>
        <h3 className="text-center mt-5 mb-8">This action will permanently delete your files</h3>

        <div className="flex items-center justify-center gap-12">
          <Button onClick={() => toggleDeleteModal(false)}>Cancel</Button>
          <Button bgcolor="#f95f53" onClick={handleDelete} loading={loading}>
            Delete
          </Button>
        </div>
      </Modal>

      {orderRef.current?._id ? (
        <OrderDetailsModal
          open={orderDetailModal}
          onCancel={() => {
            toggleDetailModal(false);
          }}
          order={orderRef.current}
        />
      ) : null}

      <div className="py-8">
        <Button bgcolor="#1e1e2c" className="my-5" onClick={() => get_store_orders(instanceId)}>
          Refresh files
        </Button>
        <Table
          loading={order_loading}
          data={allOrders}
          columns={[
            {
              title: "Order",
              data: (data: Order) => <p>#{data.orderNumber}</p>,
              width: 100,
            },
            {
              title: "Products",
              data: (order: Order) => {
                const data: Array<product_options_type> = JSON.parse(order.data);

                const productName = data.map((d) => d.name).join(", ");

                return <p>{productName}</p>;
              },
              width: 300,
            },
            {
              title: "Date",
              data: (order: Order) => <p>{dateFormatter(order.createdAt)}</p>,
            },
            {
              title: "Customer",
              data: (order: Order) => {
                const buyerInfo: BuyerInfo = JSON.parse(order.buyerInfo);
                return (
                  <p>
                    {buyerInfo.firstName} {buyerInfo.lastName}
                  </p>
                );
              },
            },
            {
              title: <p className="text-center">Files</p>,
              data: (order: Order) => {
                const data: Array<product_options_type> = JSON.parse(order.data);

                const images = data.reduce((accu: Array<string>, curr) => {
                  accu = accu.concat(curr.images);
                  return accu;
                }, []);

                return (
                  <div className="flex items-center justify-center gap-3" style={{ width: "100%" }}>
                    <span>{images.length} Files</span>
                    {/* <span
                      style={{ backgroundColor: "#193b670d" }}
                      className="rounded py-2 px-3"
                      role="button"
                    >
                      <DownloadIcon style={{ width: 18, color: "#01b6a0" }} />
                    </span> */}
                  </div>
                );
              },
            },
            {
              title: <p className="text-center">Actions</p>,
              data: (order: Order) => (
                <div className="flex items-center justify-center gap-3" style={{ width: "100%" }}>
                  <span
                    style={{ backgroundColor: "#193b670d" }}
                    className="rounded py-2 px-3"
                    role="button"
                    onClick={() => {
                      orderRef.current = order;
                      toggleDetailModal(true);
                    }}
                  >
                    <EyeIcon style={{ width: 20, color: "#01b6a0" }} />
                  </span>

                  <span
                    role="button"
                    style={{ backgroundColor: "#193b670d" }}
                    className="rounded py-2 px-3"
                    onClick={() => {
                      orderRef.current = order;
                      toggleDeleteModal(true);
                    }}
                  >
                    <TrashIcon style={{ width: 20, color: "var(--danger)" }} />
                  </span>
                </div>
              ),
              width: 160,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Uploads;
