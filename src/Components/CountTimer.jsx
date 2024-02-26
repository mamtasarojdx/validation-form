import { useState, useEffect } from "react";

const CountTimer = () => {
  const [limitInput, setLimitInput] = useState("");
  const [limit, setLimit] = useState(null);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  const handleLimitInputChange = (event) => {
    setLimitInput(event.target.value);
  };

  const handleLimitSubmit = () => {
    const newLimit = parseInt(limitInput, 10);
    if (!isNaN(newLimit) && newLimit >= 0) {
      setLimit(newLimit);
      setTimerRunning(true);
      setTimerCompleted(false);
      setTime(newLimit);
    }
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setLimitInput("");
    setLimit(null);
    setTime(0);
    setTimerRunning(false);
    setTimerCompleted(false);
  };

  const handleTimerCompletion = () => {
    setTimeout(() => {
      setTimerCompleted(true);

      resetTimer();
      setTimerRunning(false);
      setLimitInput("");
    }, 1000);
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);

        if (time - 1 === 0) {
          clearInterval(interval);
          handleTimerCompletion();
        }
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, time]);

  return (
    <>
      <div>
        <h5>Countdown Timer:</h5>

        {limit ? (
          !timerCompleted ? (
            <>
              {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
            </>
          ) : (
            <>
              <input type="number" value={limitInput} onChange={handleLimitInputChange} />
            </>
          )
        ) : (
          <>
            <input type="number" value={limitInput} onChange={handleLimitInputChange} />
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
};

export default CountTimer;
