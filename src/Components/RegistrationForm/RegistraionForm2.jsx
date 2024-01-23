import React from "react";
import Style from "./RegistrationStyle.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate} from "react-router-dom";

function RegistrationForm2() {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.state);
//   const {formValues} = location.state

const location = useLocation();
  const formData=location.state?.formData || {}

  const handleReset = () => {
    navigate("/");
  };
  return (
    <>
      <h3 className="mb-3 text-uppercase text-center">Registration form</h3>
      <section classNameName=" bg-dark">
        <form>
          <div className="container ">
            <div className={`row d-flex justify-content-center align-items-center  ${Style.formRow}`}>
              <div className="col">
                <div className="card card-registration ">
                  <div className="row">
                    <div className={`col-lg-12 ${Style.validationCard2}`}>
                      <div className="card-body p-md-2 text-black">
                        <div className="row">
                          <div className="col-md-6 mb-1">
                            {/* -----------------------------------first name------------------------ */}
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1m">
                                First name
                              </label>
                              <input type="firstName" id="form3Example1m" className="form-control form-control-lg" value={formData.firstName} />
                            </div>
                          </div>

                          {/* -----------------------------------last name------------------------ */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1n">
                                Last name
                              </label>
                              <input type="text" id="form3Example1n" className="form-control form-control-lg" name="lastName" value={formData.lastName}/>
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
                              <input type="email" id="form3Example1m1" className="form-control form-control-lg" name="email" value={formData.email}/>
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
                                name="phoneNumber"
                                value={formData.phoneNumber}/>
                            </div>
                          </div>
                        </div>

                        {/* -----------------------------------------qualification------------------------- */}
                        <div className="d-md-flex justify-content-start align-items-center mb-1 py-2">
                          <h6 className="mb-0 me-4">Qualification: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio"  value={formData.qualification} />
                            <label className="form-check-label ">Master</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio"  value={formData.qualification} />
                            <label className="form-check-label ">Bachelor</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio"  value={formData.qualification} />
                            <label className="form-check-label ">12</label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" value={formData.qualification} />
                            <label className="form-check-label ">10</label>
                          </div>
                        </div>

                        {/* -----------------------------------------gender------------------------- */}
                        <div className="d-md-flex justify-content-start align-items-center mb-1 py-2">
                          <h6 className="mb-0 me-4">Gender: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio"  value={formData.gender}/>
                            <label className="form-check-label " for="femaleGender">
                              Female
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio"  value={formData.gender} />
                            <label className="form-check-label " for="maleGender">
                              Male
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0">
                            <input className="form-check-input" type="radio"   value={formData.gender} />
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
                              <input type="password" id="form3Example1m1" className="form-control form-control-lg" name="password" value={formData.password}/>{" "}
                            </div>
                          </div>

                          {/* ----------------------------------------- confirm password------------------------- */}
                          <div className="col-md-6 mb-1">
                            <div className="form-outline">
                              <label className="form-label " for="form3Example1n1">
                                Confirm Password
                              </label>
                              <input type="password" id="form3Example1n1" className="form-control form-control-lg" name="confirmPassword" value={formData.confirmPassword}/>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end pt-1">
                          <button type="reset" className="btn btn-danger btn-lg" onClick={handleReset}>
                            Back
                          </button>
                          {/* <button type="submit" className="btn btn-warning text-white btn-lg ms-2">
                            Submit
                          </button> */}
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

export default RegistrationForm2;
