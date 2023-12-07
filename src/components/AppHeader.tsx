"use client";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        className="flex items-center px-5 py-[14px] gap-3"
        style={{ borderBottom: "1px solid #E1E3E5" }}
      >
        <img src="/images/logo.png" width={28} height={28} />
        <p className="m-0">easyDHL</p>
      </div>
      <StyeledHeader>
        <Link href="/">
          <div className={`header-item ${["/", "/order"].includes(pathname) ? "selected" : ""}`}>
            <p className="header-content">Dashboard</p>
          </div>
        </Link>

        <Link href="/Uploads">
          <div className={`header-item ${pathname === "/Uploads" ? "selected" : ""}`}>
            <p className="header-content">Uploads</p>
          </div>
        </Link>

        <Link href="/plan">
          <div className={`header-item ${pathname === "/plan" ? "selected" : ""}`}>
            <p className="header-content">Plan</p>
          </div>
        </Link>

        <Link href="/settings-wix">
          <div className={`header-item ${pathname === "/settings-wix" ? "selected" : ""}`}>
            <p className="header-content">Support</p>
          </div>
        </Link>
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
