"use client";
import { Button, ColorPicker, Input, PixelInput, Select, Switch } from "@/custom";
import { useState } from "react";
import styled from "styled-components";

interface Props {}

const Create: React.FC<Props> = () => {
  const [fieldName, setFieldName] = useState("");
  const [isRequired, toggleRequired] = useState(false);
  const [targeting, setTargeting] = useState("all-products");
  const [labels, setLabels] = useState({
    labelText: "Upload file",
    buttonText: "Choose image",
    helpText: "",
  });
  const [appearance, setAppearance] = useState({
    labelSize: "14",
    labelColor: "#1e1e2c",
    buttonTextSize: "14",
    buttonTextColor: "#fff",
    helpTextSize: "12",
    helpTextColor: "#9F9FA5",
    paddingX: "16",
    paddingY: "8",
    buttonBackgroundColor: "#6338fa",
    buttonHoverColor: "",
    buttonRadius: "4",
    buttonWidth: "max-content",
  });

  return (
    <>
      <h1 className="mt-5 fs-24">Create Upload Field</h1>

      <StyledPage className="py-5">
        <div className="form-section flex flex-col gap-6 flex-1">
          <section className="card p-4 flex items-end gap-12">
            <div className="flex-1">
              <p>Field name</p>
              <Input
                placeholder="Enter a field name to remember"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-2 gap-3">
              <span>Upload field required</span>
              <Switch
                size={20}
                checked={isRequired}
                onChange={(checked) => toggleRequired(checked)}
              />
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

                <section style={{ width: 160 }}>
                  <p className="fs-12 mb-0 text-center fw-500">
                    {targeting === "all-products"
                      ? "Choose any product to exclude"
                      : `Click to add ${
                          targeting === "specific-products" ? "products" : "collections"
                        }`}
                  </p>

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
              Labelling your field
            </h1>

            <div className="p-5 flex gap-4">
              <div className="flex-1">
                <p>Label text</p>
                <Input
                  placeholder="Upload file"
                  value={labels.labelText}
                  onChange={(e) => setLabels({ ...labels, labelText: e.target.value })}
                />
                <p>This text will show above your button.</p>
              </div>

              <div className="flex-1">
                <p>Button text</p>
                <Input
                  placeholder="Choose a file"
                  value={labels.buttonText}
                  onChange={(e) => setLabels({ ...labels, buttonText: e.target.value })}
                />
                <p>The text of your button</p>
              </div>

              <div className="flex-1">
                <p>Help text</p>
                <Input
                  placeholder="e.g. Please avoid blur image"
                  value={labels.helpText}
                  onChange={(e) => setLabels({ ...labels, helpText: e.target.value })}
                />
                <p>This text will show below the button.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h1 style={{ borderBottom: "1px solid #dcdcdc" }} className="p-3">
              Field Appearance
            </h1>

            <div className="flex">
              <section
                className="p-5 flex flex-col flex-1 gap-4"
                style={{ borderRight: "1px solid #dcdcdc" }}
              >
                <div className="flex justify-between">
                  <p>Label size</p>
                  <PixelInput
                    value={appearance.labelSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, labelSize: val });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button text size</p>
                  <PixelInput
                    value={appearance.buttonTextSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, buttonTextSize: val });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Help text size</p>
                  <PixelInput
                    value={appearance.helpTextSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, helpTextSize: val });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button padding horizontal</p>
                  <PixelInput
                    value={appearance.paddingX}
                    onChange={(val) => {
                      setAppearance({ ...appearance, paddingX: val });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button padding vertical</p>
                  <PixelInput
                    value={appearance.paddingY}
                    onChange={(val) => {
                      setAppearance({ ...appearance, paddingY: val });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button radius</p>
                  <PixelInput
                    value={appearance.buttonRadius}
                    onChange={(val) => {
                      setAppearance({ ...appearance, buttonRadius: val });
                    }}
                  />
                </div>
              </section>

              <section className="p-5 flex flex-col flex-1 gap-4">
                <div className="flex justify-between">
                  <p>Label color</p>
                  <ColorPicker
                    color={appearance.labelColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, labelColor: color });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button text color</p>
                  <ColorPicker
                    color={appearance.buttonTextColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonTextColor: color });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Help text color</p>
                  <ColorPicker
                    color={appearance.helpTextColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, helpTextColor: color });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button background</p>
                  <ColorPicker
                    color={appearance.buttonBackgroundColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonBackgroundColor: color });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button hover</p>
                  <ColorPicker
                    color={appearance.buttonHoverColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonHoverColor: color });
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>Button width</p>
                  <Select
                    style={{ width: 135 }}
                    options={[
                      { label: "Full width", value: "100%" },
                      { label: "Auto", value: "max-content" },
                    ]}
                    value={appearance.buttonWidth}
                    onChange={(val) => {
                      setAppearance({ ...appearance, buttonWidth: val });
                    }}
                  />
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
            <div id="field-preview">
              <p className="field-label fw-500">{labels.labelText}</p>
              <button className="upload-button bg-light fc-white py-2 px-4 rounded my-1">
                {labels.buttonText || "Choose file"}
              </button>
              <p className="help-text">{labels.helpText}</p>
            </div>
          </div>
        </div>
      </StyledPage>

      <style>
        {`
          #field-preview {
            width: 100%;
          }

          #field-preview .field-label {
            font-size: ${appearance.labelSize}px;
            color: ${appearance.labelColor};
          }
          #field-preview .upload-button {
            font-size: ${appearance.buttonTextSize}px;
            color: ${appearance.buttonTextColor};
            background-color: ${appearance.buttonBackgroundColor};
            padding: ${appearance.paddingY}px ${appearance.paddingX}px;
            border-radius: ${appearance.buttonRadius}px;
            width: ${appearance.buttonWidth};
          }

          ${
            appearance.buttonHoverColor &&
            `#field-preview .upload-button:hover{
            background-color: ${appearance.buttonHoverColor}
          }`
          }

          #field-preview .help-text {
            font-size: ${appearance.helpTextSize}px;
            color: ${appearance.helpTextColor};
          }
        `}
      </style>
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
    padding: 8px 8px 8px 12px;
    height: 200px;
    display: flex;
    align-items: center;
  }
`;
