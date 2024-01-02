import { useEffect, useState } from "react";
import styled from "styled-components";
import APIS from "@/apis";
import { errorHandler } from "@/apis/config";
import { Spinner, message } from "@/custom";
import DownloadIcon from "@public/icons/download.svg";

interface Props {
  imageId: string;
  orderNumber: number;
}

const UCImage: React.FC<Props> = (props) => {
  const { imageId, orderNumber } = props;

  const [imgSrc, setImgSrc] = useState("");

  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    if (imageId) {
      toggleLoading(true);
      APIS.get_image({ fileName: imageId })
        .then((response) => response.blob())
        .then((result) => {
          const url = URL.createObjectURL(result);
          setImgSrc(url);
        })
        .catch((error) => message.error(errorHandler(error)))
        .finally(() => {
          toggleLoading(false);
        });
    }
  }, [imageId]);

  async function downloadImage() {
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = `order#${orderNumber}__${imageId}`;
    // Trigger a click event on the link
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }

  return (
    <StyledDiv onClick={downloadImage}>
      <div
        style={{ width: 80, height: 80, boxShadow: "1px 2px 3px rgba(0,0,0,0.2)" }}
        className="flex items-center justify-center"
      >
        {loading ? (
          <Spinner width={16} />
        ) : (
          <img src={imgSrc} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
        )}
      </div>
      <p className="uc-download flex flex-col items-center justify-center">
        <DownloadIcon style={{ height: 32, color: "#fff" }} />
        <span>Download</span>
      </p>
    </StyledDiv>
  );
};

export default UCImage;

const StyledDiv = styled("div")`
  position: relative;
  cursor: pointer;

  .uc-download {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
  }

  &:hover .uc-download {
    opacity: 1;
  }
`;
