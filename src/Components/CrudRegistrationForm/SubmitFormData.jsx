import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";

function SubmitFormData(props) {
  const [item, setItem] = useState([]);
  console.log(item);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  useEffect(() => {
    const storedItem = localStorage.getItem("item");
    if (storedItem) {
      setItem(JSON.parse(storedItem));
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("item");
    navigate("/company-registration");
  };

  return (
    <div>
      <>
        <div className="text-center">
          <h2 className="text-center text-warning mb-5 text-decoration-underline">
            User Form Data
          </h2>

          <h4>
            First Name:
            <span className="text-primary "> {item.firstName}</span>
          </h4>

          <h4>
            Last Name:
            <span className="text-primary"> {item.lastName}</span>
          </h4>

          <h4>
            Email:
            <span className="text-primary"> {item.email}</span>
          </h4>

          <h4>
            Phone:
            <span className="text-primary"> {item.phone}</span>
          </h4>

          <h4>
            Qualification:
            <span className="text-primary"> {item.qualification}</span>
          </h4>

          <h4>
            Gender:
            <span className="text-primary"> {item.gender}</span>
          </h4>

          <h4>
            Password:
            <span className="text-primary"> {item.password}</span>
          </h4>

          <h4>
            Country:
            <span className="text-primary"> {item.country}</span>
          </h4>

          <h4>
            State:
            <span className="text-primary"> {item.state}</span>
          </h4>

          <h4>
            City:
            <span className="text-primary"> {item.city}</span>
          </h4>

          <button
            type="button"
            className="btn btn-secondary btn-lg mt-5"
            onClick={handleReset}
          >
            Back To Form
          </button>
        </div>

        
      </>
    </div>
  );
}

export default SubmitFormData;