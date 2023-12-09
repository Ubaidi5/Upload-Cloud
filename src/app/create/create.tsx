"use client";
import { Button, ColorPicker, Input, PixelInput, Select, Switch } from "@/custom";
import { useState } from "react";
import styled from "styled-components";

interface Props {}

const Create: React.FC<Props> = () => {
  const [targeting, setTargeting] = useState("all-products");

  return (
    <>
      <h1 className="mt-5 fs-24">Create Upload Field</h1>

      <StyledPage className="py-5">
        <div className="form-section flex flex-col gap-6 flex-1">
          <section className="card p-4 flex items-end gap-12">
            <div className="flex-1">
              <p>Field name</p>
              <Input placeholder="Enter a field name to remember" />
            </div>

            <div className="flex items-center mb-2 gap-3">
              <span>Upload field required</span>
              <Switch size={20} />
            </div>
          </section>

          <section className="card">
            <h1 style={{ borderBottom: "1px solid #dcdcdc" }} className="p-3">
              Select Products/Collections
            </h1>

            <div className="p-5">
              <div className="flex items-end gap-5">
                <section className="flex-1">
                  <p>Show upload field on</p>
                  <Select
                    placeholder="Select"
                    options={[
                      { label: "All Products", value: "all-products" },
                      { label: "Specific Products", value: "specific-products" },
                      { label: "Specific collections", value: "specific-collections" },
                    ]}
                    value={targeting}
                    onChange={(val) => {
                      setTargeting(val);
                    }}
                  />
                </section>
                <section style={{ width: 156 }}>
                  {targeting === "all-products" ? (
                    <p className="fs-12 mb-0 text-end fw-500">Choose any product to exclude</p>
                  ) : null}
                  <Button style={{ width: "100%" }}>
                    {targeting === "all-products"
                      ? "Excluding"
                      : targeting === "specific-products"
                      ? "Choose Products"
                      : "Choose collections"}
                  </Button>
                </section>
              </div>
            </div>
          </section>

          <section className="card">
            <h1 style={{ borderBottom: "1px solid #dcdcdc" }} className="p-3">
              Button Appearance
            </h1>

            <div className="flex">
              <section
                className="p-5 flex flex-col flex-1 gap-4"
                style={{ borderRight: "1px solid #dcdcdc" }}
              >
                <div className="flex justify-between">
                  <p>Label size</p>
                  <PixelInput />
                </div>

                <div className="flex justify-between">
                  <p>Button text size</p>
                  <PixelInput />
                </div>

                <div className="flex justify-between">
                  <p>Help text size</p>
                  <PixelInput />
                </div>

                <div className="flex justify-between">
                  <p>Button padding horizontal</p>
                  <PixelInput />
                </div>

                <div className="flex justify-between">
                  <p>Button padding vertical</p>
                  <PixelInput />
                </div>
              </section>

              <section className="p-5 flex flex-col flex-1 gap-4">
                <div className="flex justify-between">
                  <p>Label color</p>
                  <ColorPicker />
                </div>

                <div className="flex justify-between">
                  <p>Button text color</p>
                  <ColorPicker />
                </div>

                <div className="flex justify-between">
                  <p>Help text color</p>
                  <ColorPicker />
                </div>

                <div className="flex justify-between">
                  <p>Button background</p>
                  <ColorPicker />
                </div>

                <div className="flex justify-between">
                  <p>Button hover</p>
                  <ColorPicker />
                </div>
              </section>
            </div>
          </section>
        </div>

        {/* ----------------------- */}
        {/*     Button Preview      */}
        {/* ----------------------- */}
        <div className="preview-section">
          <h1 className="p-2" style={{ borderBottom: "1px solid #dcdcdc" }}>
            Button Preview
          </h1>
          <div className="preview">
            <div className="ml-1">
              <span className="button-label"></span>
              <span className="button-text bg-light fc-white py-2 px-4 rounded">Choose file</span>
              <span className="help-text"></span>
            </div>
          </div>
        </div>
      </StyledPage>
    </>
  );
};

export default Create;

const StyledPage = styled("div")`
  display: flex;
  gap: 24px;

  .preview-section {
    background-color: #fff;
    border-radius: 8px;
    width: 300px;
    height: max-content;
    flex-shrink: 0;
  }

  .preview {
    margin: 12px;
    border: 2px dashed #f29f67;
    border-radius: 5px;
    padding: 8px;
    height: 200px;
    display: flex;
    align-items: center;
  }
`;
