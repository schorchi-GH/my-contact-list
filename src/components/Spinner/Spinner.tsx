import spinner from "../../assets/spinner.svg";
import "./Spinner.scss";

export const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <img src={spinner} alt="Loading spinner..." />
    </div>
  );
};
