"use client";

import { useState } from "react";
import Button from "@/components/button";
import { useAppData } from "@/context/store";
import Segment from "@/components/Segment";
import { getDifferenceInDays } from "@/helper/getDifferenceInDays";
import Link from "@/components/navigation/Link";
import CheckIcon from "@public/icons/check.svg";
import ErrorIcon from "@public/icons/error.svg";
import ArrowIcon from "@public/icons/arrow.svg";

const plans = [
  {
    id: "basic1",
    name: "baisc_plan_name",
    yearly: "0.99",
    monthly: "1.49",
    features: ["one_icon_field", "unlimited_icons", "24/7_support"],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/00d6a9b1-c8e1-4a29-a574-6290762688d4/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
  {
    id: "premium",
    name: "premium_plan_name",
    yearly: "1.99",
    monthly: "2.99",
    features: ["multiple_icon_fields", "unlimited_icons", "custom_icons", "24/7_support"],
    route: (metaSiteId?: string) => {
      top &&
        (top.window.location.href = `https://manage.wix.com/upgrade/app/${process.env.NEXT_PUBLIC_APP_ID}/plan/51caf23e-220e-43b3-829d-924ad4e4a6dd/payment-cycle?meta-site-id=${metaSiteId}`);
    },
  },
];

const PlanPage: React.FC = () => {
  const [appData] = useAppData();
  const [segment, setSegment] = useState("monthly");

  const current_plan = appData.instance.billing?.packageName || "";

  const remaining_days =
    30 -
    getDifferenceInDays(
      new Date(appData.store?.installedAt || new Date()).getTime(),
      new Date().getTime()
    );

  return (
    <>
      {remaining_days <= 0 && current_plan === "" ? (
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
        <Link href="/">
          <div className="mb-2 flex items-center gap-8">
            <span
              style={{ width: 36, height: 36, borderRadius: 4, border: "1px solid #dcdcdc" }}
              className="flex items-center jc-center"
            >
              <ArrowIcon style={{ width: 16, rotate: "-90deg", color: "#797979" }} />
            </span>
            <p className="m-0">Back</p>
          </div>
        </Link>
      )}

      <div className="card p-5">
        <div className="text-center">
          <h2 className="fc-light fw-700">Please select your paid plan</h2>
          <p className="fc-dimm">Choose a plan that suits you best</p>
        </div>

        <Segment
          className="mt-5 mx-auto"
          value={segment}
          onChange={setSegment}
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
        />

        <div className="flex jc-center gap-24 mt-5">
          {plans.map((plan, index) => {
            const [w, d] = plan[segment as "yearly" | "monthly"].split(".");
            return (
              <div key={index}>
                <div
                  className="card p-3"
                  style={{
                    width: 300,
                    height: 300,
                    position: "relative",
                    boxShadow: "box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.025)",
                    border: "1px solid #dcdcdc",
                  }}
                >
                  {plan.id === current_plan ? (
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
                    <h3>{plan.name}</h3>

                    <p className="my-3">
                      <span>US$ </span>
                      <span className="fw-500">{w}.</span>
                      <sup className="fw-500">{d}</sup>
                      <sub>/{segment}</sub>
                    </p>

                    {plan.features.map((item, index) => (
                      <p key={index} className="flex items-center gap-8 mb-1">
                        <CheckIcon style={{ width: 16, color: "#2e2e34" }} />
                        <span className="fs-14">{item}</span>
                      </p>
                    ))}

                    <Button
                      className="mt-3"
                      style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}
                      onClick={() => {
                        plan.route(appData.site.siteId);
                      }}
                    >
                      Upgrade
                    </Button>
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
