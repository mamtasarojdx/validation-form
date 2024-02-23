import React, { useEffect, useState } from "react";
import Style from "./LoginDataStyle.module.css";
import UserData from "./LoginData.json";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginFormData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [limitInput, setLimitInput] = useState("");
  const [limit, setLimit] = useState(null);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [userList, setUserList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
      setLimitInput(`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`);
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

  const fetchUserListFromServer = () => {
    return [...UserData];
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login-page");
    } else {
      const fetchedUserList = fetchUserListFromServer();
      setUserList(fetchedUserList);

      setTimeout(() => {
        setLoading(false);
      });
    }
  }, [loggedInUser, navigate]);

  const removeUserByEmail = (email) => {
    const updatedUserList = userList?.filter((u) => u.email !== email);
    setUserList(updatedUserList);
    navigate("/login-table", { state: { userList, loggedInUser } });
  };

  const handleReset = () => {
    navigate("/login-page");
    localStorage.removeItem("loggedInUser");

    setUserList([]);
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
                        <p className={` ${Style.timerText}`}>Please enter the specific time:</p>

                        {/* {limit ? (
                          <>
                            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
                          </>
                        ) : (
                          <>
                            {isTimerRunning && time===limit ? (""):(<> <input type="number" value={limitInput} onChange={handleLimitInputChange} className={`${Style.timerInput}`} /></>)}
                           
                          </>
                        )} */}

                        {limit ? (
                          !timerCompleted && time === limit ? (
                            <>
                               <input type="number"  value={limitInput} onChange={handleLimitInputChange} className={`${Style.timerInput}`} />
                            </>
                          ) : (
                            <>
                              {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
                            </>
                          )
                        ) : (
                          <>
                            {" "}
                            <input type="number" value={limitInput} onChange={handleLimitInputChange} className={`${Style.timerInput}`} />
                          </>
                        )}

                        <div>
                          {/* {isTimerRunning ? (
                            <>
                              <button onClick={handleStopTimer} className={`${Style.timerStop}`}>
                                Pause
                              </button>
                            </>
                          ) : (
                            <>
                              {" "}
                              <button onClick={handleLimitSubmit} className={`${Style.timerStart}`}>
                                Play
                              </button>
                            </>
                          )} */}
                          

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
                              {" "}
                              <button onClick={handleLimitSubmit} className={`${Style.timerStart}`}>
                                Play
                              </button>
                              <button onClick={resetTimer} className={`${Style.timerReset}`}>
                            Reset
                          </button>
                            </>
                          )}
                          <ToastContainer />
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
