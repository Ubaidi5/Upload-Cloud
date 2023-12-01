import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  closeable?: boolean;
  width?: number | string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { open, onCancel, children, closeable = true, width = 600 } = props;

  if (open === false) {
    return;
  }

  return (
    <StyledModal>
      <div
        className="modal-mask"
        onClick={() => {
          if (closeable) {
            onCancel();
          }
        }}
      >
        <div
          className="modal-wrapper"
          style={{ width: width }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled("div")`
  .modal-mask {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2147483640;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-wrapper {
    background-color: #fff;
    /* padding: 16px; */
    border-radius: 4px;
    z-index: 2147483647;
  }
`;
