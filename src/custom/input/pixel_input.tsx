import styled from "styled-components";

interface Props {
  value: string;
  onChange: (val: string) => void;
  prefix?: string;
}

const PixelInput: React.FC<Props> = (props) => {
  const { value, onChange, prefix } = props;
  const parsedNumber = Number(value);

  return (
    <StyledInput className={`flex`}>
      <span className="btn" onClick={() => parsedNumber > 0 && onChange(`${parsedNumber - 1}`)}>
        -
      </span>
      <input
        min={0}
        type="number"
        className="input"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {prefix ? <span className="btn prefix">{prefix}</span> : null}
      <span className="btn" onClick={() => onChange(`${parsedNumber + 1}`)}>
        +
      </span>
    </StyledInput>
  );
};

export default PixelInput;

const StyledInput = styled("div")`
  display: flex;
  border: 1px solid #cfd4d9;
  height: 28px;
  border-radius: 2px;
  width: max-content;

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 100%;
    color: #4a5056;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #faf7f8;
    }
  }

  .input {
    text-align: center;
    outline: none;
    border: none;
    border-inline: 1px solid #cfd4d9;
    width: 48px;
    color: #495057;
  }
  .input[type="number"]::-webkit-inner-spin-button,
  .input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .prefix {
    background-color: #faf7f8;
    border-right: 1px solid #cfd4d9;
    font-size: 12px;
    pointer-events: none;
  }
`;
