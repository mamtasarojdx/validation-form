import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const storedTotalTime = localStorage.getItem("totalTime");
  const initialTime = storedTotalTime ? parseInt(storedTotalTime) : 0;

  const storedRunningState = localStorage.getItem("timerRunning");
  const initialRunningState = storedRunningState ? JSON.parse(storedRunningState) : true;

  const [time, setTime] = useState(initialTime);
  const [timeRunning, setTimeRunning] = useState(initialRunningState);

  const incrementTime = () => {
    if (timeRunning) {
      setTime((prevTimer) => prevTimer + 1);
    }
  };

  const resetTime = () => {
    setTime(0);
  };

  const toggleTimer = () => {
    setTimeRunning((prev) => !prev);
  };

  const resetTimer = () => {
    resetTime();
  };

  useEffect(() => {
    localStorage.setItem("totalTime", time);
  }, [time]);
  console.log(time);

  useEffect(() => {
    sessionStorage.setItem("timerRunning", JSON.stringify(timeRunning));
  }, [timeRunning]);

  return <TimerContext.Provider value={{ time, incrementTime, resetTimer, timeRunning, toggleTimer }}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
