import styled, { css } from "styled-components";
import LoadingIcon from "@public/icons/loading.svg";

interface Props {
  children: any;
  loading?: boolean;
  iconBefore?: React.ReactNode;
  outlined?: string;
  className?: string;
  style?: React.CSSProperties;
  bgcolor?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}
const Button: React.FC<Props> = (props) => {
  const {
    loading,
    children,
    iconBefore,
    outlined,
    className,
    style,
    bgcolor,
    color,
    disabled,
    onClick,
  } = props;

  return (
    <>
      <StyledButton
        className={`custom-btn ${className || ""}`}
        style={style}
        outlined={outlined}
        bgcolor={bgcolor}
        color={color}
        disabled={disabled || loading}
        onClick={onClick}
        role="button"
      >
        {loading ? (
          <LoadingIcon className="rotate" style={{ color: "#fff", width: 16 }} />
        ) : (
          iconBefore
        )}
        <span>{children}</span>
      </StyledButton>
      <style>
        {`
          :where(.custom-btn) {
            padding-inline: 16px;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
};

export default Button;

const StyledButton = styled("div").withConfig({
  shouldForwardProp: (prop) => !["outlined", "color", "bgcolor"].includes(prop),
})<Props>`
  gap: 8px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background-color: ${({ bgcolor }) => bgcolor || "#6338FA"};
  border-radius: 4px;
  border: 1px solid ${({ bgcolor }) => bgcolor || "#6338FA"};
  color: ${({ color }) => color || "#fff"};
  height: 36px;
  user-select: none;
  width: max-content;

  ${({ outlined, color }) =>
    outlined === "true" &&
    css`
      background-color: transparent;
      border: 1px solid ${color || "#8c9196"};
      color: ${color || "#8c9196"};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      pointer-events: none !important;
    `}
`;
