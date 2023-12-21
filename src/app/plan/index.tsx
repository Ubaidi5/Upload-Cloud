"use client";
import { useState } from "react";
import { useAppData } from "@/context/store";
import { getDifferenceInDays } from "@/helper/getDifferenceInDays";
import { Button, Segment, AppLink } from "@/custom";
import ErrorIcon from "@public/icons/error.svg";
import ArrowIcon from "@public/icons/arrow.svg";

const plans = [
  {
    id: "basic",
    name: "Basic",
    yearly: "0",
    monthly: "0",
    features: [
      "50 uploads linked to orders",
      "Max. 5MB upload file size",
      "File uploads stored for 10 days",
      "Limited support",
    ],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/00d6a9b1-c8e1-4a29-a574-6290762688d4/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
  {
    id: "essential",
    name: "Essential",
    monthly: "3.99",
    yearly: "2.99",
    features: [
      "Unlimited file uploads",
      "500 uploads linked",
      "Max. 20MB upload file size",
      "10GB archive space",
    ],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/51caf23e-220e-43b3-829d-924ad4e4a6dd/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
  {
    id: "pinnacle",
    name: "Pinnacle",
    yearly: "5.99",
    monthly: "7.99",
    features: [
      "2,000 uploads linked to orders",
      "Max. 50MB upload file size",
      "50GB archive space",
      "24/7 support",
    ],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/51caf23e-220e-43b3-829d-924ad4e4a6dd/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
  {
    id: "infinite",
    name: "Infinite",
    yearly: "11.99",
    monthly: "14.99",
    features: [
      "Unlimited uploads linked to orders",
      "Max. 100MB upload file size",
      "100GB archive space",
      "24/7 support",
    ],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/51caf23e-220e-43b3-829d-924ad4e4a6dd/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
];

type plan_types = "basic" | "essential" | "pinnacle" | "infinite";

const PlanPage: React.FC = () => {
  const [appData] = useAppData();
  const [segment, setSegment] = useState("monthly");

  const current_plan = (appData.instance.billing?.packageName || "essential") as plan_types;

  const remaining_days =
    30 -
    getDifferenceInDays(
      new Date(appData.store?.installedAt || new Date()).getTime(),
      new Date().getTime()
    );

  return (
    <>
      {remaining_days <= 0 && current_plan === "basic" ? (
        <section
          style={{
            backgroundColor: "#fff4f4",
            border: "1px solid #e0b3b2",
            borderRadius: 6,
          }}
          className="mb-2 p-3"
        >
          <div className="flex">
            <ErrorIcon className="mr-2" />
            <div>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Trial expired please upgrade</p>
              <p className="m-0">Please choose a paid plan</p>
            </div>
          </div>
        </section>
      ) : (
        <AppLink href="/">
          <div className="mb-2 flex items-center gap-3">
            <span
              style={{ width: 28, height: 28, borderRadius: 4, border: "1px solid #dcdcdc" }}
              className="flex items-center justify-center"
            >
              <ArrowIcon style={{ width: 12, rotate: "-90deg", color: "#797979" }} />
            </span>
            <p className="m-0">Back</p>
          </div>
        </AppLink>
      )}

      <div className="card p-5 bg-white">
        <div className="text-center">
          <h2 className="fc-dark fs-28 fw-700">Upgrade Your App Today</h2>
          <p className="mt-3 fc-dark">Choose a plan that suits you best</p>
        </div>

        <Segment
          className="mt-5 mb-10 mx-auto"
          value={segment}
          onChange={setSegment}
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
        />

        <div className="flex justify-center mt-5 bg-white" style={{ border: "1px solid #dcdcdc" }}>
          {plans.map((plan, index) => {
            const [w, d] = plan[segment as "yearly" | "monthly"].split("."); // whole | decimal
            return (
              <div key={index} style={{ flex: 1 }}>
                <div
                  style={{
                    position: "relative",
                    boxShadow: "box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.025)",
                    borderRight: index === 3 ? "none" : "1px solid #dcdcdc",
                  }}
                >
                  {plan.id === current_plan &&
                  appData.instance.billing?.billingCycle === segment.toUpperCase() ? (
                    <div
                      className="bg-light fc-white fs-12 fw-600 p-1 text-center"
                      style={{
                        position: "absolute",
                        top: -24,
                        left: -1,
                        right: -1,
                        textTransform: "uppercase",
                      }}
                    >
                      Current Plan
                    </div>
                  ) : null}

                  <section style={{ zIndex: "10" }}>
                    <h3 className="text-center fs-24 pt-3">{plan.name}</h3>

                    {plan.id === "basic" ? (
                      <div className="text-center fs-24 mt-4 fw-500">Free</div>
                    ) : (
                      <div className="my-3 fs-24 flex justify-center">
                        <p>$</p>
                        <span className="fw-500">{w}</span>
                        <div>
                          <p>{d}</p>
                          <p>/{segment}</p>
                        </div>
                      </div>
                    )}

                    <Button
                      className="mt-5 mb-3 mx-auto px-5"
                      onClick={() => {
                        plan.route(appData.site.siteId);
                      }}
                      style={{ width: "max-content" }}
                    >
                      Upgrade
                    </Button>

                    {plan.features.map((item, index) => (
                      <p
                        key={index}
                        className="py-2 text-center"
                        style={{ borderTop: "1px solid #dcdcdc" }}
                      >
                        {item}
                      </p>
                    ))}
                  </section>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlanPage;
