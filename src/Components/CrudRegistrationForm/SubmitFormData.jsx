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
        <h2 className="text-center text-warning mb-5 text-decoration-underline">User Form Data</h2>

        <h4>
          CompanyName:
          <span className="text-primary "> {item.CompanyName}</span>
        </h4>

        <h4>
          OwnerName:
          <span className="text-primary"> {item.OwnerName}</span>
        </h4>

        <h4>
          Email:
          <span className="text-primary"> {item.email}</span>
        </h4>

        <h4>
          companyType:
          <span className="text-primary"> {item.companyType}</span>
        </h4>

        <h4>
          zipCode:
          <span className="text-primary"> {item.zipCode}</span>
        </h4>

        <h4>
          street:
          <span className="text-primary"> {item.street}</span>
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
        <h4>
          userIcon:
          <span className="text-primary"> {item.userIcon}</span>
        </h4>

        <h4>
          companyLogo:
          <span className="text-primary"> {item.companyLogo}</span>
        </h4>

        <button type="button" className="btn btn-secondary btn-lg mt-5" onClick={handleReset}>
          Back To Form
        </button>
      </div>
    </>
  </div>
  );
}

export default SubmitFormData;