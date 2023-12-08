import styled from "styled-components";

interface SwitchProps {
  checked?: boolean;
  onChange?: (val: boolean) => void;
  size?: number;
  color?: string;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { checked, onChange, size = 24, color = "#6338FA" } = props;
  return (
    <StyledSwitch size={size} color={color} onClick={() => onChange?.(!checked)} role="button">
      <span className={`slider ${checked ? "checked" : ""}`}></span>
    </StyledSwitch>
  );
};

export default Switch;

const StyledSwitch = styled.div<{ size: number; color: string }>`
  position: relative;
  border-radius: 50px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size * 2 - 8}px;
  background: #dcdcdc;
  transition: 0.4s;

  .slider {
    border-radius: 50%;
    width: ${({ size }) => size - 5}px;
    height: ${({ size }) => size - 5}px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    background-color: #fff;
    transition: 0.4s;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2))
      drop-shadow(0px 0.10000000149011612px 0.30000001192092896px rgba(0, 0, 0, 0.1));
  }

  .slider.checked {
    left: ${({ size }) => size - 5}px;
  }

  &:has(.checked) {
    background-color: ${({ color }) => color};
  }
`;
