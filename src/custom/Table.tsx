import { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import ChevronIcon from "@public/icons/chevron.svg";
import LoadingOutlined from "@public/icons/loading.svg";

type Column = {
  title: string | React.ReactNode;
  data: string | React.ReactNode | ((row_data: any) => React.ReactNode);
  width?: number;
  expandItem?: (row_data: any) => React.ReactNode;
};

interface Props {
  data: Array<any>;
  columns: Array<Column>;
  loading?: boolean;
  pagination?: boolean;
}

const Table: React.FC<Props> = (props) => {
  const { columns, data, loading, pagination } = props;
  const table_data = useRef(data) as MutableRefObject<Array<any>>;

  const [tableData, setTableData] = useState<Array<any>>(data);
  const [expandedRows, setExpandedRows] = useState<Array<number>>([]);

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
          <input
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              height: "100%",
              padding: "0 12px",
            }}
            placeholder="Search"
          />
        </div>

        <div className="my-table">
          <div className="table-head" style={{ display: "grid", gridTemplateColumns }}>
            {header.map((title, index) => (
              <div
                key={index}
                className="text-[#6D7175] fs-14 font-500"
                style={{
                  marginLeft: columns[index].expandItem ? 26 : 0,
                }}
              >
                {title}
              </div>
            ))}
          </div>

          <div
            className="table-body"
            style={{ position: "relative", minHeight: tableData.length === 0 ? 180 : 0 }}
          >
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

            {!loading && tableData.length === 0 ? (
              <div
                className="flex items-center flex-col justify-center"
                style={{ position: "absolute", inset: 0, height: "100%" }}
              >
                <p className="mt-2 font-500">No data found</p>
              </div>
            ) : null}

            {tableData.map((row, row_index) => (
              <div key={row_index} className="table-row items-center">
                <section style={{ display: "grid", gridTemplateColumns }}>
                  {columns.map((col, col_index) => (
                    <div key={`${row_index}-${col_index}`} className="fs-14 flex items-center gap-3">
                      {col.expandItem ? (
                        <div style={{ width: 20 }} role="button">
                          {/* This condition will check whether to show the icon on a row.
                              For example if the don't have anything to display in sub table then the icon won't show
                              For this you need to return null or undefined in expandItem key.
                          */}
                          {col.expandItem(row) ? (
                            <span
                              style={{
                                border: "1px solid #1e1e2c",
                                borderRadius: 4,
                                padding: 3,
                                display: "block",
                              }}
                              onClick={() => {
                                if (expandedRows.includes(row_index)) {
                                  const index = expandedRows.indexOf(row_index);
                                  expandedRows.splice(index, 1);
                                } else {
                                  expandedRows.push(row_index);
                                }
                                setExpandedRows([...expandedRows]);
                              }}
                            >
                              <ChevronIcon
                                style={{
                                  transition: "0.3s",
                                  color: "#1e1e2c",
                                  width: 12,
                                  rotate: expandedRows.includes(row_index) ? "180deg" : "90deg",
                                }}
                              />
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      {typeof col.data === "function" ? col.data(row) : col.data}
                    </div>
                  ))}
                </section>
                <section
                  style={{
                    padding: "0 24px 24px 24px",
                    display: expandedRows.includes(row_index) ? "block" : "none",
                  }}
                >
                  {columns[0]?.expandItem?.(row)}
                </section>
              </div>
            ))}
          </div>
        </div>
      </StyledTable>

      {pagination === false ? null : (
        <div
          className="flex bg-white"
          style={{
            width: 72,
            height: 36,
            border: "1px solid #BABFC3",
            borderRadius: 4,
            margin: "16px auto",
          }}
        >
          <span
            role="button"
            className="flex flex-1 items-center justify-center"
            style={{ borderRight: "1px solid #e1e1e2" }}
          >
            <ChevronIcon style={{ color: "#5C5F62", width: 10, rotate: "-90deg" }} />
          </span>

          <span role="button" className="flex flex-1 items-center justify-center">
            <ChevronIcon style={{ color: "#5C5F62", width: 10, rotate: "90deg" }} />
          </span>
        </div>
      )}
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
    height: 38px;
    padding: 8px 12px;
  }

  .table-head {
    padding: 8px 12px;
    background-color: #1e1e2c;
    color: #fff;
  }

  .table-row {
    padding: 8px 12px;
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
