import PlanPage from "./index";

function Plan() {
  return (
    <main>
      <section className="py-3">
        <div className="card p-2 flex items-center gap-3">
          <img
            src="/images/app-icon-light.svg"
            width={56}
            height={56}
            alt="Upload Cloud"
            style={{ borderRadius: 12 }}
          />
          <div>
            <h1 className="fs-24 fc-light fw-800">Upload Cloud</h1>
            <p className="fc-dark fs-13">Enable user to attach Images in orders!</p>
          </div>
        </div>
      </section>

      <PlanPage />
    </main>
  );
}

export default Plan;
