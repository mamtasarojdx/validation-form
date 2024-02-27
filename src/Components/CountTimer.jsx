import { useState, useEffect, useRef } from "react";

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
    if (!isNaN(newLimit) && newLimit >= 0) {
      setLimit(newLimit);
      setTimer(isCountUp ? 0 : newLimit);
      setTimerCompleted(false);
      setTimerRunning(true);
      setLastPausedTime(0); // Reset the last paused time
    }
  };
  const handleStopTimer = () => {
    setLastPausedTime(timer); // Store the last paused time
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setLimitInput("");
    setLimit(null);
    setTimer(0);
    setTimerCompleted(false);
    setTimerRunning(false);
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

            // Delay the auto-reset by 1 second
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
    </>
  );
}

export default CountTimer;
