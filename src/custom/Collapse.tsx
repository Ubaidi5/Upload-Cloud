import styled from "styled-components";
import ChevronIcon from "@public/icons/chevron.svg";
import { useState, useRef, MutableRefObject } from "react";

interface CollapseProps {
  panels: { heading: string | React.ReactNode; content: React.ReactNode }[];
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { panels } = props;
  const allRefs = useRef([]) as MutableRefObject<HTMLSpanElement[]>;

  const [activePanels, setActivePanels] = useState<number[]>([]);

  return (
    <StyledCollapse>
      {panels.map((panel, index) => (
        <div key={index} className="collapse-item">
          <div
            className="collapse-header flex items-center jc-between px-3 py-2"
            onClick={() => {
              if (activePanels.includes(index)) {
                activePanels.splice(activePanels.indexOf(index), 1);
                setActivePanels([...activePanels]);
              } else {
                setActivePanels([index]);
              }
            }}
          >
            <span className="fw-600">{panel.heading}</span>
            <ChevronIcon
              style={{
                width: 18,
                color: "#8a6f8c",
                rotate: activePanels.includes(index) ? "0deg" : "180deg",
                transition: "0.2s",
              }}
            />
          </div>

          <div
            className="collapse-panel"
            style={{
              transition: "all 0.3s",
              height: activePanels.includes(index) ? allRefs.current[index].offsetHeight : "0px",
              overflow: "hidden",
              borderColor: "#dcdcdc",
              borderTopWidth: activePanels.includes(index) ? "1px" : "0",
            }}
          >
            <span ref={(e) => e && allRefs.current.push(e)}>{panel.content}</span>
          </div>
        </div>
      ))}
    </StyledCollapse>
  );
};

export default Collapse;

const StyledCollapse = styled("div")`
  border: 1px solid #dcdcdc;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 2px;

  .collapse-item {
    border-bottom: 1px solid #dcdcdc;

    &:last-child {
      border: none;
    }
  }

  .collapse-panel {
    border-top: 1px solid #dcdcdc;
  }
`;
