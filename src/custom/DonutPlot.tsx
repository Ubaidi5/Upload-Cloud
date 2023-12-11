interface Props {
  size?: number;
}

const DonutPlot: React.FC<Props> = (props) => {
  const { size = 200 } = props;
  let used = 2800,
    total = 4000;

  const percentage = (used * 100) / total;

  return (
    <section
      className="flex items-center justify-center"
      style={{
        background: `conic-gradient(#f29f67 ${percentage}%, #e2e2e2 0)`,
        borderRadius: "50%",
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          backgroundColor: "#fff",
          // color: "#f29f67",
        }}
        className="flex items-center justify-center fs-16 fw-600 fc-dark"
      >
        {`${Math.floor(percentage)}%`}
      </div>
    </section>
  );
};

export default DonutPlot;
