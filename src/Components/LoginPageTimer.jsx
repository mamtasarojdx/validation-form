import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LogOutTimer from "./LogOutTimer";
import { toast } from "react-toastify";

function LoginPageTimer() {
    const [totalTime, setTotalTime] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (location.state && location.state.totalTime) {
        setTotalTime(location.state.totalTime);
      }
    }, [location.state]);
  
    function handleLogin() {
      setTotalTime(0);
      navigate("/logout-timer");
    }
  
    return (
      <>   {totalTime > 0 && (
        <div>
          Total time: {totalTime} seconds
        </div>
      )}
        <div setTotalTime={setTotalTime} >
        <button onClick={handleLogin}>Login Page</button></div>
     
      </>
    );
  }
  
  
export default LoginPageTimer;
