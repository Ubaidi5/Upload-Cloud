"use client";
import { createPortal } from "react-dom";
import CancelIcon from "@public/icons/cancel.svg";

type Props = {
  open: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
};

const Modal: React.FC<Props> = ({ open, children, bgColor = "#fff", onCancel, style, className }) =>
  open &&
  createPortal(
    <>
      <div className="mask" onClick={onCancel} />
      <div className="modal-wrapper">
        <div className={`modal ${className}`} style={style ? style : undefined}>
          <div className="modal-content" style={{ background: bgColor }}>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );

export default Modal;
