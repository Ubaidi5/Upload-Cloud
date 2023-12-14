"use client";
import {
  Button,
  Checkbox,
  ColorPicker,
  Input,
  PixelInput,
  RadioGroup,
  Select,
  Switch,
  AppLink,
} from "@/custom";
import { useState } from "react";
import styled from "styled-components";
import ArrowIcon from "@public/icons/arrow.svg";

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
  const [behavior, setBehavior] = useState({
    showPreview: true,
    numberOfFiles: "single",
    min: "",
    max: "",
    dimension: "",
    imageWidth: "",
    imageHeight: "",
  });
  const [previewStyle, setPreviewStyle] = useState("button");

  return (
    <>
      <div className="mt-5 flex items-center gap-3">
        <AppLink href="/">
          <span
            style={{ width: 32, height: 32, borderRadius: 4, border: "1px solid #cfcfcf" }}
            className="flex items-center justify-center"
          >
            <ArrowIcon style={{ width: 12, rotate: "-90deg", color: "#797979" }} />
          </span>
        </AppLink>
        <h1 className="fs-24">Create Upload Field</h1>
      </div>

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
                <div className="flex items-center justify-between">
                  <p>Label size</p>
                  <PixelInput
                    value={appearance.labelSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, labelSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button text size</p>
                  <PixelInput
                    value={appearance.buttonTextSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, buttonTextSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Help text size</p>
                  <PixelInput
                    value={appearance.helpTextSize}
                    onChange={(val) => {
                      setAppearance({ ...appearance, helpTextSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button padding horizontal</p>
                  <PixelInput
                    value={appearance.paddingX}
                    onChange={(val) => {
                      setAppearance({ ...appearance, paddingX: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button padding vertical</p>
                  <PixelInput
                    value={appearance.paddingY}
                    onChange={(val) => {
                      setAppearance({ ...appearance, paddingY: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
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
                <div className="flex items-center justify-between">
                  <p>Label color</p>
                  <ColorPicker
                    color={appearance.labelColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, labelColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button text color</p>
                  <ColorPicker
                    color={appearance.buttonTextColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonTextColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Help text color</p>
                  <ColorPicker
                    color={appearance.helpTextColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, helpTextColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button background</p>
                  <ColorPicker
                    color={appearance.buttonBackgroundColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonBackgroundColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button hover</p>
                  <ColorPicker
                    color={appearance.buttonHoverColor}
                    onChange={(color) => {
                      setAppearance({ ...appearance, buttonHoverColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
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

          <section className="card">
            <h1 style={{ borderBottom: "1px solid #dcdcdc" }} className="p-3">
              Upload field settings
            </h1>

            <div className="p-5" style={{ borderBottom: "1px solid #dcdcdc" }}>
              <Checkbox checked onChange={() => {}}>
                Show image preview
              </Checkbox>
              <p className="fs-13 fc-dimm mt-1">Show thumbnail of uploaded image</p>
            </div>

            <div className="p-5 flex items-end" style={{ borderBottom: "1px solid #dcdcdc" }}>
              <section style={{ width: 260 }}>
                <p className="mt-3 fs-15 fw-500">Allowed number of files</p>
                <RadioGroup
                  options={[
                    { label: "Single file", value: "single" },
                    { label: "Sepecific quantity", value: "multiple" },
                  ]}
                  value={behavior.numberOfFiles}
                  onChange={(val) => {
                    setBehavior({ ...behavior, numberOfFiles: val });
                  }}
                />
              </section>

              {behavior.numberOfFiles === "multiple" ? (
                <section className="flex items-center gap-6 flex-1">
                  <Input
                    className="flex-1"
                    label="Minimum files"
                    placeholder="1"
                    min={1}
                    type="number"
                    value={behavior.min}
                    onChange={(e) => {
                      setBehavior({ ...behavior, min: e.target.value });
                    }}
                  />

                  <Input
                    className="flex-1"
                    label="Maximum files"
                    placeholder="5"
                    min={1}
                    type="number"
                    value={behavior.max}
                    onChange={(e) => {
                      setBehavior({ ...behavior, max: e.target.value });
                    }}
                  />
                </section>
              ) : null}
            </div>

            <div className="p-5 flex items-end">
              <section style={{ width: 260 }}>
                <p className="mt-3 fs-15 fw-500">Restrict image dimensions</p>
                <RadioGroup
                  options={[
                    { label: "Any image dimension", value: "" },
                    { label: "Specific width and height", value: "dimension" },
                    { label: "Aspect ratio", value: "aspect radio" },
                  ]}
                  value={behavior.dimension}
                  onChange={(val) => {
                    setBehavior({ ...behavior, dimension: val });
                  }}
                />
              </section>

              {behavior.dimension ? (
                <section className="flex-1">
                  <div className="flex items-center gap-6 ">
                    <Input
                      className="flex-1"
                      label="Width"
                      placeholder="Width"
                      value={behavior.imageWidth}
                      onChange={(e) => {
                        setBehavior({ ...behavior, imageHeight: e.target.value });
                      }}
                    />

                    <Input
                      className="flex-1"
                      label="Height"
                      placeholder="Height"
                      value={behavior.imageHeight}
                      onChange={(e) => {
                        setBehavior({ ...behavior, imageHeight: e.target.value });
                      }}
                    />
                  </div>
                  <p className="fs-13 mt-1">
                    Add some help text to help the merchant understaing the purpose.
                  </p>
                </section>
              ) : null}
            </div>
          </section>
        </div>

        {/* ----------------------- */}
        {/*     Button Preview      */}
        {/* ----------------------- */}
        <div
          style={{ position: "sticky", top: 24, height: "max-content", width: 300, flexShrink: 0 }}
        >
          <section className="preview-section">
            <h1 className="p-2" style={{ borderBottom: "1px solid #dcdcdc" }}>
              Button Preview
            </h1>
            <div className="preview">
              <div id="field-preview">
                <p className="field-label fw-500">{labels.labelText}</p>
                {previewStyle === "button" ? (
                  <button className="upload-button py-2 px-4 my-1">
                    {labels.buttonText || "Choose file"}
                  </button>
                ) : (
                  <div
                    className="upload-button my-1 p-3 rounded text-center"
                    style={{
                      border: "1px dashed #1e1e2c",
                    }}
                  >
                    Drag & Drop or Browse
                  </div>
                )}
                <p className="help-text">{labels.helpText}</p>
              </div>
            </div>
            <div className="px-3 pb-3">
              <p>
                This is how upload field show in your site. It will appear above the Cart button.
                However you can change its postion by adding a wedgit.
              </p>

              <Button className="mx-auto mt-2" color="#01b6a0" outlined="true">
                Add widget
              </Button>
            </div>
          </section>

          <section className="card mt-6">
            <h1 style={{ borderBottom: "1px solid #dcdcdc" }} className="p-3">
              Choose Button style
            </h1>

            <div className="p-3">
              <h1 className="mb-3">Button Preview</h1>

              <div
                style={{
                  border: `2px dashed ${previewStyle === "button" ? "#f29f67" : "#dcdcdc"}`,
                  borderRadius: 5,
                  padding: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPreviewStyle("button");
                }}
              >
                <p>Upload image</p>
                <Button className="my-1">Choose file</Button>
                <p>Some help text</p>
              </div>
            </div>

            <div className="p-3">
              <h1 className="mb-3">Drag & Drop Preview</h1>

              <div
                style={{
                  border: `2px dashed ${previewStyle === "dnd" ? "#f29f67" : "#dcdcdc"}`,
                  borderRadius: 5,
                  padding: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPreviewStyle("dnd");
                }}
              >
                <p>Upload image</p>
                <div
                  className="my-1 p-3 rounded text-center"
                  style={{
                    border: "1px dashed #1e1e2c",
                  }}
                >
                  Drag & Drop or Browse
                </div>
                <p>Some help text</p>
              </div>
            </div>
          </section>
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
            transition: 0.2s ease-out;
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
