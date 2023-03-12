import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    if (userObject) {
      const { name, picture, sub } = userObject;
      document.getElementById("login").innerHTML = `Hello ${userObject.name}`;
      const userData = {
        userName: name,
        userImage: picture,
        userId: sub,
      };
      console.log(userData);
      navigate("/");
    }
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("login"), {
      theme: "outline",
      size: "big",
    });
  }, []);
};

export default GoogleAuth;
