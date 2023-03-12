import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./NoPageFound.scss";
import noPageFoundImage from "./noPageFoundImage.png";

const NoPageFound = () => {
  const navigate = useNavigate();

  return (
    <div className="no-page-found__container">
      <button className="back-button " onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} className="no-page-found__icon" />{" "}
        Return to homepage
      </button>
      <img
        src={noPageFoundImage}
        alt="No Page Found"
        className="no-page-found__image"
      />
      <h1 className="no-page-found__title">Oops! Page not found</h1>
      <p className="no-page-found__message">
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NoPageFound;
