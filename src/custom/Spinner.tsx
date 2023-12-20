interface Props {
  width?: number;
  color?: string;
  stroke?: number;
  className?: string;
}

const Spinner: React.FC<Props> = (props) => {
  const { className, width = 16, color = "#6338FA", stroke } = props;

  return (
    <div className={`lds-ring ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <style jsx>{`
        .lds-ring {
          display: inline-block;
          position: relative;
          width: ${width}px;
          height: ${width}px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: ${width}px;
          height: ${width}px;
          border: ${stroke ? stroke : "1"}px solid ${color};
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: ${color} transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
