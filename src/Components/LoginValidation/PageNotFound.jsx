import React, { useEffect } from "react";
import style from "./LoginDataStyle.module.css";
import { Link } from "react-router-dom";
import { useTimer } from "./TimerContext";

function PageNotFound() {
  const { time, toggleTimer, incrementTime, TimeRunning, timeRunning } = useTimer();
  useEffect(() => {
    let interval;

    if (timeRunning) {
      interval = setInterval(() => {
        incrementTime();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeRunning, incrementTime]);

  return (
    <>
      <div className="container-fluid" id={style.forget2}>
        <div className="row">
          <div className="col-lg-12">
            <h1 className={style.pageHead}>Page Not Found</h1>
            <Link to="/">
              {" "}
              <div className="text-center">
                <button type="button" className={style.backBtn}>
                  Back
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
