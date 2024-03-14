import React, { useEffect } from "react";

import Style from "./CrudRegistrationStyle.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTimer } from "../LoginValidation/TimerContext";

const validationSchema = Yup.object().shape({
  CompanyName: Yup.string()
    .min(5, "Company Name should be at least 5 characters")
    .max(45)
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Company Name should start with a capital letter")
    .required("Please enter your Company Name"),
  OwnerName: Yup.string()
    .min(5, "Owner Name should be at least 5 characters")
    .max(45)
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Owner Name should start with a capital letter")
    // .matches(/^[A-Z][a-zA-Z\s]* [A-Z][a-zA-Z\s]*$/, "Owner Name should include both first and last names")
    .required("Please enter your Owner Name"),
  email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,
      "Password must be 8-30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  companyType: Yup.string().required("Company Type is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  street: Yup.string().required("Street is required"),
  userIcon: Yup.mixed().required("User Icon is required"),
  companyLogo: Yup.mixed().required("Company Logo is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string()
    .required("State is required")
    .matches(/^(?:Orissa|Punjab|Rajasthan|Bihar|Goa|Assam)$/i, "Invalid state"),
  city: Yup.string()
    .required("City is required")
    .matches(/^[a-zA-Z\s]+$/, "Invalid city"),
});

const initialValues = {
  name: "",
  CompanyName: "",
  OwnerName: "",
  email: "",
  zipCode: "",
  street: "",
  country: "",
  state: "",
  city: "",
  password: "",
  companyType: "",
  userIcon: null,
  companyLogo: null,
};

function CompanyRegistrationForm({ updateUserList }) {
  const { time, incrementTime, timeRunning } = useTimer();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    try {
      console.log(values);
      alert("Form Submitted Successfully!");

      const valuesArray = Object.entries(values).map(([key, value]) => ({ [key]: value }));

      localStorage.setItem("registrationValues", JSON.stringify(valuesArray));

      const formDataWithUser = { ...values, userName: loggedInUser.name };

      localStorage.setItem("registrationValues", JSON.stringify(formDataWithUser));
      updateUserList(values);

      navigate("/company-table", { state: { loggedInUser } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    let interval;

    if (timeRunning) {
      interval = setInterval(() => {
        incrementTime();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeRunning, incrementTime]);

  return (
    <div>
      <>
        <h2 className="mb-4 mt-4 text-uppercase text-center ">Registration Form</h2>
        <section classNameName=" bg-dark">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ dirty, isValid }) => (
              <Form>
                <div className="container">
                  <div className={`row d-flex justify-content-center align-items-center  ${Style.formRow}`}>
                    <div className="col">
                      <div className="card card-registration ">
                        <div className="row">
                          <div className={`col-lg-12 ${Style.validationCard}`}>
                            <div className="card-body p-md-2 text-black">
                              <div className="row">
                                <div className="col-md-6 mb-1">
                                  {/* ----------------------------------- Company Name------------------------ */}
                                  <div className="form-outline">
                                    <label htmlFor="CompanyName" className="form-label fw-bold" for="form3Example1m">
                                      Company Name
                                    </label>
                                    <Field type="text" id="CompanyName" name="CompanyName" className="form-control form-control-lg" />
                                    <ErrorMessage name="CompanyName" component="div" className="text-danger" />
                                  </div>
                                </div>

                                {/* -----------------------------------  Owner Name------------------------ */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label className="form-label fw-bold" for="form3Example1n" htmlFor="OwnerName">
                                      Owner Name
                                    </label>

                                    <Field type="text" id="OwnerName" name="OwnerName" className="form-control form-control-lg" />
                                    <ErrorMessage name="OwnerName" component="div" className="text-danger" />
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-3 mb-3">
                                {/*--------------- ----------email--------------------------- */}
                                <div className="col-md-6 ">
                                  <div className="form-outline">
                                    <label className="form-label fw-bold" for="form3Example1m1" htmlFor="email">
                                      E-mail
                                    </label>

                                    <Field type="email" id="email" name="email" className="form-control form-control-lg" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                  </div>
                                </div>

                                {/*--------------- ----------password--------------------------- */}
                                <div className="col-md-6 ">
                                  <div className="form-outline">
                                    <label className="form-label fw-bold " for="form3Example1m1" htmlFor="password">
                                      Password
                                    </label>
                                    <Field type="password" id="password" name="password" className="form-control form-control-lg" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />{" "}
                                  </div>
                                </div>
                              </div>

                              {/*--------------- ----------- Company Type--------------------------- */}
                              <div className="row mb-3">
                                {" "}
                                <div className="col-md-4 mb-1 ">
                                  <label className="form-label fw-bold  " for="form3Example1n1" htmlFor="country">
                                    Company Type
                                  </label>{" "}
                                  <Field as="select" id="companyType" name="companyType" className={`select ${Style.selectValue}`}>
                                    <option>Select Your country</option>
                                    <option value="Companies Limited by Shares">Companies Limited by Shares</option>
                                    <option value="Companies Limited by Guarantee">Companies Limited by Guarantee</option>
                                    <option value="Unlimited Companies">Unlimited Companies</option>
                                    <option value="One Person Companies (OPC)">One Person Companies (OPC)</option>
                                    <option value="Private Companies">Private Companies</option>
                                    <option value="Public Companies">Public Companies</option>
                                    <option value="Holding and Subsidiary Companies">Holding and Subsidiary Companies</option>
                                    <option value="Associate Companies">Associate Companies</option>
                                    <option value="Companies in terms of Access to Capital">Companies in terms of Access to Capital</option>
                                    <option value="Government Companies">Government Companies</option>
                                    <option value="Foreign Companies">Foreign Companies</option>
                                    <option value="Charitable Companies">Charitable Companies</option>
                                    <option value="Dormant Companies">Dormant Companies</option>
                                    <option value="Nidhi Companies">Nidhi Companies</option>
                                    <option value="Public Financial Institutions">Public Financial Institutions</option>
                                  </Field>
                                  <ErrorMessage name="companyType" component="div" className="text-danger" />
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="form-outline">
                                  <label className="form-label fw-bold" for="form3Example1m1" htmlFor="email">
                                    Company Address
                                  </label>
                                </div>
                                {/*--------------- ----------Zip Code--------------------------- */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <Field type="number" id="zipCode" name="zipCode" placeholder="Zip-code" className="form-control form-control-lg" />
                                    <ErrorMessage name="zipCode" component="div" className="text-danger" />
                                  </div>{" "}
                                </div>

                                {/*--------------- ----------Street--------------------------- */}
                                <div className="col-md-6  mb-1">
                                  <div className="form-outline">
                                    <Field type="street" id="street" name="street" placeholder="street" className="form-control form-control-lg" />
                                    <ErrorMessage name="street" component="div" className="text-danger" />{" "}
                                  </div>
                                </div>
                              </div>

                              {/* -----------------------------------------city------------------------- */}
                              <div className="row ">
                                <div className="col-md-6">
                                  <Field type="text" className="form-control form-control-lg" id="city" placeholder="City" name="city" />
                                  <ErrorMessage name="city" component="div" className="text-danger" />
                                </div>

                                {/* -----------------------------------------State------------------------- */}
                                <div className="col-md-6 ">
                                  <Field type="text" className="form-control form-control-lg" id="state" placeholder="State" name="state" />
                                  <ErrorMessage name="state" component="div" className="text-danger" />
                                </div>

                                {/* -----------------------------------------country------------------------- */}
                                <div className="col-md-4  mb-1 mt-3">
                                  <Field
                                    type="text"
                                    className={`form-control form-control-lg ${Style.selectValue2}`}
                                    id="country"
                                    placeholder="Country"
                                    name="country"
                                  />
                                  <ErrorMessage name="country" component="div" className="text-danger" />
                                </div>
                              </div>
                              {/*--------------- ----------User Icon--------------------------- */}
                              <div className="row mt-3">
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label className="form-label fw-bold" for="form3Example1m1" htmlFor="email">
                                      User Icon
                                    </label>

                                    <Field type="file" id="userIcon" name="userIcon" className="form-control form-control-lg" />
                                    <ErrorMessage name="userIcon" component="div" className="text-danger" />
                                  </div>
                                </div>
                                {/*--------------- ----------Company Logo--------------------------- */}
                                <div className="col-md-6 mb-1">
                                  <div className="form-outline">
                                    <label className="form-label fw-bold " for="form3Example1m1" htmlFor="password">
                                      Company Logo
                                    </label>
                                    <Field type="file" id="companyLogo" name="companyLogo" className="form-control form-control-lg" />
                                    <ErrorMessage name="companyLogo" component="div" className="text-danger" />{" "}
                                  </div>
                                </div>
                              </div>

                              {/*--------------- ---------- Reset--------------------------- */}
                              <div className="d-flex justify-content-end pt-4 ">
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
