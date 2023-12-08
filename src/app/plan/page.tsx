import PlanPage from "./index";

function Plan() {
  return (
    <main>
      <section className="py-3">
        <div className="card p-2 flex items-center gap-8">
          <img src="/images/fav-icon-light.svg" width={56} height={56} alt="Photo Comet" />
          <div>
            <h2 className="fc-light fw-800">Photo Comet</h2>
            <p className="fc-dark fs-13">Upload Image & Customize Order with Comet Base</p>
          </div>
        </div>
      </section>

      <PlanPage />
    </main>
  );
}

export default Plan;
