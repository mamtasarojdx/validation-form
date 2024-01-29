import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { SignupSchema } from "../../schemas";
import { Country, State, City } from "country-state-city";

import Select from "react-select";

import Style from "./AlertRegistration.module.css";
import { useNavigate } from "react-router-dom";

const AlertRegistration = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    qualification: [],
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newValue = checked ? [...values[name], value] : values[name].filter((val) => val !== value);
      setValues({ ...values, [name]: newValue });
    } else {
      setValues({ ...values, [name]: value });
    }
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
      alert(errorMessage);
    } else {
      navigate("/registration", { state: { formData: values } });
    }
  };

  const validate = (values) => {
    const errors = {};
    const nameRegExp = /^[A-Z][a-z]*$/;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = /^\d{10}$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

    //  -----------------------------------firstName---------------------------------------
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (!nameRegExp.test(values.firstName)) {
      errors.firstName = "First Name is not valid. Please use only letters and start with a capital letter";
    } else if (values.firstName.length < 4) {
      errors.firstName = "First Name must be more than 4 character!";
    } else if (values.firstName.length > 30) {
      errors.firstName = "First Name can not exceed more than 30 character!";
    }

    //  -----------------------------------lastName--------------------------------------------
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    } else if (!nameRegExp.test(values.lastName)) {
      errors.lastName = "Last Name is not valid. Please use only letters and start with a capital letter";
    } else if (values.lastName.length < 5) {
      errors.lastName = "Last Name must be more than 5 character!";
    } else if (values.lastName.length > 30) {
      errors.lastName = "Last Name can not exceed more than 30 character!";
    }

    //  -----------------------------------email-------------------------------------------------
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a validate email format!";
    }

    //  -----------------------------------phoneNumber----------------------------------------------
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required!";
    } else if (!phoneNumberPattern.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number is not valid. Please enter only integer and 10 digits!";
    } else if (values.phoneNumber.length < 10) {
      errors.phoneNumber = "Phone Number must be 10 digits!";
    } else if (values.phoneNumber.length > 10) {
      errors.phoneNumber = "Phone Number must be only 10 digits!";
    }

    //  -----------------------------------Qualification----------------------------------------------
    if (!values.qualification) {
      errors.qualification = "Qualification is required!";
    }

    //  -----------------------------------gender----------------------------------------------
    if (!values.gender) {
      errors.gender = "Gender is required!";
    }

    //  -----------------------------------Country----------------------------------------------
    if (!values.country) {
      errors.country = "Country is required!";
    }

    //  -----------------------------------State----------------------------------------------
    if (!values.state) {
      errors.state = "State is required!";
    }

    //  -----------------------------------City----------------------------------------------
    if (!values.city) {
      errors.city = "City is required!";
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

    //  -----------------------------------confirm password--------------------------------------------
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password should not be empty";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password and Confirm Password should be the same";
    }
    return errors;
  };

  return (
    <>
      <h3 className="mb-4 text-uppercase text-center">Registration form With Inline Validation</h3>
      <section classNameName=" bg-dark">
        <form onSubmit={handleSubmit}>
          <div className="container ">
            <div className={`row d-flex justify-content-center align-items-center  ${Style.formRow}`}>
              <div className="col">
                <div className="card card-registration ">
                  <div className="row">
                    <div className={`col-lg-12 ${Style.validationCard}`}>
                      <div className="card-body p-md-2 text-black">
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            {/* -----------------------------------first name------------------------ */}
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1m">
                                First Name
                              </label>
                              <input
                                type="firstName"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                value={values.firstName}
                                onChange={handleChange}
                                name="firstName"
                              />
                            </div>
                          </div>

                          {/* -----------------------------------last name------------------------ */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                value={values.lastName}
                                onChange={handleChange}
                                name="lastName"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/*--------------- ----------email--------------------------- */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1m1">
                                E-mail
                              </label>
                              <input
                                type="email"
                                id="form3Example1m1"
                                className="form-control form-control-lg"
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                              />
                            </div>
                          </div>

                          <div className="col-md-6 mb-1">
                            {/* -----------------------------------------phone no------------------------- */}
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n1">
                                Phone No.
                              </label>
                              <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control form-control-lg"
                                value={values.phoneNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        {/* -----------------------------------------qualification------------------------- */}
                        <div className="row">
                          <div className="col-md-6  justify-content-start align-items-center ">
                            <h6 className="mb-0 me-4 fw-bold">Qualification: </h6>

                            <div className="form-check form-check-inline mt-2 mb-0 me-4">
                              <label className="form-check-label " for="femaleGender">
                                10
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="10"
                                onChange={handleChange}
                                checked={values.qualification.includes("10")}
                              />
                            </div>

                            <div className="form-check form-check-inline mt-2 mb-0 me-4">
                              <label className="form-check-label " for="maleGender">
                                12
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="12"
                                onChange={handleChange}
                                checked={values.qualification.includes("12")}
                              />
                            </div>

                            <div className="form-check form-check-inline mt-2 mb-0">
                              <label className="form-check-label " for="maleGender">
                                Bachelor
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="Bachelor"
                                onChange={handleChange}
                                checked={values.qualification.includes("Bachelor")}
                              />
                            </div>

                            <div className="form-check form-check-inline mt-2 mb-0">
                              <label className="form-check-label " for="maleGender">
                                Master
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="Master"
                                onChange={handleChange}
                                checked={values.qualification.includes("Master")}
                              />
                            </div>
                          </div>

                          {/* -----------------------------------------gender------------------------- */}
                          <div className="col-md-6  justify-content-start align-items-center ">
                            <h6 className="mb-0 me-4 fw-bold">Gender: </h6>

                            <div className="form-check form-check-inline mt-2 mb-0 me-4">
                              <label className="form-check-label " for="femaleGender">
                                Female
                              </label>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="femaleGender"
                                value="female"
                                onChange={handleChange}
                                checked={values.gender === "female"}
                              />
                            </div>

                            <div className="form-check form-check-inline mt-2 mb-0 me-4">
                              <label className="form-check-label " for="maleGender">
                                Male
                              </label>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="maleGender"
                                value="male"
                                onChange={handleChange}
                                checked={values.gender === "male"}
                              />
                            </div>

                            <div className="form-check form-check-inline mt-2 mb-0">
                              <label className="form-check-label " for="maleGender">
                                Others
                              </label>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="otherGender"
                                value="other"
                                onChange={handleChange}
                                checked={values.gender === "other"}
                              />
                            </div>
                          </div>
                        </div>
                        {/* -----------------------------------------country------------------------- */}
                        <div className="col-md-6 mb-1">
                          <label className="form-label fw-bold  " for="form3Example1n1">
                            Country
                          </label>{" "}
                        </div>

                        <div className="col-md-12 mb-1">
                          <select className={`select ${Style.selectValue}`} name="country" onChange={handleChange}>
                            <option>Select Your country</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>

                        {/* -----------------------------------state------------------------ */}
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1m">
                                State
                              </label>
                              <input
                                type="firstName"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                value={values.state}
                                onChange={handleChange}
                                name="state"
                              />
                            </div>
                          </div>
                          {/* -----------------------------------city------------------------ */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n">
                                City
                              </label>
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                value={values.city}
                                onChange={handleChange}
                                name="city"
                                autoComplete="off"
                              />
                            </div>
                          </div>{" "}
                        </div>

                        <div className="row mb-2">
                          <div className="col-md-4 mb-1">
                            <h6>Country</h6>
                            <select className={`select ${Style.selectValue2}`} name="country" onChange={handleChange}>
                              <option>Select Your country</option>
                              <option value="India">India</option>
                              <option value="China">China</option>
                              <option value="Italy">Italy</option>
                              <option value="Japan">Japan</option>
                              <option value="Canada">Canada</option>
                            </select>
                          </div>

                          <div className="col-md-4 mb-1">
                            <h6>States</h6>
                            <select className={`select ${Style.selectValue3}`} name="state" onChange={handleChange}>
                              <option>Select Your States</option>
                              <option value="Orissa">Orissa</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Goa">Goa</option>
                              <option value="Assam">Assam</option>
                            </select>
                          </div>

                          <div className="col-md-4 mb-1">
                            <h6>City</h6>
                            <select className={`select ${Style.selectValue4}`} name="city" onChange={handleChange}>
                              <option>Select Your City</option>
                              <option value="Sirhind">Sirhind</option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Mohali">Mohali</option>
                              <option value="Jalandhar">Jalandhar</option>
                              <option value="Rajpura">Rajpura</option>
                            </select>
                          </div>
                        </div>
                        {/* -----------------------------------------password------------------------- */}
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold " for="form3Example1m1">
                                Password
                              </label>
                              <input
                                type="password"
                                id="form3Example1m1"
                                className="form-control form-control-lg"
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                autoComplete="new-password"
                              />{" "}
                            </div>
                          </div>

                          {/* ----------------------------------------- confirm password------------------------- */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n1">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                id="form3Example1n1"
                                className="form-control form-control-lg"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end pt-1 ">
                          <button type="reset" className="btn btn-danger btn-lg " onClick={handleReset}>
                            Reset
                          </button>
                          <button type="submit" className="btn btn-warning  text-white btn-lg ms-2">
                            Submit
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
    </>
  );
};
export default AlertRegistration;
