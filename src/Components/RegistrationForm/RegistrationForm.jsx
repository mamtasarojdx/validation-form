import React, { useEffect, useState } from "react";
import Style from "./RegistrationStyle.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { navigate, useNavigate } from "react-router-dom";

function RegistrationForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    qualification: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // navigate('/regis-2',{state:{formData:formValues}})
  };

  const handleReset = () => {
    setFormValues("");
  };

  useEffect(() => {
    console.log(formValues);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const nameRegExp = /^[A-Z][a-z]*$/;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = new RegExp(/^\d{1,10}$/);
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

    //  -----------------------------------firstName---------------------------------------
    if (!values.firstName) {
      errors.firstName = "firstName is required!";
    } else if (!nameRegExp.test(values.firstName)) {
      errors.firstName = "firstName is not valid. Please use only letters and start with a capital letter";
    } else if (values.firstName.length < 4) {
      errors.firstName = "firstName must be more than 4 character!";
    } else if (values.firstName.length > 30) {
      errors.firstName = "firstName can not exceed more than 30 character!";
    }

    //  -----------------------------------lastName--------------------------------------------
    if (!values.lastName) {
      errors.lastName = "lastName is required!";
    } else if (!nameRegExp.test(values.lastName)) {
      errors.lastName = "lastName is not valid. Please use only letters and start with a capital letter";
    } else if (values.lastName.length < 5) {
      errors.lastName = "lastName must be more than 5 character!";
    } else if (values.lastName.length > 30) {
      errors.lastName = "lastName can not exceed more than 30 character!";
    }

    //  -----------------------------------email-------------------------------------------------
    if (!values.email) {
      errors.email = "email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a validate email format!";
    }

    //  -----------------------------------phoneNumber----------------------------------------------
    if (!values.phoneNumber) {
      errors.phoneNumber = "phone number is required!";
    }
     
    else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = "Please enter 10-digit valid phone number";
      return phoneNumberPattern.test(values.phoneNumber);
    }

    //  ------------------------------------password------------------------------------------------
    if (!values.password) {
      errors.password = "Password should not be empty";
    } else if (!passwordRegExp.test(values.password)) {
      errors.password =
        "Password must be 8-30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character";
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
      <h3 className="mb-3 text-uppercase text-center">Registration form</h3>
      <section classNameName=" bg-dark">
        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">signed in Successfully</div>
        ) : (
          <pre>{JSON.stringify(formValues)}</pre>
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
                              <label className="form-label " for="form3Example1m">
                                First name
                              </label>
                              <input
                                type="firstName"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                value={formValues.firstName}
                                onChange={handleChange}
                                name="firstName"
                              />
                              <p className="text-danger">{formErrors.firstName}</p>
                            </div>
                          </div>

                          {/* -----------------------------------last name------------------------ */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1n">
                                Last name
                              </label>
                              <input
                                type="text"
                                id="form3Example1n"
                                className="form-control form-control-lg"
                                value={formValues.lastName}
                                onChange={handleChange}
                                name="lastName"
                              />
                              <p className="text-danger">{formErrors.lastName}</p>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/*--------------- ----------email--------------------------- */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1m1">
                                E-mail
                              </label>
                              <input
                                type="email"
                                id="form3Example1m1"
                                className="form-control form-control-lg"
                                value={formValues.email}
                                onChange={handleChange}
                                name="email"
                              />
                              <p className="text-danger">{formErrors.email}</p>
                            </div>
                          </div>

                          <div className="col-md-6 mb-1">
                            {/* -----------------------------------------phone no------------------------- */}
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1n1">
                                Phone no.
                              </label>
                              <PhoneInput
                                country={"us"}
                                inputProps={{
                                  required: true,
                                }}
                                id="form3Example1n1"
                                className="form-control form-control-lg"
                                value={formValues.phoneNumber}
                                // onChange={handleChange}
                                name="phoneNumber"
                              />
                              <p className="text-danger">{formErrors.phoneNumber}</p>
                            </div>
                          </div>
                        </div>

                        {/* -----------------------------------------qualification------------------------- */}
                        <div className="d-md-flex justify-content-start align-items-center mb-1 py-2">
                          <h6 className="mb-0 me-4">Qualification: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="qualification" value="Master" checked={formValues.qualification === 'Master'}/>
                            <label className="form-check-label ">Master</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="qualification" value="Bachelor" checked={formValues.qualification === 'Bachelor'}/>
                            <label className="form-check-label ">Bachelor</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="qualification" value="12" checked={formValues.qualification === '12'}/>
                            <label className="form-check-label ">12</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="qualification" value="10" checked={formValues.qualification === '10'}/>
                            <label className="form-check-label ">10</label>
                          </div>
                        </div>

                        {/* -----------------------------------------gender------------------------- */}
                        <div className="d-md-flex justify-content-start align-items-center mb-1 py-2">
                          <h6 className="mb-0 me-4">Gender: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="gender" id="femaleGender" value="Female" checked={formValues.gender === 'Female'} onChange={handleChange} />
                            <label className="form-check-label " for="femaleGender">
                              Female
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="gender" id="maleGender" value="Male" checked={formValues.gender === 'Male'} onChange={handleChange} />
                            <label className="form-check-label " for="maleGender">
                              Male
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0">
                            <input className="form-check-input" type="radio" name="gender" id="otherGender" value="Other" checked={formValues.gender === 'Other'} onChange={handleChange} />
                            <label className="form-check-label" for="otherGender">
                              Other
                            </label>
                          </div>
                        </div>

                        {/* -----------------------------------------country------------------------- */}
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label className="form-label " for="form3Example1n1">
                              Country
                            </label>
                            <select className={`select mx-2 ${Style.selectValue}`}>
                              <option value="2">India</option>
                              <option value="3">China</option>
                              <option value="4">Italy</option>
                              <option value="3">Japan</option>
                              <option value="4">Canada</option>
                            </select>
                          </div>

                          <div className="col-md-6 mb-4">
                            <label className="form-label " for="form3Example1n1">
                              State
                            </label>
                            <select className={`select mx-2 ${Style.selectValue}`}>
                              <option value="2">Option 1</option>
                              <option value="3">Option 2</option>
                              <option value="4">Option 3</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-4">
                            <label className="form-label " for="form3Example1n1">
                              City
                            </label>
                            <select className={`select mx-2 ${Style.selectValue}`}>
                              <option value="2">Option 1</option>
                              <option value="3">Option 2</option>
                              <option value="4">Option 3</option>
                            </select>
                          </div>
                        </div>

                        {/* -----------------------------------------password------------------------- */}
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1m1">
                                Password
                              </label>
                              <input
                                type="password"
                                id="form3Example1m1"
                                className="form-control form-control-lg"
                                value={formValues.password}
                                onChange={handleChange}
                                name="password"
                              />{" "}
                              <p className="text-danger">{formErrors.password}</p>
                            </div>
                          </div>

                          {/* ----------------------------------------- confirm password------------------------- */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1n1">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                id="form3Example1n1"
                                className="form-control form-control-lg"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                              />
                              <p className="text-danger">{formErrors.confirmPassword}</p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end pt-1">
                          <button type="reset" className="btn btn-danger btn-lg" onClick={handleReset}>
                            Reset
                          </button>
                          <button type="submit" className="btn btn-warning text-white btn-lg ms-2">
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
}

export default RegistrationForm;
