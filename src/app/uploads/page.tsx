"use client";
import Table from "@/custom/Table";
import DownloadIcon from "@public/icons/download.svg";
import TrashIcon from "@public/icons/trash.svg";
import EyeIcon from "@public/icons/eye-filled.svg";
import { Modal, Button } from "@/custom";
import { MutableRefObject, useRef, useState } from "react";

function Uploads() {
  const file = useRef() as MutableRefObject<any>;
  const [deleteModal, toggleDeleteModal] = useState(false);

  return (
    <>
      <Modal
        open={deleteModal}
        onCancel={() => toggleDeleteModal(false)}
        className="py-5"
        style={{ width: 500 }}
      >
        <h1 className="text-center fc-danger fs-24">Warning!</h1>
        <h3 className="text-center mt-5 mb-8">This action will permanently delete your files</h3>

        <div className="flex items-center justify-center gap-12">
          <Button onClick={() => toggleDeleteModal(false)}>Cancel</Button>
          <Button bgcolor="#f95f53">Delete</Button>
        </div>
      </Modal>

      <div className="py-8">
        <Button bgcolor="#1e1e2c" className="my-5">
          Refresh files
        </Button>
        <Table
          data={[1, 2, 3]}
          columns={[
            {
              title: "Order",
              data: <p>#10001</p>,
              // expandItem: (c) =>
              //   c === 2 ? undefined : (
              //     <>
              //       <h1 className="mb-3 mt-2">Selected Products</h1>
              //       <div className="flex items-center flex-wrap gap-2">
              //         {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((item) => (
              //           <span style={{ backgroundColor: "#ececec", padding: 6, borderRadius: 4 }}>
              //             Polca dots Shirt
              //           </span>
              //         ))}
              //       </div>
              //     </>
              //   ),
              width: 120,
            },
            {
              title: "Product",
              data: () => <p>Ladies bag</p>,
              width: 300,
            },
            {
              title: "Date",
              data: <p>01 Jan 24</p>,
            },
            {
              title: "Customer",
              data: () => <p>Ubaid Hussain</p>,
            },
            {
              title: <p className="text-center">Download</p>,
              data: (data) => (
                <div className="flex items-center justify-center gap-3" style={{ width: "100%" }}>
                  <span>{data} Files</span>
                  <span
                    style={{ backgroundColor: "#193b670d" }}
                    className="rounded py-2 px-3"
                    role="button"
                  >
                    <DownloadIcon style={{ width: 18, color: "#01b6a0" }} />
                  </span>
                </div>
              ),
            },
            {
              title: <p className="text-center">Actions</p>,
              data: (data) => (
                <div className="flex items-center justify-center gap-3" style={{ width: "100%" }}>
                  <span
                    style={{ backgroundColor: "#193b670d" }}
                    className="rounded py-2 px-3"
                    role="button"
                  >
                    <EyeIcon style={{ width: 20, color: "#01b6a0" }} />
                  </span>

                  <span
                    role="button"
                    style={{ backgroundColor: "#193b670d" }}
                    className="rounded py-2 px-3"
                    onClick={() => {
                      file.current = data;
                      toggleDeleteModal(true);
                    }}
                  >
                    <TrashIcon style={{ width: 20, color: "var(--danger)" }} />
                  </span>
                </div>
              ),
              width: 160,
            },
          ]}
        />
      </div>
    </>
  );
}

export default Uploads;
