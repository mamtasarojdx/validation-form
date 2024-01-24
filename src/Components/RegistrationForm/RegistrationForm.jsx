import React from "react";
import { Formik, useFormik } from "formik";
import { SignupSchema } from "../../schemas";
import { Country, State, City } from "country-state-city";
// import csc from "country-state-city";
import Select from "react-select";

import Style from "./RegistrationStyle.module.css";
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

// const countries = csc.getAllCountries();

const RegistrationForm = () => {
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
      <h3 className="mb-3 text-uppercase text-center">Registration form</h3>
      <section classNameName=" bg-dark">
        {/* {Object.keys(errors).length === 0 && isSubmit ? (
          <div className="ui message success">signed in Successfully</div>
        ) : (
          <pre>{JSON.stringify(values)}</pre>
        )} */}

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
                                First name
                              </label>
                              <input
                                type="firstName"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                value={values.firstName}
                                onChange={handleChange}
                                name="firstName"
                              />
                              <p className="text-danger">{errors.firstName}</p>
                            </div>
                          </div>

                          {/* -----------------------------------last name------------------------ */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n">
                                Last name
                              </label>
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                value={values.lastName}
                                onChange={handleChange}
                                name="lastName"
                              />
                              <p className="text-danger">{errors.lastName}</p>
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
                              <p className="text-danger">{errors.email}</p>
                            </div>
                          </div>

                          <div className="col-md-6 mb-1">
                            {/* -----------------------------------------phone no------------------------- */}
                            <div className="form-outline">
                              <label className="form-label fw-bold" for="form3Example1n1">
                                Phone no.
                              </label>
                              <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control form-control-lg"
                                value={values.phoneNumber}
                                onChange={handleChange}
                              />
                              <p className="text-danger">{errors.phoneNumber}</p>
                            </div>
                          </div>
                        </div>

                        {/* -----------------------------------------qualification------------------------- */}
                        <div className="row">
                          <div className="col-md-6 d-md-flex justify-content-start align-items-center mb-1 py-2">
                            <label className="mb-0 me-4 fw-bold">Qualification: </label>

                            <div className="form-check form-check-inline mb-0 me-4">
                              <label className="form-check-label ">10</label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="10"
                                onChange={handleChange}
                                checked={values.qualification.includes("10")}
                              />
                            </div>

                            <div className="form-check form-check-inline mb-0 me-4">
                              <label className="form-check-label ">12</label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="12"
                                onChange={handleChange}
                                checked={values.qualification.includes("12")}
                              />
                            </div>

                            <div className="form-check form-check-inline mb-0 me-4">
                              <label className="form-check-label ">Bachelor</label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="qualification"
                                value="Bachelor"
                                onChange={handleChange}
                                checked={values.qualification.includes("Bachelor")}
                              />
                            </div>

                            <div className="form-check form-check-inline mb-0 me-4">
                              <label className="form-check-label ">Master</label>
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
                          <p className="text-danger">{errors.qualification}</p>

                          {/* -----------------------------------------gender------------------------- */}
                          <div className="col-md-6 d-md-flex justify-content-start align-items-center mb-1 py-2">
                            <h6 className="mb-0 me-4 fw-bold">Gender: </h6>

                            <div className="form-check form-check-inline mb-0 me-4">
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

                            <div className="form-check form-check-inline mb-0 me-4">
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

                            <div className="form-check form-check-inline mb-0">
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
                          <p className="text-danger">{errors.gender}</p>
                        </div>

                        {/* -----------------------------------------country------------------------- */}

                        <div className="col-md-12 mb-1">
                          <label className="form-label fw-bold  " for="form3Example1n1">
                            Country
                          </label>
                          {/* <Select
                            options={Country.getAllCountries()}
                            getOptionLabel={(options) => {
                              return options["name"];
                            }}
                            getOptionValue={(options) => {
                              return options["name"];
                            }}
                            value={values.country}
                            onChange={(value) => {
                              setValues({ country: value, state: null, city: null }, false);
                            }}
                          /> */}
                          <select className={`select mx-2 ${Style.selectValue}`} name="country" onChange={handleChange}>
                            <option>Select Your country</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                        <p className="text-danger">{errors.country}</p>

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
                              {/* <Select
                                options={State?.getStatesOfCountry(values.country?.isoCode)}
                                getOptionLabel={(options) => {
                                  return options["name"];
                                }}
                                getOptionValue={(options) => {
                                  return options["name"];
                                }}
                                value={values.state}
                                onChange={(value) => {
                                  setValues({ state: value, city: null }, false);
                                }}
                              /> */}
                              <p className="text-danger">{errors.state}</p>
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
                              />
                              {/* <Select
                                options={City.getCitiesOfState(values.state?.countryCode, values.state?.isoCode)}
                                getOptionLabel={(options) => {
                                  return options["name"];
                                }}
                                getOptionValue={(options) => {
                                  return options["name"];
                                }}
                                value={values.state}
                                onChange={(value) => setFieldValue("city", value)}
                              /> */}

                              <p className="text-danger">{errors.city}</p>
                            </div>
                          </div>{" "}
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
                              />{" "}
                              <p className="text-danger">{errors.password}</p>
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
                              <p className="text-danger">{errors.confirmPassword}</p>
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

export default RegistrationForm;
