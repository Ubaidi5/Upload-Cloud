import LoadingOutlined from "@public/icons/loading.svg";

export default function Loading() {
  return (
    <div className="flex items-center jc-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <LoadingOutlined className="rotate mb-2" style={{ width: 64, color: "#6338FA" }} />
        <p className="fc-light fs-16 fw-600">Please wait...</p>
      </div>
    </div>
  );
}
