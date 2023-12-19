import Dashboard from "./dashboard";
import getInstanceId from "@/helper/getInstanceId";

async function get_all_fields(instanceId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/field`, {
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

async function Page(props: any) {
  const instanceId = getInstanceId(props.searchParams.instance);

  const fields = await get_all_fields(instanceId);

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
      <Dashboard fields={fields} />
    </>
  );
}

export default Page;

export const dynamic = "force-dynamic";
