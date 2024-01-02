import getInstanceId from "@/helper/getInstanceId";
import Uploads from "./uploadPage";

async function get_store_orders(instanceId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`, {
      method: "GET",
      headers: { "X-InstanceId": instanceId },
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return { error: true };
  }
}

async function page(props: any) {
  const instanceId = getInstanceId(props.searchParams.instance);

  const allOrders = await get_store_orders(instanceId);

  if (allOrders.error) {
    return (
      <div>
        <h1>Error in get order api</h1>
      </div>
    );
  }

  return <Uploads orders={allOrders} />;
}

export default page;

export const dynamic = "force-dynamic";
