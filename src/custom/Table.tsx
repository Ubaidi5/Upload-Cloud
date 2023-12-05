"use client";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import ChevronIcon from "@public/icons/chevron.svg";
import { Select } from "@/custom";
import LoadingOutlined from "@public/icons/loading.svg";

type Column = {
  title: string | React.ReactNode;
  data: string | React.ReactNode | ((row_data: any) => React.ReactNode);
  width?: number;
};

interface Props {
  data: Array<any>;
  columns: Array<Column>;
  loading?: boolean;
}

const Table: React.FC<Props> = (props) => {
  const { columns, data, loading } = props;
  const table_data = useRef(data) as MutableRefObject<Array<any>>;

  const [tableData, setTableData] = useState<Array<any>>([]);
  const [status, setStatus] = useState("all");

  const header = columns.map((col) => col.title);

  const gridTemplateColumns = columns.reduce((init, col) => {
    if (col.width) {
      init += `${col.width}px `;
    } else {
      init += "1fr ";
    }
    return init;
  }, "");

  useEffect(() => {
    setTableData(data);
    table_data.current = data;
  }, [data]);

  return (
    <>
      <StyledTable>
        <div className="top-bar">
          <Select
            options={[
              { label: "All", value: "all" },
              { label: "Fulfilled", value: "FULFILLED" },
              { label: "Unfullfilled", value: "NOT_FULFILLED" },
            ]}
            style={{ width: 150 }}
            className="custom-select"
            value={status}
            onChange={(val) => {
              console.log("Val", val);
              const filtered_data = table_data.current.filter(
                (order) => val === "all" || order.fulfillmentStatus === val
              );
              setTableData(filtered_data);
              setStatus(val);
            }}
          />
        </div>
        <div className="my-table">
          <div className="table-row table-head" style={{ display: "grid", gridTemplateColumns }}>
            {header.map((title, index) => (
              <div key={index} className="text-[#6D7175] fs-12 font-500">
                {title}
              </div>
            ))}
          </div>

          <div className="table-body" style={{ position: "relative", minHeight: 200 }}>
            {loading ? (
              <div
                className="flex items-center flex-col justify-center"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  height: "100%",
                }}
              >
                <LoadingOutlined style={{ width: 36, color: "#458FFF" }} className="rotate" />
                <p className="mt-2 font-500 text-[#458FFF]">Loading...</p>
              </div>
            ) : null}

            {loading === false && tableData.length === 0 ? (
              <div
                className="flex items-center flex-col justify-center"
                style={{ position: "absolute", inset: 0, height: "100%" }}
              >
                <p className="mt-2 font-500">No data found</p>
              </div>
            ) : null}

            {tableData.map((row, row_index) => (
              <div
                key={row_index}
                className="table-row items-center"
                style={{ display: "grid", gridTemplateColumns }}
              >
                {columns.map((col, col_index) => (
                  <div key={col_index} className="fs-14">
                    {typeof col.data === "function" ? col.data(row) : col.data}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </StyledTable>

      <div
        className="flex bg-white mx-auto mt-4"
        style={{ width: 72, height: 36, border: "1px solid #BABFC3", borderRadius: 4 }}
      >
        <span
          role="button"
          className="flex flex-1 items-center justify-center"
          style={{ borderRight: "1px solid #e1e1e2" }}
        >
          <ChevronIcon style={{ color: "#5C5F62", width: 10 }} />
        </span>

        <span role="button" className="flex flex-1 items-center justify-center">
          <ChevronIcon style={{ color: "#5C5F62", width: 10, rotate: "180deg" }} />
        </span>
      </div>
      {/* <span className="fc-dimm">1/3</span> */}
    </>
  );
};

export default Table;

const StyledTable = styled("div")`
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .top-bar {
    height: 48px;
    padding: 8px 12px;
  }

  .table-row {
    padding: 8.5px 12px;
    border-top: 1px solid #e1e3e5;
  }

  .table-row:nth-child(odd) {
    background-color: #fafbfb;
  }

  .custom-select .select-box {
    width: 150px;
    background-color: #458fff30;
    border: none;
    height: 32px;
  }
  .select-label {
    color: #458fff;
  }

  .option {
    font-size: 14px;
  }
`;
