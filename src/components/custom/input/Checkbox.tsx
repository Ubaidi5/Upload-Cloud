import CheckIcon from "@public/icons/check.svg";

interface CheckboxProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  color?: string;
  size?: number;
  children?: any;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, onChange, color = "#6338FA", size = 20, children } = props;
  return (
    <div className="flex items-center gap-2" onClick={() => onChange?.(!checked)} role="button">
      <span
        style={{
          background: checked ? color : "transparent",
          width: size,
          height: size,
          borderRadius: 3,
          border: `1px solid ${color}`,
        }}
        className="flex items-center jc-center"
      >
        {checked ? <CheckIcon style={{ color: "#fff", width: size - 6 }} /> : null}
      </span>
      <span style={{ userSelect: "none" }}>{children}</span>
    </div>
  );
};

export default Checkbox;
