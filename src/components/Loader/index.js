import { RotatingLines } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => (
  <div className="loader-container">
    <div className="loader">
      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  </div>
);

export default Loader;
