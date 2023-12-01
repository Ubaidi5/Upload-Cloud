interface iframeDataI {
  instanceId: string;
}

const get_instance_id = (instance: string) => {
  const base64 = instance?.split(".")[1];

  const plain = Buffer.from(base64, "base64").toString("utf8");
  const json: iframeDataI = JSON.parse(plain);
  return json.instanceId;
};
export default get_instance_id;
