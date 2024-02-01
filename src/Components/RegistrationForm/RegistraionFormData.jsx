import React from "react";
import Style from "./RegistrationStyle.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate} from "react-router-dom";

function RegistrationFormData() {
  const navigate = useNavigate();
  

const location = useLocation();
  const formData=location.state?.formData || {}

  const handleReset = () => {
    navigate("/");
  };
  
  return (
    <>
    <div  className="text-center">
   <h2 className="text-center text-warning mb-5 text-decoration-underline">All Registration Form Data</h2>

      <h4>First Name:
      <span className="text-primary ">   {formData.firstName}</span> 
      </h4>

      <h4>Last Name:
        <span className="text-primary">  {formData.lastName}</span>
      </h4>

      <h4>Email:
      <span className="text-primary">    {formData.email}</span>
      </h4>

      <h4>Phone:
        <span className="text-primary">   {formData.phoneNumber}</span>
      </h4>

      <h4>Qualification:
        <span className="text-primary">  {formData.qualification}</span>
      </h4>

      <h4>Gender: 
        <span className="text-primary">  {formData.gender}</span>
      </h4>

      <h4>Password:
        <span className="text-primary">  {formData.password}</span>
      </h4>

      
      <h4>Country:
        <span className="text-primary">  {formData.country}</span>
      </h4>

      <h4>State: 
        <span className="text-primary">  {formData.state}</span>
      </h4>

      <h4>City:
        <span className="text-primary">   {formData.city}</span>
      </h4>
     
      <button type="button" className="btn btn-danger btn-lg mt-5" onClick={handleReset}>Back To Form</button></div>
    </>
  );
}

export default RegistrationFormData;
