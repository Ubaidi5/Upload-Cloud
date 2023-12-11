import Radio from "./Radio";

interface RadioGroupProps {
  value: string;
  options: { label: string | React.ReactNode; value: any }[];
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { options, value, onChange, className } = props;

  return (
    <div className={className}>
      {options.map((option, index) => (
        <Radio
          key={index}
          checked={value === option.value}
          onChange={() => {
            onChange?.(option.value);
          }}
          className="mb-1"
        >
          {option.label}
        </Radio>
      ))}
    </div>
  );
};

export default RadioGroup;
