import React from "react";

interface Props {
  size: number;
}

const DonutPlot: React.FC<Props> = (props) => {
  const { size } = props;
  let used = 2800,
    total = 4000;

  const percentage = (used * 100) / total;

  return (
    <section
      className="flex items-center justify-center"
      style={{
        background: `conic-gradient(#01b6a0 ${percentage}%, #e2e2e2 0)`,
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
          backgroundColor: "#1e1e2c",
          color: "#01b6a0",
        }}
        className="flex items-center justify-center fs-24 fw-600"
      >
        {`${Math.floor(percentage)}%`}
      </div>
    </section>
  );
};

export default DonutPlot;
