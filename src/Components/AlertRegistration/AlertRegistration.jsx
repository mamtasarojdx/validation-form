import React from "react";
import { Formik, useFormik } from "formik";
import { SignupSchema } from "../../schemas";
import { Country, State, City } from "country-state-city";

import Select from "react-select";

import Style from "./AlertRegistration.module.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  qualification: "",
  gender: "",
  country: "",
  state: "",
  city: "",
  password: "",
  confirmPassword: "",
};

const AlertRegistration = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, setFieldValue, setValues, handleSubmit, handleReset, handleInputBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      alert("Data saved successfully");
      resetForm();

      navigate("/registration", { state: { formData: values } });
    },
  });
  console.log(navigate);

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
                            {/* <p className="text-danger">{errors.firstName}</p> */}
                          </div>

                          {console.log(errors.firstName)}
                          {errors.firstName && (
                            <div className="alert alert-danger" role="alert">
                              {errors.firstName}
                            </div>
                          )}

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
                              {errors.lastName && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.lastName}
                                </div>
                              )}
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
                              {errors.email && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.email}
                                </div>
                              )}
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
                              {errors.phoneNumber && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.phoneNumber}
                                </div>
                              )}
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

                            {errors.qualification && (
                              <div className="alert alert-danger" role="alert">
                                {errors.qualification}
                              </div>
                            )}
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
                            {errors.gender && (
                              <div className="alert alert-danger" role="alert">
                                {errors.gender}
                              </div>
                            )}
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
                        {errors.gender && (
                          <div className="alert alert-danger" role="alert">
                            {errors.gender}
                          </div>
                        )}
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

                              {errors.state && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.state}
                                </div>
                              )}
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

                              {errors.city && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.city}
                                </div>
                              )}
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
                            {errors.country && (
                              <div className="alert alert-danger" role="alert">
                                {errors.country}
                              </div>
                            )}
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
                            {errors.state && (
                              <div className="alert alert-danger" role="alert">
                                {errors.state}
                              </div>
                            )}
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
                            {errors.city && (
                              <div className="alert alert-danger" role="alert">
                                {errors.city}
                              </div>
                            )}
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
                              {errors.password && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.password}
                                </div>
                              )}
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
                              {errors.confirmPassword && (
                                <div className="alert alert-danger" role="alert">
                                  {errors.confirmPassword}
                                </div>
                              )}
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
