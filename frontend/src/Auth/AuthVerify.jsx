import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //const accessToken = localStorage.getItem("accessToken");

    const checkTokenExpiration = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedJwt = parseJwt(accessToken);
        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
          logOut();
          navigate("/login"); // Redirect to login page on token expiration
        }
      }
    };

    //     const unlisten = navigate.listen(checkTokenExpiration);

    //     return () => {
    //       unlisten(); // Clean up the listener on component unmount
    //     };
  }, [logOut, navigate]);

  return null;
};

export default AuthVerify;
