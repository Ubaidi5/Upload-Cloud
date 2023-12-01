import PlanPage from "./index";

function Plan() {
  return (
    <main>
      <section className="py-3">
        <div className="card p-2 flex items-center gap-8">
          <img src="/images/fav-icon-light.svg" width={56} height={56} alt="Floating icons" />
          <div>
            <p className="fc-light fw-800">Floating Icons</p>
            <p className="fc-dimm fs-12">Upload with care</p>
          </div>
        </div>
      </section>

      <PlanPage />
    </main>
  );
}

export default Plan;
