import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const storedTotalTime = localStorage.getItem("totalTime");
  const initialTime = storedTotalTime ? parseInt(storedTotalTime, 10) : 0;

  const [time, setTime] = useState(initialTime);
  const [timeRunning, setTimeRunning] = useState(true);

  const incrementTime = () => {
    if (timeRunning) {
      setTime((prevTimer) => prevTimer + 1);
    }
  };

  const resetTime = () => {
    setTime(0);
  };
  const TimeRunning = () => {
    if (timeRunning) {
      setTimeRunning(true);
    }
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

  return <TimerContext.Provider value={{ time, incrementTime, resetTimer, TimeRunning, timeRunning, toggleTimer }}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
