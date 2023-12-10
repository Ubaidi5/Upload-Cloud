import RadioIcon from "@public/icons/radio.svg";
import RadioCheckedIcon from "@public/icons/radio-checked.svg";

interface RadioProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  color?: string;
  size?: number;
  children?: any;
  className?: string;
  style?: React.CSSProperties;
}

const Radio: React.FC<RadioProps> = (props) => {
  const { checked, onChange, color = "#6338FA", size = 24, children, className, style } = props;

  return (
    <div className={`flex items-start gap-2 ${className || ""}`} style={style}>
      <span onClick={() => onChange?.(!checked)} role="button">
        {checked ? (
          <RadioCheckedIcon className="shrink-0" style={{ color, width: size }} />
        ) : (
          <RadioIcon className="shrink-0" style={{ color, width: size }} />
        )}
      </span>
      <span className="flex-1 fs-14 radio-label">{children}</span>
    </div>
  );
};

export default Radio;
