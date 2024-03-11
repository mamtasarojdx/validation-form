import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogOutTimer() {
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 3) {
      toast.success(`You have completed ${timer} seconds!`);
      navigate("/login-timer", { state: { totalTime: timer } });
    }
  }, [timer, navigate]);

  return (
    <>
      <div>
        {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
      </div>
      <div>
        <button onClick={() => navigate("/login-timer")}>Logout Page</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default LogOutTimer;
