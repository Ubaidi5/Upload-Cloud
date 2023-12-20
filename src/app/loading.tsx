import { Spinner } from "@/custom";

export default function Loading() {
  return (
    <div className="flex items-center justify-center" style={{ height: "100vh" }}>
      <div className="text-center">
        <Spinner className="mb-2" color="#6338FA" />
        <p className="fc-light fs-16 fw-600">Please wait...</p>
      </div>
    </div>
  );
}
