import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { SignupSchema } from "../../schemas";
import { Country, State, City } from "country-state-city";

import Select from "react-select";
import Alert from '@mui/material/Alert';

import Style from "./LoginStyle.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialValues = {
   
    email: "",
    
    password: "",
   
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
  <section className="py-5" style={{backgroundColor: "#9A616D"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem",height:"80vh",width:"100%" }}/>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                  </div>

                  
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
};
export default Register;
