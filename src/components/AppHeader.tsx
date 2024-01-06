"use client";
import styled from "styled-components";
import { AppLink } from "@/custom";
import { usePathname } from "next/navigation";
import AppIcon from "@public/images/fav-icon.svg";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        className="flex items-center px-5 py-[14px] gap-3"
        style={{ borderBottom: "1px solid #E1E3E5" }}
      >
        <AppIcon style={{ height: 40 }} />
        <p className="m-0 fw-700 fs-20">Upload Cloud</p>
      </div>
      <StyeledHeader>
        <AppLink href="/">
          <div className={`header-item ${["/", "/order"].includes(pathname) ? "selected" : ""}`}>
            <p className="header-content">Dashboard</p>
          </div>
        </AppLink>

        <AppLink href="/uploads">
          <div className={`header-item ${pathname === "/uploads" ? "selected" : ""}`}>
            <p className="header-content">Uploads</p>
          </div>
        </AppLink>

        <AppLink href="/plan">
          <div className={`header-item ${pathname === "/plan" ? "selected" : ""}`}>
            <p className="header-content">Plan</p>
          </div>
        </AppLink>

        {/* <AppLink href="/settings-wix">
          <div className={`header-item ${pathname === "/settings-wix" ? "selected" : ""}`}>
            <p className="header-content">Support</p>
          </div>
        </AppLink> */}
      </StyeledHeader>
    </>
  );
};

export default Header;

const StyeledHeader = styled("header")`
  border-bottom: 1px solid #e1e3e5;
  background-color: transparent;
  padding: 0 12px;

  display: flex;

  .header-item {
    padding: 16px;
    position: relative;
    color: #6d7175;
    margin: 0 4px;
    cursor: pointer;
  }

  .header-item.selected {
    color: #202223;
    ::before {
      content: "";
      position: absolute;
      background-color: #416aed;
      height: 3px;
      left: 0;
      right: 0;
      bottom: -1px;
      border-radius: 4px 4px 0 0;
    }
  }
`;
