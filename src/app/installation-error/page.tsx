function InstallationError() {
  return (
    <div className="flex items-center jc-center" style={{ height: "100vh" }}>
      <div
        className="card bg-white p-5 flex items-center jc-center fd-column"
        style={{ height: 300, width: "70%" }}
      >
        <div>
          <svg
            fill="#9e9e9e"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="80px"
            width="80px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg>
          <h1 style={{ fontSize: 32 }} className="fc-dimm">
            Oops!
          </h1>
        </div>
        <h3 className="mb-2 fs-20 fc-dimm">There is some error with the installation</h3>
        <p className="mb-4 fs-16 fc-dimm">Please re-install the app using the link</p>
        <a
          href="https://www.wix.com/app-market/floating-icons?referral=collection&appIndex=0&referralTag=staff-picks&referralSectionName=staff-picks"
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              border: "1px solid #dcdcdc",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.09)",
              padding: "8px 16px",
              borderRadius: 5,
              backgroundColor: "#6338FA",
              color: "#fff",
            }}
          >
            Install App
          </div>
        </a>
      </div>
    </div>
  );
}

export default InstallationError;
