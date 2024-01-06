import InfoOutlinedIcon from "@public/icons/info-outlined.svg";

interface Props {
  id?: string;
  name?: string;
  message: string;
}

const InlineError: React.FC<Props> = (props) => {
  const { id, name, message } = props;

  return (
    <p id={id} className="mb-0 mt-1 flex items-center" style={{ color: "#FF4728", gap: 6 }}>
      <InfoOutlinedIcon style={{ rotate: "180deg", height: 14 }} />
      <span className="fw-500 fs-14">{message}</span>
    </p>
  );
};

export default InlineError;
