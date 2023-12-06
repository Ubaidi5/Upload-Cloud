import { Button } from "@/custom";
import DonutPlot from "@/custom/DonutPlot";

export default function Home() {
  return (
    <div className="py-3">
      <div>
        <section></section>

        <section className="w-[450px] p-5 rounded-xl flex justify-between gap-4 bg-dark">
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
            <DonutPlot size={160} />
            <p className="text-center fc-white">Usage</p>
          </div>
        </section>
      </div>
    </div>
  );
}
