import React, { useState, useEffect } from "react";

import style from "./LoginDataStyle.module.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginData from "./LoginData.json";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(()=>{
    const storedCredentials=localStorage.getItem('credentials')
    if(storedCredentials){
      const{email,password,rememberMe}=JSON.parse(storedCredentials);
      if(rememberMe){
        setValues({email,password,rememberMe:true});
        setRememberMe(true);
      }else {
        setValues({email:"",password:""});
        setRememberMe(false)
      }
    }

  },[])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value,checked } = e.target;
    const newValue =name === "rememberMe" ?checked:value;
    setValues({ ...values, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
    const errors = validate(values);
    setErrors(errors);
    setSubmit(true);

    if (Object.keys(errors).length === 0) {
      const user = LoginData.find((user) => user.email === values.email && user.password === values.password);
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("credentials", JSON.stringify(values));
        if(values.rememberMe){
          localStorage.setItem('credentials',JSON.stringify({email:values.email,password:values.password,rememberMe:true}))
        }else{
          localStorage.removeItem('credentiala')
        }

        setTimeout(() => {
          toast.success("Login save successfully", {
            position: "top-center",
            autoClose: 1000,
            transition: Slide,
          });
        }, 400);
        setTimeout(() => {
          navigate("/login-data", { state: user });
        }, 100);
      } 
      else {
        setValues({ email: "", password: "", rememberMe: false }); 
        toast.error("Invalid email or password", {
          position: "top-center",
          transition: Slide,
          autoClose: 1500,
        });
      }
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
      errors.password = "Password is required !";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters!";
    } else if (values.password.length > 15) {
      errors.password = "Password can not exceed more than 15 characters!";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase character!";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase character!";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Password must contain at least one number!";
    } else if (!/[^A-Za-z0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one special character!";
    }

    return errors;
  };

  useEffect(() => {
    const storedCredentials = localStorage.getItem("loggedInUser");
    if (storedCredentials && !isSubmit) {
      const { email, password } = JSON.parse(storedCredentials);
      if (email && password) {
        navigate("/login-data");
      }
    }
  }, [navigate, isSubmit]);

  return (
    <>
      <div className={`container ${style.loginPage}`}>
        <div className="row">
          <div className={`col-lg-6 col-md-6 col-sm-12 ${style.img}`}>
            <img
              src="https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className={style.humanImg}
            ></img>
          </div>

          <div className={`col-lg-6 col-md-6 col-sm-12 ${style.loginForm}`}>
            <form onSubmit={handleSubmit}>
              <div class="mb-3 mt-5">
                <label for="exampleInputEmail1" class={`form-label ${style.inputMail}`}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={` form-control-lg ${style.formControl}`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required="required"
                />
              </div>
              <p className="text-danger">{errors.email}</p>

              <div class="mb-3">
                <label for="exampleInputPassword1" class={`form-label ${style.inputMail}`}>
                  Password
                </label>
                <div className={`${style.eye}`}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="form3Example1m1"
                    className={` form-control-lg ${style.formControl}`}
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    autocomplete="off"
                  />{" "}
                  <div className={`${style.eyeBtn}`} onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <p className="text-danger">{errors.password}</p>

              <button type="submit" onClick={handleSubmit} className={`${style.loginBtn}`}>
                Login
              </button>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-lg-6">
                    <div className={`${style.formCheck2}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberMeCheckBox"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMeCheckBox">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-center">
                      <a href="#" className={`${style.forget}`}>
                        Forget Password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default LoginPage;
