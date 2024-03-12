import React, { useEffect, useState } from "react";
import Style from "./LoginDataStyle.module.css";
import UserData from "./LoginData.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTimer } from './TimerContext';


function LoginFormData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [userList, setUserList] = useState([]);
  const { time, incrementTime, resetTime, timeRunning, toggleTimer } = useTimer();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [limitInput, setLimitInput] = useState("");
  const [limit, setLimit] = useState(null);
  const [timer, setTimer] = useState(0);

  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [isCountUp, setCountUp] = useState(true);
  const [lastPausedTime, setLastPausedTime] = useState(0);
  const location = useLocation();

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
      toast.error("Please enter a valid number");
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
    setTimerCompleted(true);

    setTimerRunning(false);
    setLimitInput("");
    setLimit(null);
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

          if ((isCountUp && updatedTimer === limit + 1) || (!isCountUp && updatedTimer === 0)) {
            clearInterval(intervalId);
            handleTimerCompletion();
            if (timerCompleted) {
              resetTimer();
            }
          }
          return updatedTimer;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning, limit, isCountUp, timerCompleted]);

  const fetchUserListFromServer = () => {
    return [...UserData];
  };

  useEffect(() => {
    let interval;

    if (timeRunning) {
      interval = setInterval(() => {
        incrementTime();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeRunning, incrementTime]);

  useEffect(() => {
    if (!loggedInUser && time) {
      setTimeout(() => {
        toast.success(`You have completed ${time} Seconds!`, {
          autoClose: 2000,
        });
      }, 300);

      navigate("/login-page", { state: { totalTime: time, timeRunning } });
      console.log(time);
    }
    // else {
    //   const fetchedUserList = fetchUserListFromServer();
    //   setUserList(fetchedUserList);

    //   setTimeout(() => {
    //     setLoading(false);
    //   });
    // }
  }, [loggedInUser, navigate, time, timeRunning]);

  useEffect(() => {
    const fetchedUserList = fetchUserListFromServer();
    setUserList(fetchedUserList);
    setLoading(false);
  }, [loggedInUser]);

  const handleReset = () => {
    localStorage.removeItem("loggedInUser");
    setUserList([]);
    // resetTimer()
  };

  const removeUserByEmail = (email) => {
    const updatedUserList = userList?.filter((u) => u.email !== email);
    setUserList(updatedUserList);

    navigate("/login-table", { state: { userList, loggedInUser } });
    localStorage.setItem("time", time);
    console.log(time);
  };

  const InputValue = (name, value) => {
    return (
      <div>
        <span>{name} </span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <>
      <div class={`page-content page-container ${Style.pageForm}`} id="page-content">
        <div className={` ${Style.loginTimer}`}>00:{String(time).padStart(2, "0")}</div>
        <div class={` ${Style.padding}`}>
          <div class="row container d-flex justify-content-center">
            <div class={`col-xl-6 col-md-12 ${Style.formCard}`}>
              <div class={` ${Style.userCardFull}`}>
                <div class="row m-l-0 m-r-0">
                  <div class={`col-sm-5 bg-c-lite-green ${Style.userProfile}`}>
                    <div class={` text-center text-white ${Style.cardBlock}`}>
                      <div class="m-b-25">
                        <img src={`/Images/${loggedInUser?.img}`} class={`${Style.imgRadius}`} alt="User-Profile-Image" />
                      </div>
                      <p className="fw-bold mt-2">{InputValue(loggedInUser?.title)}</p>

                      <p class={`fw-bold ${Style.cardName}`}>{InputValue(loggedInUser?.name)}</p>
                      <div>
                        <Link
                          to="/login-table"
                          state={{ userList, loggedInUser }}
                          onClick={() => {
                            removeUserByEmail(loggedInUser?.email);
                          }}
                          className={`${Style.tableBtn}`}
                        >
                          Go To User List
                        </Link>
                      </div>

                      <div>
                        <button onClick={toggleCountType} className={`${Style.timerButton}`}>
                          {isCountUp ? "Count UP Timer" : "Count Down Timer"}
                        </button>
                        <div>
                          {" "}
                          {limit ? (
                            <> 00:{String(timer).padStart(2, "0")}</>
                          ) : (
                            <>
                              <input type="number" placeholder="Enter the Seconds" value={limitInput} onChange={handleLimitInputChange} />
                            </>
                          )}
                        </div>

                        <div>
                          {isTimerRunning ? (
                            <>
                              <button onClick={handleStopTimer} className={`${Style.timerStop}`}>
                                Pause
                              </button>
                              <button onClick={resetTimer} className={`${Style.timerReset}`}>
                                Reset
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={handleLimitSubmit} className={`${Style.timerStart}`}>
                                Play
                              </button>
                              <button onClick={resetTimer} className={`${Style.timerReset}`}>
                                Reset
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class={`col-sm-7 ${Style.cardContent}`}>
                    <div class={` ${Style.cardBlock}`}>
                      <div class="row ">
                        <div class="col-sm-6">
                          <p class="fw-bold">Email</p>
                          <p class=" fw-bold text-success">{InputValue(loggedInUser?.email)}</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">Phone Number</p>
                          <p class=" fw-bold text-success">{InputValue(loggedInUser?.phoneNumber)}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="fw-bold">Qualification</p>
                          <p class=" fw-bold text-success">
                            {InputValue(loggedInUser?.qualification ? loggedInUser.qualification + " " : loggedInUser?.qualification)}
                          </p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">Gender</p>
                          <p class=" fw-bold text-success">{InputValue(loggedInUser?.gender)}</p>
                        </div>
                      </div>{" "}
                      <hr />
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="fw-bold">State</p>
                          <p class=" fw-bold text-success">{InputValue(loggedInUser?.state)}</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">City</p>
                          <p class=" fw-bold text-success">{InputValue(loggedInUser?.city)}</p>
                        </div>
                      </div>
                      <button type="button" className={` ${Style.logoutBtn}`} onClick={handleReset}>
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {!loading && <LoginTable loggedInUser={loggedInUser} userList={userList} />} */}
        <ToastContainer />
      </div>
    </>
  );
}

export default LoginFormData;
