import React, { useState } from "react";

import Style from "./LoginStyle.module.css";
import { useNavigate } from "react-router-dom";

const LoginValidation = () => {
  const initialValues = {
    email: "",

    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    setErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length > 0) {
      let errorMessage = "";
      Object.keys(errors).forEach((key) => {
        errorMessage += `${errors[key]}\n`;
      });
    //   alert(errorMessage);
    }

     else {
      navigate("/registration", { state: { formData: values } });
    }
  };

  const validate = (values) => {
    const errors = {};

    const emailRegexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

    //  -----------------------------------email-------------------------------------------------
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegexExp.test(values.email)) {
      errors.email = "Please enter a valid email!";
    }

    //  ------------------------------------password------------------------------------------------
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 5 characters!";
    } else if (values.password.length > 15) {
      errors.password = "Password can not exceed more than 15 characters!";
    } else if (!passwordRegExp.test(values.password)) {
      errors.password = "Password must contain at least one uppercase, one lowercase, one number and a special character!";
    }

    return errors;
  };

  return (
    <>
      <div className={`${Style.loginPage}`}>
        <h3 className="mb-5 text-uppercase text-center ">Login form With Validation</h3>
        <section classNameName=" bg-dark">
          <form onSubmit={handleSubmit}>
            <div className="container mt-4">
              <div className={`row d-flex justify-content-center align-items-center  ${Style.formRow}`}>
                <div className="col">
                  <div className="card card-registration ">
                    <div className="row">
                      <div className={`col-lg-12 ${Style.validationCard}`}>
                        <div className="card-body p-md-2 text-black">
                          <div className="row">
                            {/*--------------- ----------email--------------------------- */}
                            <div className="col-md-6 mb-1">
                              <div className="form-outline">
                                <label className={`form-label fw-bold ${Style.inputText1}`} for="form3Example1m1">
                                  E-mail
                                </label>
                                <input
                                  type="text"
                                  id="form3Example1m1"
                                  className={`form-control form-control-lg ${Style.inputMail}`}
                                  value={values.email}
                                  onChange={handleChange}
                                  name="email"
                                  autocomplete="off"
                                />
                              </div>
                            </div>
                            <p className="text-danger">{errors.email}</p>

                            {/* -----------------------------------------password------------------------- */}
                            <div className="col-md-6 mb-1">
                              <div className="form-outline">
                                <label className={`form-label fw-bold ${Style.inputText2}`} for="form3Example1m1">
                                  Password
                                </label>
                                <input
                                  type="password"
                                  id="form3Example1m1"
                                  className={`form-control form-control-lg ${Style.inputMail}`}
                                  value={values.password}
                                  onChange={handleChange}
                                  name="password"
                                  autocomplete="off"
                                />{" "}
                              </div>
                            </div>
                            <p className="text-danger">{errors.password}</p>
                          </div>

                          {/* ----------------------------------------- Login------------------------- */}

                          <div className="d-flex justify-content-end pt-1 mt-3">
                            <button type="submit" className={` ${Style.loginBtn}`}>
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};
export default LoginValidation;
