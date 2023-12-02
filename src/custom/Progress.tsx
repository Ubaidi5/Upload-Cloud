interface Props {
  percent: number;
  strokeColor?: string;
  className?: string;
}

const Progress: React.FC<Props> = (props) => {
  const { percent = 0, strokeColor, className } = props;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        backgroundColor: "#e4e5e7",
        height: 8,
        borderRadius: 100,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          width: `${percent}%`,
          backgroundColor: strokeColor,
          display: "block",
          height: "100%",
          borderRadius: 100,
        }}
      ></span>
    </div>
  );
};

export default Progress;
