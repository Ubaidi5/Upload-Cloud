import React from "react";
import Checkbox from "./Checkbox";

interface CheckboxGroupProps {
  value: Array<string>;
  options: { label: string | React.ReactNode; value: any }[];
  onChange?: (value: Array<string>) => void;
  style?: React.CSSProperties;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { options, value, onChange } = props;

  return (
    <div className="checkbox-options">
      {options.map((option, index) => (
        <Checkbox
          key={index}
          checked={value.includes(option.value)}
          onChange={(val) => {
            if (val) {
              onChange?.([...value, option.value]);
            } else {
              let s = JSON.parse(JSON.stringify(value));
              const index = value.findIndex((v) => v === option.value);
              s.splice(index, 1);
              console.log("S", s);
              onChange?.(s);
            }
          }}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default CheckboxGroup;
