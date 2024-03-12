import React, { useEffect, useState } from "react";
import Style from "./LoginDataStyle.module.css";
import UserData from "./LoginData.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginFormData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [time, setTime] = useState(0);
  const [timeRunning, setTimeRunning] = useState(true);
  const [userList, setUserList] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const location = useLocation();

  const fetchUserListFromServer = () => {
    return [...UserData];
  };

  useEffect(() => {
    let interval;

    if (timeRunning) {
      interval = setInterval(() => {
        setTime((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeRunning]);
  useEffect(() => {
    if (!loggedInUser && time) {
      setTimeout(() => {
        sessionStorage.setItem(time, "seconds");
        toast.success(`You have completed ${time} Seconds!`, {
          autoClose: 2000,
        });
      }, 300);

      navigate("/login-page", { state: { totalTime: time } });
    }
  }, [loggedInUser, navigate, time]);

  useEffect(() => {
    const fetchedUserList = fetchUserListFromServer();
    setUserList(fetchedUserList);
    setLoading(false);
  }, [loggedInUser]);

  const handleReset = () => {
    localStorage.removeItem("loggedInUser");
    setUserList([]);
    setTimeRunning(false);
  };

  const removeUserByEmail = (email) => {
    if (!loggedInUser && time) {
      setTimeout(() => {
        setTimeRunning(true);
      }, 300);
    }

    const updatedUserList = userList?.filter((u) => u.email !== email);
    setUserList(updatedUserList);

    navigate("/login-table", { state: { userList, loggedInUser } });
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
