import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormData from "./LoginFormData";
import LoginPage from "./LoginPage";

const Protected = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("credentials");
    if (!user) {
      localStorage.getItem("credentials");
      setTimeout(() => {
        setIsLoggedIn(false);
        // navigate("/login-page");
      }, 2000);
    } 
    else {
      setIsLoggedIn(false);
    }
  }, []);
  return <>{isLoggedIn ? <LoginPage /> : <LoginFormData />}</>;
};

export default Protected;
