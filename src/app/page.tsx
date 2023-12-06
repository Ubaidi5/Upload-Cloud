import { Button } from "@/custom";
import DonutPlot from "@/custom/DonutPlot";

export default function Home() {
  return (
    <div className="py-3">
      <div className="flex gap-4">
        <section className="w-[420px] p-5 rounded-xl flex flex-col gap-6 bg-dark">
          <h1 className="fs-16 fw-600 fc-white mb-3">Status Summary</h1>

          <div className="flex items-center gap-24">
            <div>
              <p className="fc-dimm fs-13 mb-2">Uploads used</p>
              <h3 className="fc-light fs-28 fw-600" style={{ lineHeight: "28px" }}>
                587
              </h3>
            </div>
            <div>
              <p className="fc-dimm fs-13 mb-2">Remaining Uploads</p>
              <h3 className="fc-light fs-28 fw-600" style={{ lineHeight: "28px" }}>
                1413
              </h3>
            </div>
          </div>
        </section>

        <section className="w-[420px] p-5 rounded-xl flex justify-between gap-4 bg-dark">
          <div className="flex flex-col">
            <h1 className="fs-16 fw-600 fc-white mb-3">Plan Summary</h1>
            <p className="fc-dimm fs-13 mb-2">Tier 2</p>
            <h3 className="fc-light fs-28 fw-600" style={{ lineHeight: "28px" }}>
              Essential plan
            </h3>
            <Button className="mt-auto" outlined="true" color="#9F9FA5">
              Upgrade
            </Button>
          </div>

          <div>
            <DonutPlot size={120} />
            <p className="text-center fc-white">Usage</p>
          </div>
        </section>
      </div>
    </div>
  );
}
