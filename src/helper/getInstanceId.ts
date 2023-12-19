interface ParsedInstance {
  instanceId: string;
}

const getInstanceId = (instance: string) => {
  const base64 = instance?.split(".")[1];

  const plain = Buffer.from(base64, "base64").toString("utf8");
  const json: ParsedInstance = JSON.parse(plain);
  return json.instanceId;
};
export default getInstanceId;
