import React, { useCallback, useRef, useState, MutableRefObject, ChangeEvent } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "@/hooks/useClickOutside";
import CloseFilled from "@public/icons/close-filled.svg";

interface ColorPickerProps {
  color?: string;
  onChange?: (e: string) => void;
  label?: string;
  className?: string;
  allowClear?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { color, onChange, label, className, allowClear = false } = props;

  const popover = useRef() as MutableRefObject<HTMLDivElement>;
  const [isOpen, toggle] = useState(false);

  const myRef = useRef() as MutableRefObject<HTMLDivElement>;

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);
  return (
    <StyledPicker className={className}>
      {label ? <p className="fs-14 fw-400 mb-0">{label}</p> : null}
      <section
        className="flex"
        style={{ borderRadius: 4, overflow: "hidden", border: "1px solid #dcdcdc" }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0,0 8px,8px -8px,-8px 0px",
            flex: 1,
            minWidth: 136,
            borderRight: "1px solid #dcdcdc",
          }}
        >
          <span
            ref={myRef}
            className="swatch"
            style={{ background: color || "transparent" }}
            onClick={() => toggle(true)}
          />
        </div>

        {allowClear ? (
          <div
            className="flex items-center justify-center fs-13"
            style={{
              width: 64,
              flexShrink: 0,
              userSelect: "none",
              color: "#4a5056",
              backgroundColor: "#faf7f8",
            }}
            onClick={() => onChange?.("")}
            role="button"
          >
            Clear
          </div>
        ) : null}
      </section>

      {isOpen && (
        <div
          style={{
            top: myRef.current.getBoundingClientRect().y + 40,
            left: myRef.current.getBoundingClientRect().x,
          }}
          className="popover"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
          <div className="flex items-center gap-8 mt-2">
            <input
              className="color-input p-1"
              value={color}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
              placeholder={label}
            />
            <CloseFilled
              style={{ width: 24, height: 24, color: "#c3c7cb" }}
              role="button"
              onClick={() => onChange?.("")}
            />
          </div>
        </div>
      )}
    </StyledPicker>
  );
};

export default ColorPicker;

const StyledPicker = styled.div`
  .swatch {
    display: block;
    height: 28px;
    cursor: pointer;
  }

  .popover {
    padding: 6px;
    position: fixed;
    top: calc(100% + 4px);
    left: 0;
    border-radius: 6px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #ebe5e5;
    background-color: #fff;
    z-index: 999;
  }

  .react-colorful {
    width: 100%;
  }

  .color-input {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    width: 100%;
    outline: none;
  }
`;
