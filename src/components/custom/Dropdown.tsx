import { useState, MutableRefObject, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import ChevronIcon from "@public/icons/chevron.svg";

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { children, overlay } = props;

  const [collapsed, toggleCollapsed] = useState(true);

  const popover = useRef() as MutableRefObject<any>;

  useClickOutside(popover, () => toggleCollapsed(true));

  return (
    <>
      <div className="custom-dropdown">
        <div className="children" onClick={() => toggleCollapsed(!collapsed)} role="button">
          <span onMouseDown={() => toggleCollapsed(true)}>{children}</span>
          <ChevronIcon className="dropdown-icon" />
        </div>

        {collapsed ? null : (
          <div className="dropdown-overlay" ref={popover}>
            {typeof overlay === "function" ? overlay(collapsed, toggleCollapsed) : overlay}
          </div>
        )}
      </div>

      <style>
        {`
          .custom-dropdown {
            position: relative;
          }
          .children {
            border: 1px solid #898f94;
            border-radius: 5px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            background-color: #fff;
          }

          .dropdown-overlay {
            padding: 6px;
            border: 1px solid #898f94;
            border-radius: 5px;
            position: absolute;
            top: 38px;
            left: 0;
            right: 0;
            background-color: #fff;
            z-index: 1000;
          }

          .dropdown-icon {
            transition: 0.3s;
            rotate: ${collapsed ? "180deg" : "0deg"};
            color: #898f94;
            width: 16px;
          }
        `}
      </style>
    </>
  );
};

export default Dropdown;
