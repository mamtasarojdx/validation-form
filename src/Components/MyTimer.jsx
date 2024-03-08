import React, { useState } from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { totalSeconds, seconds, isRunning, start, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => console.warn("onExpire called") });

  const [timerLabel, setTimerLabel] = useState("Not running");

  return (
    <div>
      {timerLabel ? (
        <>
          <div>
            00:<span>{seconds}</span>
          </div>
          <p>{timerLabel}</p>
        </>
      ) : (
        <>
          <input type="number" placeholder="Enter the Seconds" />
        </>
      )}

      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button
          onClick={() => {
            start();
            setTimerLabel("Running");
          }}
        >
          Start
        </button>
      )}

      <button
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
          setTimerLabel("Running");
        }}
      >
        Reset
      </button>
    </div>
  );
}
export default MyTimer;
