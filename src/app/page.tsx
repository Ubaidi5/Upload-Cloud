import Dashboard from "./dashboard";
import getInstanceId from "@/helper/getInstanceId";

async function get_all_fields(instanceId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/field`, {
      method: "GET",
      headers: { "X-InstanceId": instanceId, "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}

async function load_store(instanceId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store/load`, {
      method: "GET",
      headers: { "X-InstanceId": instanceId },
      cache: "no-store",
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}

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

async function Page(props: any) {
  const instanceId = getInstanceId(props.searchParams.instance);
  const locale = props.searchParams.locale || "en";

  const [fields, appData, orders] = await Promise.all([
    get_all_fields(instanceId),
    load_store(instanceId),
    get_store_orders(instanceId),
  ]);

  if (fields.error) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <h1>Oops!</h1>
        <h5>Something went wrong</h5>
      </div>
    );
  }

  return (
    <>
      <Dashboard fields={fields} appData={appData} total_uploads={orders.length} locale={locale} />
    </>
  );
}

export default Page;

export const dynamic = "force-dynamic";
