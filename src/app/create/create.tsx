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
  message,
  useAppRouter,
} from "@/custom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowIcon from "@public/icons/arrow.svg";
import { APIS, errorHandler, useAPI } from "@/apis/config";
import ResourcePicker from "@/components/Modal/ResourcePicker";
import CancelIcon from "@public/icons/cancel.svg";

interface Props {
  editMode: boolean;
  fieldId: string | undefined;
  field: Field | undefined;
}

const Create: React.FC<Props> = (props) => {
  const { editMode = false, fieldId, field } = props;

  const router = useAppRouter();

  const [state, setState] = useState<
    Omit<
      Field,
      "createdAt" | "updatedAt" | "_id" | "status" | "enabled" | "instanceId" | "selectedItems"
    >
  >({
    fieldName: "",
    isRequired: true,
    targeting: "all",
    labelText: "Upload file",
    buttonText: "Choose image",
    helpText: "",
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
    showPreview: true,
    numberOfFiles: "single",
    min: "",
    max: "",
    dimension: "",
    imageWidth: "",
    imageHeight: "",
    previewStyle: "button",
  });

  const [resourcePicker, setResourcePicker] = useState({ open: false, type: "" });
  const [selectedItems, setSelectedItems] = useState<{ name: string; id: string }[]>([]);

  const [create_field, loading] = useAPI(editMode ? APIS.update_field : APIS.create_field);

  async function handleSubmit() {
    try {
      const body: Partial<Field> = {
        ...state,
        selectedItems: JSON.stringify(selectedItems),
      };

      if (editMode && fieldId) {
        body._id = fieldId;
      } else {
        body.instanceId = "b563f0e9-aeee-4a86-a46a-4e918b37f1c3";
      }

      const { data } = await create_field(body);
      router.push("/");
    } catch (err) {
      message.error(errorHandler(err));
    }
  }

  useEffect(() => {
    console.log(props);
    if (editMode && field) {
      setState(field);
      setSelectedItems(JSON.parse(field.selectedItems));
    }
  }, []);

  return (
    <>
      <ResourcePicker
        open={resourcePicker.open}
        // type="variants"
        type={state.targeting === "collections" ? "collections" : "products"}
        onSelection={(products, variants) => {
          const mapped = products.map(({ name, id }) => ({ name, id }));
          setSelectedItems(mapped);
        }}
        onCancel={() => {
          setResourcePicker({
            open: false,
            type: "",
          });
        }}
        initialSelections={selectedItems}
      />

      <section className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <AppLink href="/">
            <span
              style={{ width: 32, height: 32, borderRadius: 4, border: "1px solid #cfcfcf" }}
              className="flex items-center justify-center"
            >
              <ArrowIcon style={{ width: 12, rotate: "-90deg", color: "#797979" }} />
            </span>
          </AppLink>
          <h1 className="fs-24">
            {editMode ? `Editing: ${field?.fieldName}` : "Create Upload Field"}
          </h1>
        </div>
        <div>
          <Button onClick={handleSubmit} loading={loading}>
            Save
          </Button>
        </div>
      </section>

      <StyledPage className="py-5">
        <div className="form-section flex flex-col gap-6 flex-1">
          <section className="card p-4 flex items-end gap-12">
            <div className="flex-1">
              <p>Field name</p>
              <Input
                placeholder="Enter a field name to remember"
                value={state.fieldName}
                onChange={(e) => setState({ ...state, fieldName: e.target.value })}
              />
            </div>

            <div className="flex items-center mb-2 gap-3">
              <span>Upload field required</span>
              <Switch
                size={20}
                checked={state.isRequired}
                onChange={(checked) => setState({ ...state, isRequired: checked })}
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
                      { label: "All Products", value: "all" },
                      { label: "Specific Products", value: "products" },
                      { label: "Specific collections", value: "collections" },
                    ]}
                    value={state.targeting}
                    onChange={(val) => {
                      setState((prev) => {
                        if (
                          (prev.targeting === "collections" && prev.targeting !== val) ||
                          (["all", "products"].includes(prev.targeting) && val === "collections")
                        ) {
                          setSelectedItems([]);
                        }

                        return { ...state, targeting: val };
                      });
                    }}
                  />
                </section>

                <section style={{ width: 160 }}>
                  <p className="fs-12 mb-0 text-center fw-500">
                    {state.targeting === "all"
                      ? "Choose any product to exclude"
                      : `Click to add ${
                          state.targeting === "products" ? "products" : "collections"
                        }`}
                  </p>

                  <Button
                    style={{ width: "100%" }}
                    onClick={() => {
                      setResourcePicker({ open: true, type: state.targeting });
                    }}
                  >
                    {state.targeting === "all"
                      ? "Excluding"
                      : state.targeting === "products"
                      ? "Choose products"
                      : "Choose collections"}
                  </Button>
                </section>
              </div>

              {state.targeting === "all" && selectedItems.length ? (
                <p className="mt-2 mb-1">Your upload field show on all products except:</p>
              ) : null}

              <div className="flex gap-2 mt-2">
                {selectedItems.map((product, index) => (
                  <p
                    key={index}
                    style={{ backgroundColor: "#ececec", padding: 6, borderRadius: 4 }}
                    className="flex items-center gap-2"
                  >
                    <span>{product.name}</span>
                    <CancelIcon
                      style={{ width: 16, color: "#9b9a9a" }}
                      role="button"
                      onClick={() => {
                        selectedItems.splice(index, 1);
                        setSelectedItems([...selectedItems]);
                      }}
                    />
                  </p>
                ))}
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
                  value={state.labelText}
                  onChange={(e) => setState({ ...state, labelText: e.target.value })}
                />
                <p>This text will show above your button.</p>
              </div>

              <div className="flex-1">
                <p>Button text</p>
                <Input
                  placeholder="Choose a file"
                  value={state.buttonText}
                  onChange={(e) => setState({ ...state, buttonText: e.target.value })}
                />
                <p>The text of your button</p>
              </div>

              <div className="flex-1">
                <p>Help text</p>
                <Input
                  placeholder="e.g. Please avoid blur image"
                  value={state.helpText}
                  onChange={(e) => setState({ ...state, helpText: e.target.value })}
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
                    value={state.labelSize}
                    onChange={(val) => {
                      setState({ ...state, labelSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button text size</p>
                  <PixelInput
                    value={state.buttonTextSize}
                    onChange={(val) => {
                      setState({ ...state, buttonTextSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Help text size</p>
                  <PixelInput
                    value={state.helpTextSize}
                    onChange={(val) => {
                      setState({ ...state, helpTextSize: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button padding horizontal</p>
                  <PixelInput
                    value={state.paddingX}
                    onChange={(val) => {
                      setState({ ...state, paddingX: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button padding vertical</p>
                  <PixelInput
                    value={state.paddingY}
                    onChange={(val) => {
                      setState({ ...state, paddingY: val });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button radius</p>
                  <PixelInput
                    value={state.buttonRadius}
                    onChange={(val) => {
                      setState({ ...state, buttonRadius: val });
                    }}
                  />
                </div>
              </section>

              <section className="p-5 flex flex-col flex-1 gap-4">
                <div className="flex items-center justify-between">
                  <p>Label color</p>
                  <ColorPicker
                    color={state.labelColor}
                    onChange={(color) => {
                      setState({ ...state, labelColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button text color</p>
                  <ColorPicker
                    color={state.buttonTextColor}
                    onChange={(color) => {
                      setState({ ...state, buttonTextColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Help text color</p>
                  <ColorPicker
                    color={state.helpTextColor}
                    onChange={(color) => {
                      setState({ ...state, helpTextColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button background</p>
                  <ColorPicker
                    color={state.buttonBackgroundColor}
                    onChange={(color) => {
                      setState({ ...state, buttonBackgroundColor: color });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Button hover</p>
                  <ColorPicker
                    color={state.buttonHoverColor}
                    onChange={(color) => {
                      setState({ ...state, buttonHoverColor: color });
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
                    value={state.buttonWidth}
                    onChange={(val) => {
                      setState({ ...state, buttonWidth: val });
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
                  value={state.numberOfFiles}
                  onChange={(val) => {
                    setState({ ...state, numberOfFiles: val });
                  }}
                />
              </section>

              {state.numberOfFiles === "multiple" ? (
                <section className="flex items-center gap-6 flex-1">
                  <Input
                    className="flex-1"
                    label="Minimum files"
                    placeholder="1"
                    min={1}
                    type="number"
                    value={state.min}
                    onChange={(e) => {
                      setState({ ...state, min: e.target.value });
                    }}
                  />

                  <Input
                    className="flex-1"
                    label="Maximum files"
                    placeholder="5"
                    min={1}
                    type="number"
                    value={state.max}
                    onChange={(e) => {
                      setState({ ...state, max: e.target.value });
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
                  value={state.dimension}
                  onChange={(val) => {
                    setState({ ...state, dimension: val });
                  }}
                />
              </section>

              {state.dimension ? (
                <section className="flex-1">
                  <div className="flex items-center gap-6 ">
                    <Input
                      className="flex-1"
                      label="Width"
                      placeholder="Width"
                      value={state.imageWidth}
                      onChange={(e) => {
                        setState({ ...state, imageHeight: e.target.value });
                      }}
                    />

                    <Input
                      className="flex-1"
                      label="Height"
                      placeholder="Height"
                      value={state.imageHeight}
                      onChange={(e) => {
                        setState({ ...state, imageHeight: e.target.value });
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
                <p className="field-label fw-500">{state.labelText}</p>
                {state.previewStyle === "button" ? (
                  <button className="upload-button py-2 px-4 my-1">
                    {state.buttonText || "Choose file"}
                  </button>
                ) : (
                  <div
                    className="upload-button my-1 p-3 rounded text-center"
                    style={{
                      border: "1px dashed #1e1e2c",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {state.buttonText || "Drag & Drop or Browse"}
                  </div>
                )}
                <p className="help-text">{state.helpText}</p>
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
                  border: `2px dashed ${state.previewStyle === "button" ? "#f29f67" : "#dcdcdc"}`,
                  borderRadius: 5,
                  padding: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setState({ ...state, previewStyle: "button", buttonText: "Choose image" });
                }}
              >
                <p>Upload image</p>
                <Button className="my-1">Choose image</Button>
                <p>Some help text</p>
              </div>
            </div>

            <div className="p-3">
              <h1 className="mb-3">Drag & Drop Preview</h1>

              <div
                style={{
                  border: `2px dashed ${state.previewStyle === "dnd" ? "#f29f67" : "#dcdcdc"}`,
                  borderRadius: 5,
                  padding: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setState({ ...state, previewStyle: "dnd", buttonText: "Drag & Drop or Browse" });
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
            font-size: ${state.labelSize}px;
            color: ${state.labelColor};
          }
          #field-preview .upload-button {
            transition: 0.2s ease-out;
            font-size: ${state.buttonTextSize}px;
            color: ${state.buttonTextColor};
            background-color: ${state.buttonBackgroundColor};
            padding: ${state.paddingY}px ${state.paddingX}px;
            border-radius: ${state.buttonRadius}px;
            width: ${state.buttonWidth};
          }

          ${
            state.buttonHoverColor &&
            `#field-preview .upload-button:hover{
            background-color: ${state.buttonHoverColor}
          }`
          }

          #field-preview .help-text {
            font-size: ${state.helpTextSize}px;
            color: ${state.helpTextColor};
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
