import React from "react";
import Style from "./CrudRegistrationStyle.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SubmitFormData from "./SubmitFormData";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name at least 3 character")
    .max(25)
    .matches(/^[A-Z][a-zA-Z]*$/, "1st word must be alphabet capital letter")
    .required("Please  enter your first name"),
  lastName: Yup.string()
    .min(4, "Last Name at least 4 character")
    .max(30)
    .matches(/^[A-Z][a-zA-Z]*$/, "1st word must be alphabet capital letter")
    .required("Please  enter your last name"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please  enter your email"),

  gender: Yup.string().required("Gender is required"),

  qualification: Yup.array().required("Qualification is required"),

  country: Yup.string().required("Country is required"),

  state: Yup.string()
    .required("State is required ")
    .matches(/^(?:Orissa|Punjab|Rajasthan|Bihar|Goa|Assam)$/i, "Invalid state"),

  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z\s]+$/, "Invalid city"),

  phone: Yup.string()
    .min(10)
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Please  enter your Phone Number"),

  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
      "Password must be 8-30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password should not be empty")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password should be the same"
    ),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  qualification: "",
  country: "",
  state: "",
  city: "",
  password: "",
  confirmPassword: "",
};

function CompanyRegistrationForm() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    alert("Form Submitted Successfully!");
    navigate("/Submit-page");
    localStorage.setItem('item', JSON.stringify(values));
  };

  return (
    <div>
      <>
        <h2 className="mb-4 mt-4 text-uppercase text-center ">
          Registration Form
        </h2>
        <section classNameName=" bg-dark">
         
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ dirty, isValid }) => (
              <Form>
                <div className="container">
                  <div
                    className={`row d-flex justify-content-center align-items-center  ${Style.formRow}`}
                  >
                    <div className="col">
                      <div className="card card-registration ">
                        <div className="row">
                          <div className={`col-lg-12 ${Style.validationCard}`}>
                            <div className="card-body p-md-2 text-black">
                              <div className="row">
                                <div className="col-md-6 mb-1">
                                  {/* -----------------------------------first name------------------------ */}
                                  <div className="form-outline">
                                    <label
                                      htmlFor="firstName"
                                      className="form-label fw-bold"
                                      for="form3Example1m"
                                    >
                                      First Name
                                    </label>
                                    <Field
                                      type="text"
                                      id="firstName"
                                      name="firstName"
                                      className="form-control form-control-lg"
                                    />
                                    <ErrorMessage
                                      name="firstName"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                {/* -----------------------------------last name------------------------ */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label
                                      className="form-label fw-bold"
                                      for="form3Example1n"
                                      htmlFor="lastName"
                                    >
                                      Last Name
                                    </label>

                                    <Field
                                      type="text"
                                      id="lastName"
                                      name="lastName"
                                      className="form-control form-control-lg"
                                    />
                                    <ErrorMessage
                                      name="lastName"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                {/*--------------- ----------email--------------------------- */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label
                                      className="form-label fw-bold"
                                      for="form3Example1m1"
                                      htmlFor="email"
                                    >
                                      E-mail
                                    </label>

                                    <Field
                                      type="email"
                                      id="email"
                                      name="email"
                                      className="form-control form-control-lg"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-6 mb-1">
                                  {/* -----------------------------------------phone no------------------------- */}
                                  <div className="form-outline">
                                    <label
                                      className="form-label fw-bold"
                                      for="form3Example1n1"
                                      htmlFor="phone"
                                    >
                                      Phone No.
                                    </label>

                                    <Field
                                      type="text"
                                      id="phone"
                                      name="phone"
                                      className="form-control form-control-lg"
                                    />
                                    <ErrorMessage
                                      name="phone"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* -----------------------------------------qualification------------------------- */}
                              <div className="row mt-3">
                                <div className="col-md-6  justify-content-start align-items-center ">
                                  <h6 className="mb-0 me-4 fw-bold">
                                    Qualification:{" "}
                                  </h6>

                                  <div className="form-check form-check-inline mt-2 mb-0">
                                    <label
                                      className="form-check-label "
                                      for="maleGender"
                                      htmlFor="qualification"
                                    >
                                      Master
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="checkbox"
                                      id="qualification"
                                      name="qualification"
                                      value="Master"
                                    />
                                  </div>

                                  <div className="form-check form-check-inline mt-2 mb-0">
                                    <label
                                      className="form-check-label "
                                      for="maleGender"
                                      htmlFor="qualification"
                                    >
                                      Bachelor
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="checkbox"
                                      id="qualification"
                                      name="qualification"
                                      value="Bachelor"
                                    />
                                  </div>

                                  <div className="form-check form-check-inline mt-2 mb-0 me-4">
                                    <label
                                      className="form-check-label "
                                      for="maleGender"
                                      htmlFor="qualification"
                                    >
                                      12
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="checkbox"
                                      id="qualification"
                                      name="qualification"
                                      value="12"
                                    />
                                  </div>

                                  <div className="form-check form-check-inline mt-2 mb-0 me-4">
                                    <label
                                      className="form-check-label "
                                      for="femaleGender"
                                      htmlFor="qualification"
                                    >
                                      10
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="checkbox"
                                      id="qualification"
                                      name="qualification"
                                      value="10"
                                    />
                                  </div>

                                  <ErrorMessage
                                    name="qualification"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                                {/* -----------------------------------------gender------------------------- */}
                                <div className="col-md-6  justify-content-start align-items-center ">
                                  <h6 className="mb-0 me-4 fw-bold">
                                    Gender:{" "}
                                  </h6>

                                  <div className="form-check form-check-inline mt-2 mb-0 me-4">
                                    <label
                                      className="form-check-label "
                                      for="femaleGender"
                                      htmlFor="gender"
                                    >
                                      Female
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      id="gender"
                                      name="gender"
                                      value="female"
                                    />
                                  </div>

                                  <div className="form-check form-check-inline mt-2 mb-0 me-4">
                                    <label
                                      className="form-check-label "
                                      for="maleGender"
                                    >
                                      Male
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      id="gender"
                                      name="gender"
                                      value="male"
                                    />
                                  </div>

                                  <div className="form-check form-check-inline mt-2 mb-0">
                                    <label
                                      className="form-check-label "
                                      for="maleGender"
                                    >
                                      Others
                                    </label>

                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      id="gender"
                                      name="gender"
                                      value="other"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name="qualification"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>

                              {/* -----------------------------------------country------------------------- */}
                              <div className="col-md-6 mb-1 mt-3">
                                <label
                                  className="form-label fw-bold  "
                                  for="form3Example1n1"
                                  htmlFor="country"
                                >
                                  Country
                                </label>{" "}
                              </div>

                              <div className="col-md-12 mb-1 ">
                                
                                <Field
                                  as="select"
                                  id="country"
                                  name="country"
                                  className={`select ${Style.selectValue}`}
                                >
                                  <option>Select Your Country</option>
                                  <option value="India">India</option>
                                  <option value="China">China</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Canada">Canada</option>
                                </Field>
                                <ErrorMessage
                                  name="country"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              {/* -----------------------------------------State------------------------- */}
                              <div className="col-md-6 mb-1">
                                <label
                                  className="form-label fw-bold  "
                                  for="form3Example1n1"
                                  htmlFor="state"
                                >
                                  State
                                </label>{" "}
                              </div>

                              <div className="col-md-12 mb-1 ">
                              
                                <Field
                                  as="select"
                                  id="state"
                                  name="state"
                                  className={`select ${Style.selectValue}`}
                                >
                                  <option>Select Your State</option>
                                  <option value="Orissa">Haryana</option>
                                  <option value="Punjab">Punjab</option>
                                  <option value="Rajasthan">Rajasthan</option>
                                  <option value="Goa">Goa</option>
                                  <option value="Assam">Jammu & Kashmir</option>
                                </Field>
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              {/* -----------------------------------------city------------------------- */}
                              <div className="col-md-6 mb-1">
                                <label
                                  className="form-label fw-bold  "
                                  for="form3Example1n1"
                                  htmlFor="city"
                                >
                                  City
                                </label>{" "}
                              </div>

                              <div className="col-md-12 mb-1 ">
                             
                                <Field
                                  as="select"
                                  id="city"
                                  name="city"
                                  className={`select ${Style.selectValue}`}
                                >
                                  <option>Select Your City</option>
                                  <option value="Sirhind">Ambala</option>
                                  <option value="Chandigarh">Chandigarh</option>
                                  <option value="Mohali">Mohali</option>
                                  <option value="Jalandhar">Jalandhar</option>
                                  <option value="Rajpura">Delhi</option>
                                </Field>
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label
                                      className="form-label fw-bold "
                                      for="form3Example1m1"
                                      htmlFor="password"
                                    >
                                      Password
                                    </label>
                                   
                                    <Field
                                      type="password"
                                      id="password"
                                      name="password"
                                      className="form-control form-control-lg"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-danger"
                                    />{" "}
                                  </div>
                                </div>

                                {/* ----------------------------------------- confirm password------------------------- */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label
                                      className="form-label fw-bold"
                                      for="form3Example1n1"
                                      htmlFor="confirmPassword"
                                    >
                                      Confirm Password
                                    </label>
                                 
                                    <Field
                                      type="password"
                                      id="confirmPassword"
                                      className="form-control form-control-lg"
                                      name="confirmPassword"
                                    />
                                    <ErrorMessage
                                      name="confirmPassword"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-end pt-4 ">
                                <button
                                  type="reset"
                                  className="btn btn-danger btn-lg "
                                  // onClick={handleReset}
                                >
                                  Reset
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success  text-white btn-lg ms-2"
                                  //   onSubmit={handleSubmit}
                                >
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
              </Form>
            )}
          </Formik>
        </section>
      </>
    </div>
  );
}

export default CompanyRegistrationForm;