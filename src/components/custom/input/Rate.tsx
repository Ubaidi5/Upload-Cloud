import { useState } from "react";
import StarOutlined from "@public/icons/star-outlined.svg";
import StarFilled from "@public/icons/star-filled.svg";

type Props = {
  value: number;
  onChange?: (val: number) => void;
  size?: number;
  readonly?: boolean;
};

const Rate: React.FC<Props> = (props) => {
  const { value, onChange, size = 20, readonly } = props;
  const [hoverItem, setHoverItem] = useState(0);

  return (
    <section className="flex" onMouseLeave={() => setHoverItem(0)}>
      {[1, 2, 3, 4, 5].map((item) => (
        <span
          key={item}
          role="button"
          style={{ height: size, width: size }}
          onClick={() => onChange?.(item)}
          onMouseEnter={() => {
            if (!readonly) {
              setHoverItem(item);
            }
          }}
        >
          {value >= item ? (
            <StarFilled style={{ color: hoverItem && item > hoverItem ? "#ececec" : "#f5cd3d" }} />
          ) : (
            <StarOutlined style={{ color: item <= hoverItem ? "#f5cd3d" : "#ececec" }} />
          )}
        </span>
      ))}
    </section>
  );
};

export default Rate;
