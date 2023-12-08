"use client";
import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import DropdownIcon from "@public/icons/dropdown-arrow.svg";

interface SelectProps {
  value?: string;
  options: Array<SelectOptionType>;
  position?: string;
  style?: React.CSSProperties;
  type?: string;
  onChange?: (e: string, a?: SelectOptionType) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export type SelectOptionType = {
  label: string | React.ReactNode;
  value: string;
  [key: string]: any;
};

const Select: React.FC<SelectProps> = (props): JSX.Element => {
  const { options, position, style, type, onChange, placeholder, label, className } = props;
  const [selection, setSelection] = useState<SelectOptionType>({
    value: "",
    label: "",
  });
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;
  const selectRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleClick = (e: any): void => {
      if (position === "top") {
        positionDropdown();
      }

      if (selectRef.current.contains(e.target)) {
        overlayRef.current.classList.add("visible");
      } else {
        overlayRef.current.classList.remove("visible");
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const currentValue = options.find((item) => item.value == props.value);
    if (currentValue) setSelection(currentValue);
  }, [props.value, options]);

  const positionDropdown = () => {
    overlayRef.current.style.bottom = `${selectRef.current.offsetHeight}px`;
    overlayRef.current.style.top = "auto";
    overlayRef.current.style.boxShadow = "none";
    overlayRef.current.style.marginBottom = "4px";
  };

  return (
    <StyledSelect className={className} style={style} type={type} ref={selectRef}>
      {label ? <div className="fs-14 fw-400 mb-1">{label}</div> : null}

      <section className="flex items-center jc-between select-box" tabIndex={1}>
        <div style={{ color: "#263238cc" }} className="ml-2 fw-500 fs-14">
          {selection.label == "" ? (
            <span style={{ color: "#bfbfbf" }}>{placeholder}</span>
          ) : (
            <p className="select-label">{selection.label}</p>
          )}
        </div>

        <DropdownIcon className="chevron-icon" />
      </section>

      <div className="overlay" ref={overlayRef}>
        {options.map((option, index) => (
          <div
            key={index}
            className="option"
            onClick={() => {
              onChange?.(option.value, option);
              setTimeout(() => {
                overlayRef.current?.classList.remove("visible");
              }, 150);
            }}
            style={option.value === props.value ? { backgroundColor: "#ececec" } : undefined}
          >
            <span className="fs-14">{option.label}</span>
            {option.value === props.value ? (
              <span style={{ float: "right" }}>
                <svg
                  stroke="currentColor"
                  fill="#008060"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"></path>
                </svg>
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </StyledSelect>
  );
};

export default Select;

const StyledSelect = styled.div<{ type: string | undefined }>`
  position: relative;

  .select-box {
    padding: 0px;
    min-height: 36px;
    /* height: 100%; */
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: 1px solid #babfc3;
    cursor: pointer;
  }

  .select-label {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron-icon {
    color: #5b00ff;
    font-size: 20px;
    margin-right: 16px;
  }

  .prefix-icon {
    margin-right: 12px;
    svg {
      font-size: 20px;
      color: #5b00ff;
    }
  }

  .overlay {
    position: absolute;
    margin-top: 4px;
    width: fit-content;
    min-width: 100%;
    z-index: 1000;
    overflow: hidden;
    background-color: #fff;
    max-height: 0;
    transition: all 0.15s ease-out;
    padding: 0;
    border-color: #babfc3;
    border-radius: 4px;
  }

  .option {
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      background-color: #ececec;
    }
  }

  .visible {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid #babfc3;
    max-height: 300px;
    padding: 0;
    transition: all 0.25s ease-in;
    overflow: auto;
  }
`;
