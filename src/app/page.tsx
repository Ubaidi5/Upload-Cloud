"use client";

import DeleteFieldModal from "@/components/Modal/DeleteFieldModal";
import { AppLink, Button, Switch } from "@/custom";
import DonutPlot from "@/custom/DonutPlot";
import Table from "@/custom/Table";
import { MutableRefObject, useRef, useState } from "react";

export default function Home() {
  const [delteModal, toggleDeleteModal] = useState(false);
  const uploadField = useRef() as MutableRefObject<any>; // Add field type here
  return (
    <>
      <DeleteFieldModal
        open={delteModal}
        onCancel={() => toggleDeleteModal(false)}
        onDelete={() => {}}
      />

      <div className="py-3">
        <div className="flex gap-4">
          <section className="w-[420px] p-5 rounded-xl flex flex-col gap-6 card">
            <h1 className="fs-20 fw-600 fc-dark mb-3">Status Summary</h1>

            <div className="flex items-center gap-24">
              <div>
                <p className="fc-dimm fs-13 mb-2">Uploads used</p>
                <h3 className="fs-28 fw-600" style={{ lineHeight: "28px", color: "#01b6a0" }}>
                  587
                </h3>
              </div>
              <div>
                <p className="fc-dimm fs-13 mb-2">Remaining Uploads</p>
                <h3 className="fs-28 fw-600" style={{ lineHeight: "28px", color: "#01b6a0" }}>
                  1413
                </h3>
              </div>
            </div>
          </section>

          <section className="w-[42 0px] p-5 rounded-xl flex justify-between gap-12 card">
            <div className="flex flex-col">
              <h1 className="fs-20 fw-600 fc-dark mb-3">Plan Summary</h1>
              <p className="fc-dimm fs-13 mb-2">Tier 2</p>
              <h3 className="fs-28 fw-600" style={{ lineHeight: "28px", color: "#01b6a0" }}>
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

        <br />

        <div className="flex justify-end mb-4">
          <AppLink href="/create">
            <Button>Create Upload Field</Button>
          </AppLink>
        </div>

        <Table
          data={[1, 2, 3]}
          pagination={false}
          columns={[
            {
              title: "Field name",
              data: <p>Valentine</p>,
              expandItem: (c) =>
                c === 2 ? undefined : (
                  <>
                    <h1 className="mb-3 mt-2">Selected Products</h1>
                    <div className="flex items-center flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((item) => (
                        <span style={{ backgroundColor: "#ececec", padding: 6, borderRadius: 4 }}>
                          Polca dots Shirt
                        </span>
                      ))}
                    </div>
                  </>
                ),
            },
            {
              title: "Uploads",
              data: <p>34</p>,
            },
            {
              title: "Targetting",
              data: () => <p>All products</p>,
            },
            {
              title: <p className="text-center">Action</p>,
              data: (data) => (
                <div className="flex gap-4" style={{ justifyContent: "end", width: "100%" }}>
                  <div className="flex items-center gap-2">
                    <Switch checked size={20} />
                    <span>Enabled</span>
                  </div>

                  <div className="action-button edit">Edit</div>
                  <div
                    className="action-button delete"
                    onClick={() => {
                      uploadField.current = data;
                      toggleDeleteModal(true);
                    }}
                  >
                    Delete
                  </div>
                  <div className="action-button duplicate">Duplicate</div>
                </div>
              ),
              width: 380,
            },
          ]}
        />

        <style>
          {`
          .action-button {
            padding: 4px 8px;
            min-width: 64px;
            border: 1px solid #1e1e2c;
            border-radius: 4px;
            color: #1e1e2c;
            cursor: pointer;
            text-align: center;
            transition: 0.2s;
          }

          .edit:hover{
            background-color: #1e1e2c;
            color: #fff;
          }

          .delete {
            border-color: #f95f53;
            color: #f95f53;
          }
          .delete:hover {
            background-color: #f95f53;
            color: #fff;
          }

          .duplicate {
            border-color: #6338FA;
            color: #6338FA;
          }
          .duplicate:hover {
            background-color: #6338FA;
            color: #fff;
          }
        `}
        </style>
      </div>
    </>
  );
}
