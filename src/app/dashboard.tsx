"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AppLink, Button, Switch, message } from "@/custom";
import DonutPlot from "@/custom/DonutPlot";
import Table from "@/custom/Table";
import dynamic from "next/dynamic";
import { APIS, errorHandler, useAPI } from "@/apis/config";
import { useAppData, type AppData } from "@/context/store";

const DeleteFieldModal = dynamic(() => import("@/components/Modal/DeleteFieldModal"));

interface Props {
  fields: Array<Field>;
  appData: AppData;
}

const Dashboard: React.FC<Props> = (props) => {
  const { fields, appData } = props;

  const [_, setAppData] = useAppData(); // Setting app data on context

  const uploadField = useRef() as MutableRefObject<Field>; // Store the current Field when updating, deleting or switching status.

  /**
   * States
   */
  const [allFields, setAllFields] = useState(fields);
  const [delteModal, toggleDeleteModal] = useState(false);

  /**
   * APIs
   */
  const [update_field, update_loading] = useAPI(APIS.update_field);
  const [delete_field, delete_loading] = useAPI(APIS.delete_field);

  async function updateField(enabled: boolean) {
    try {
      await update_field({ _id: uploadField.current._id, enabled });
      const field = allFields.find((field) => field._id === uploadField.current._id);
      field && (field.enabled = enabled);
      setAllFields([...allFields]);
    } catch (err) {
      message.error(errorHandler(err));
    }
  }

  async function deleteField() {
    try {
      await delete_field({ fieldId: uploadField.current._id });
      const index = allFields.findIndex((field) => field._id === uploadField.current._id);
      allFields.splice(index, 1);
      setAllFields([...allFields]);
      toggleDeleteModal(false);
    } catch (err) {
      message.error(errorHandler(err));
    }
  }

  useEffect(() => {
    setAppData(appData);
    /**
     * Setting refresh token in local storage to attach it to API headers in index file
     */
    if (appData.store) {
      localStorage.setItem("__UC_refresh_token", `${appData.store.refreshToken}`);
    }
  }, [appData.store]);

  const TIER = {
    basic: 1,
    essential: 2,
    pinnacle: 3,
    infinite: 4,
  }[`${appData.instance.billing?.packageName}`];

  return (
    <>
      <DeleteFieldModal
        open={delteModal}
        onCancel={() => toggleDeleteModal(false)}
        onDelete={deleteField}
        loading={delete_loading}
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
              <p className="fc-dimm fs-13 mb-2">Tier {TIER}</p>
              <h3 className="fs-28 fw-600" style={{ lineHeight: "28px", color: "#01b6a0" }}>
                <span className="capitalize">{appData.instance.billing?.packageName}</span>{" "}
                <span>plan</span>
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
          data={fields}
          pagination={false}
          columns={[
            {
              title: "Field name",
              data: (data: Field) => <p>{data.fieldName}</p>,
              expandItem: (data: Field) => {
                const selectedItems: { name: string; id: string }[] = JSON.parse(data.selectedItems);
                if (selectedItems.length) {
                  return (
                    <>
                      <h1 className="mb-3 mt-2">Selected Products</h1>
                      <div className="flex items-center flex-wrap gap-2">
                        {selectedItems.map((item, index) => (
                          <span
                            key={index}
                            style={{ backgroundColor: "#ececec", padding: 6, borderRadius: 4 }}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </>
                  );
                }
              },
            },
            {
              title: "Uploads",
              data: <p>34</p>,
            },
            {
              title: "Targetting",
              data: (field: Field) => (
                <p>
                  {
                    {
                      all: "All Products",
                      products: "Specific Products",
                      collections: "Specific collections",
                    }[field.targeting]
                  }
                </p>
              ),
            },
            {
              title: <p className="text-center">Action</p>,
              data: (field: Field) => (
                <div className="flex gap-4" style={{ justifyContent: "end", width: "100%" }}>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.enabled}
                      onChange={(val) => {
                        uploadField.current = field;
                        updateField(val);
                      }}
                      size={20}
                    />
                    <span>Enabled</span>
                  </div>

                  <AppLink
                    href={{ pathname: "/create", query: { editMode: true, fieldId: field._id } }}
                  >
                    <div className="action-button edit">Edit</div>
                  </AppLink>

                  <div
                    className="action-button delete"
                    onClick={() => {
                      uploadField.current = field;
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
};

export default Dashboard;
