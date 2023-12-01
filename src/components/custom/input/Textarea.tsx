import { ChangeEvent } from "react";
import styled from "styled-components";

interface TextareaProps {
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
}

const TextArea: React.FC<TextareaProps> = (props) => {
  const { label, ...rest } = props;
  return (
    <StyledTextarea>
      {label ? <p className="fs-14 fw-400 mb-1">{label}</p> : null}
      <textarea {...rest} />
    </StyledTextarea>
  );
};

export default TextArea;

const StyledTextarea = styled.div`
  textarea {
    outline: none;
    border: 1px solid #898f94;
    resize: none;
    border-radius: 4px;
    padding: 6px 12px;
    width: -webkit-fill-available;
    width: -moz-available;

    &::placeholder {
      color: #939393;
    }
  }
`;
