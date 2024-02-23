import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Style from "./LoginDataStyle.module.css";

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
    if (!isNaN(newLimit) && newLimit > 0) {
      setLimit(newLimit);
      setTimerRunning(true);
      setTimerCompleted(false);
    } else {
      toast.error("Please enter a valid positive number for the timer limit.", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
    setLimitInput(`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`);
  };

  const resetTimer = () => {
    setLimitInput("");
    setLimit(null);
    setTime(0);
    setTimerRunning(false);
    setTimerCompleted(false);
  };

  const handleTimerCompletion = () => {
    if (time >= limit) {
      resetTimer();
      setTimerCompleted(true);
      toast.success("Timer completed! Click OK to reset.", {
        position: "top-center",
        onClose: () => setTimerRunning(false),
      });
    }
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning && time < limit) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        if (time === limit) {
          handleTimerCompletion();
        }
      }, 1000);
    } else if (time >= limit) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, time, limit]);

  return (
    <div>
      <p>Please enter the specific time:</p>

      {isTimerRunning ? (
        !timerCompleted && time === limit ? (
          <>
            <input type="text" value={limitInput}  />
          </>
        ) : (
          <>
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </>
        )
      ) : (
        <>
          {" "}
          <input type="number" value={limitInput} onChange={handleLimitInputChange} />
        </>
      )}

      <div>
        {isTimerRunning ? (
          <>
          <button onClick={handleStopTimer}>Pause</button>
         
          </>
        ) : (
          <>
            {" "}
            <button onClick={handleLimitSubmit}>Play</button>
          </>
        )}
      </div>
      <div>
        <button onClick={resetTimer}>Reset</button>
        <ToastContainer />
      </div>
    </div>
  );
};
export default CountTimer;
