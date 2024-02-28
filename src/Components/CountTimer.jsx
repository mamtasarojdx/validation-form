import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

function CountTimer() {
  const [limitInput, setLimitInput] = useState("");
  const [limit, setLimit] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [isCountUp, setCountUp] = useState(true);
  const [lastPausedTime, setLastPausedTime] = useState(0);

  const handleLimitInputChange = (event) => {
    setLimitInput(event.target.value);
  };

  const handleLimitSubmit = () => {
    const newLimit = parseInt(limitInput, 10);
    if (limitInput.trim() === "") {
      toast.error("Please enter a specific value");
      return;
    }
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setTimer(lastPausedTime || (isCountUp ? 0 : newLimit));
      setTimerCompleted(false);
      setTimerRunning(true);
      setLastPausedTime(0);
    } else {
      toast.error("Please enter a positive number");
    }
  };

  const handleStopTimer = () => {
    setLastPausedTime(timer);
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setLimitInput("");
    setLimit(null);
    setTimer(0);
    setTimerCompleted(false);
    setTimerRunning(false);
    setLastPausedTime(0); 
  };

  const handleTimerCompletion = () => {
    resetTimer();
    setTimerCompleted(true);
  };

  const toggleCountType = () => {
    if (!isTimerRunning) {
      setCountUp((prevCountUp) => !prevCountUp);
      resetTimer();
    }
  };

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const updatedTimer = isCountUp ? prevTimer + 1 : prevTimer - 1;

          if ((isCountUp && updatedTimer === limit) || (!isCountUp && updatedTimer === 0)) {
            clearInterval(intervalId);

            setTimeout(() => {
              handleTimerCompletion();
            }, 1000);
          }

          return updatedTimer;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning, limit, isCountUp]);


  return (
    <>
      <div>
        <div onClick={toggleCountType}>{isCountUp ? "Count UP Timer" : "Count Down Timer"}</div>
        {limit ? (
          !timerCompleted ? (
            <>
              {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
            </>
          ) : (
            <>Timer completed</>
          )
        ) : (
          <>
            <input type="text" value={limitInput} onChange={handleLimitInputChange} />
          </>
        )}

        <div>
          {isTimerRunning ? (
            <>
              <button onClick={handleStopTimer}>Pause</button>
              <button onClick={resetTimer}>Reset</button>
            </>
          ) : (
            <>
              <button onClick={handleLimitSubmit}>Play</button>
              <button onClick={resetTimer}>Reset</button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CountTimer;
