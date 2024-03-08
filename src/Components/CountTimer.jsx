import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const CountTimer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [limitInput, setLimitInput] = useState('');
  const [limit, setLimit] = useState(null);
  const intervalIdRef = useRef();

  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setLimit(null);
    setRunning(false);
  };

  const handleLimitInputChange = (event) => {
    setLimitInput(event.target.value);
  };

  const handleLimitSubmit = () => {
    const newLimit = parseInt(limitInput, 10);
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setTimer(0);
      setRunning(true);
      intervalIdRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const updatedTimer = prevTimer + 1;
          if (updatedTimer >= newLimit) {
            clearInterval(intervalIdRef.current);
            setLimit(null);
            setRunning(false);
          }
          return updatedTimer;
        });
      }, 1000);
    } else {
      alert('Please enter a valid positive number for the limit.');
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <div>
      {!isRunning ? (
        <input
          type="number"
          placeholder="Enter the Seconds"
          value={limitInput}
          onChange={handleLimitInputChange}
        />
      ) : (
        <div>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</div>
      )}
      {isRunning ? (
        <button onClick={pauseTimer}>Pause</button>
      ) : (
        <button onClick={handleLimitSubmit}>Play</button>
      )}
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}


export default CountTimer;
