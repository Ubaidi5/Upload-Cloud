import axios from "axios";
import { redirect } from "next/navigation";

async function install(code: string) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/install`, { code });
  await axios.post(
    "https://www.wixapis.com/apps/v1/bi-event",
    { eventName: "APP_FINISHED_CONFIGURATION" },
    { headers: { Authorization: `${res.data}` } }
  );
  return res;
}

const Page = async (props: any) => {
  const code = props.searchParams.code;

  const { data } = await install(code);

  redirect(`https://www.wix.com/installer/close-window?access_token=${data}`);

  return <div>Installing</div>;
};

export default Page;
