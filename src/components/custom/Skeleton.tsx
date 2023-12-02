import styled from "styled-components";

const Skeleton: React.FC<any> = () => {
  return (
    <StyledSkeleton>
      <div className="skeleton-loader" style={{ width: "30%", minWidth: 100 }}></div>
      <div className="skeleton-loader"></div>
      <div className="skeleton-loader"></div>
      <div className="skeleton-loader" style={{ width: "50%", minWidth: 180 }}></div>
    </StyledSkeleton>
  );
};

export default Skeleton;

const StyledSkeleton = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .skeleton-loader {
    height: 16px;
    background: linear-gradient(90deg, #eeeeee 25%, #dedede 50%, #eeeeee 75%);
    background-size: 200% 100%;
    animation: loading 2s infinite ease-in-out;
    border-radius: 2px;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
