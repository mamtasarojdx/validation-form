import React, { useEffect, useState } from "react";
import Style from "./LoginDataStyle.module.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function LoginFormData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const [values, setValues] = useState(initialValues);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login-page");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [user, navigate]);

  const handleReset = () => {
    navigate("/login-page");
    localStorage.removeItem("loggedInUser");
    setValues(initialValues);
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
                  <div class={`col-sm-4 bg-c-lite-green ${Style.userProfile}`}>
                    <div class={` text-center text-white ${Style.cardBlock}`}>
                      <div class="m-b-25">
                        <img src={`/Images/${user?.img}`} class={`${Style.imgRadius}`} alt="User-Profile-Image" />
                      </div>
                      <p className="fw-bold mt-4">{InputValue(user?.title)}</p>

                      <p class=" fw-bold ">{InputValue(user?.name)}</p>
                    </div>
                  </div>
                  <div class={`col-sm-8 ${Style.cardContent}`}>
                    <div class={` ${Style.cardBlock}`}>
                      <div class="row ">
                        <div class="col-sm-6">
                          <p class="fw-bold">Email</p>
                          <p class=" fw-bold text-success">{InputValue(user?.email)}</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">Phone Number</p>
                          <p class=" fw-bold text-success">{InputValue(user?.phoneNumber)}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="fw-bold">Qualification</p>
                          <p class=" fw-bold text-success">{InputValue(user?.qualification ? user.qualification + " " : user?.qualification)}</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">Gender</p>
                          <p class=" fw-bold text-success">{InputValue(user?.gender)}</p>
                        </div>
                      </div>{" "}
                      <hr />
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="fw-bold">State</p>
                          <p class=" fw-bold text-success">{InputValue(user?.state)}</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="fw-bold">City</p>
                          <p class=" fw-bold text-success">{InputValue(user?.city)}</p>
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
        <ToastContainer />
      </div>
    </>
  );
}

export default LoginFormData;
