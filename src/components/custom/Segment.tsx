import { useState, useRef, useEffect, MutableRefObject } from "react";
import styled from "styled-components";

type OptionType = {
  label: string;
  value: string;
};

interface SegmentProps {
  value?: string;
  options: OptionType[];
  onChange?: (e: string) => void;
  className?: string;
}

const Segment: React.FC<SegmentProps> = (props) => {
  const { value, options, onChange, className } = props;

  const [state, setState] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const optionsRef = useRef<Array<any>>([]);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    setDivWidth(optionsRef.current[0]?.clientWidth);
  }, []);

  useEffect(() => {
    const index = options.findIndex((item) => item.value === value);
    setState(index);
    setDivWidth(optionsRef.current[index]?.clientWidth + 1);
    setOffsetLeft(
      optionsRef.current.length > 1 &&
        optionsRef.current[index]?.offsetLeft === 0
        ? optionsRef.current[index]?.offsetLeft - 1
        : optionsRef.current[index]?.offsetLeft
    );
  }, [value]);

  return (
    <StyledContent ref={containerRef} className={`${className}`}>
      {options.map((item, index) => (
        <div
          key={index}
          ref={(e) => (optionsRef.current[index] = e)}
          className={`item ${state === index ? "active" : ""}`}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </div>
      ))}
      <div
        className="slider"
        style={{
          left: `${offsetLeft}px`,
          width: divWidth,
        }}
      />
    </StyledContent>
  );
};

export default Segment;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  height: inherit;
  position: relative;
  border: none;
  background-color: #fff;
  border-radius: 26px;
  border: 1px solid #cfd4d9;
  border-radius: 4px;

  .item {
    padding: 8px 32px;
    cursor: pointer;
    transition: 0.6s;
    text-align: center;
    z-index: 10;
    color: #8e9092;
    font-weight: 700;
    font-size: 16px;
    text-transform: capitalize;
  }

  .active {
    z-index: 10;
    color: #6338fa;
  }

  .slider {
    position: absolute;
    top: 0px;
    transition: all 0.4s;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #e5f0f8;
    height: 100%;
    z-index: 0;
    border: 1px solid #6338fa;
  }

  &.small {
    height: 28px;
    .item {
      padding: 6px 20px;
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 576px) {
    .item {
      font-size: 12px;
      padding: 10px 32px;
    }
  }
`;
