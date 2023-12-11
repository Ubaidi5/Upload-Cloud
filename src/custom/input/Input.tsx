import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import EyeIcon from "@public/icons/eye-outlined.svg";
import EyeOffIcon from "@public/icons/eye-off.svg";

interface InputProps {
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  type?: "password" | "text" | "number" | "file";
  prefix?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  min?: number;
  addonAfter?: string | React.ReactNode;
  helpText?: string | React.ReactNode;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    placeholder,
    value,
    onChange,
    disabled,
    name,
    type,
    prefix,
    style,
    min,
    label,
    className,
    addonAfter,
    helpText,
  } = props;
  const [inputType, setInputType] = useState(type);

  return (
    <StyledInput
      className={`${className || ""} ${disabled ? "disabled" : ""} ${prefix ? "with-prefix" : ""}`}
      style={style}
    >
      {label ? <span className="fs-14 fw-400 mb-1">{label}</span> : null}
      <div className="input-wrapper">
        {prefix ? <div className="prefix">{prefix}</div> : null}
        <input
          name={name}
          value={value}
          type={inputType}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
        />

        {type === "password" ? (
          <div className="password">
            {inputType === "text" ? (
              <EyeIcon style={{ height: 18 }} onClick={() => setInputType("password")} />
            ) : (
              <EyeOffIcon style={{ height: 18 }} onClick={() => setInputType("text")} />
            )}
          </div>
        ) : null}

        {addonAfter ? <span className="add-on-after">{addonAfter}</span> : null}
      </div>
      {helpText ? <span className="fs-13 fw-500 mt-1">{helpText}</span> : null}
    </StyledInput>
  );
};

export default Input;

const StyledInput = styled.div`
  .input-wrapper {
    position: relative;
    height: 36px;
    padding: 0 12px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #898f94;
    display: flex;

    &:has(.prefix) {
      padding-left: 0;
    }
  }

  input {
    border: none;
    outline: none;
    height: 100%;
    background-color: transparent;
    color: red;
    width: -webkit-fill-available;
    width: -moz-available;
    font-size: 14px;
    line-height: 1;
    color: #202223;

    &::placeholder {
      color: #939393;
    }
  }

  &.disabled {
    .input-wrapper {
      background-color: #0000000a;
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    input {
      color: #00000040;
      user-select: none;
    }
  }

  .password {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);

    svg {
      font-size: 22px;
      cursor: pointer;
      color: #979797;
    }
  }

  &:has(.add-on-after) {
    .input-wrapper {
      padding: 0;
      display: flex;
    }

    input {
      padding: 0 12px !important;
    }

    .add-on-after {
      background-color: #00000005;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-inline: 12px;
      border-left: 1px solid #898f94;
    }
  }

  &.with-prefix {
    input {
      padding-left: 12px;
      width: 100%;
    }
    .prefix {
      width: fit-content;
      padding: 0 12px;
      background-color: #fff8f8;
      border-radius: 4px 0 0 4px;
      display: flex;
      align-items: center;
      border-right: 1px solid #898f94;
    }
  }
`;
