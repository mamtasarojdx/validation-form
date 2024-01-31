import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import AlertRegistration from "../AlertRegistration/AlertRegistration";
import Style from "./RegistrationStyle.module.css";
import LoginValidation from "../LoginValidation/LoginValidation";

import CreateData from "../CreateData/CreateData";

function HomePage() {
  const [active, IsActive] = useState(1);
  return (
    <>
      <div className={`d-flex justify-content-center align-items-center mb-5 ${Style.homeBar}`}>
        <h5
          className="mx-3"
          onClick={() => IsActive(1)}
          style={
            active === 1
              ? { color: "white", padding: "7px 13px 10px 13px", cursor: "pointer", backgroundColor: "#0d6efd", borderRadius: "7px" }
              : { color: "#0d6efd", cursor: "pointer" }
          }
        >
          Inline Validation
        </h5>
        <h5
          onClick={() => IsActive(2)}
          style={
            active === 2
              ? { color: "white", padding: "7px 13px 10px 13px", cursor: "pointer", backgroundColor: "#0d6efd", borderRadius: "7px" }
              : { color: "#0d6efd", cursor: "pointer" }
          }
        >
          Alert Validation
        </h5>
        <h5
          className="mx-3"
          onClick={() => IsActive(3)}
          style={
            active === 3
              ? { color: "white", padding: "7px 13px 10px 13px", cursor: "pointer", backgroundColor: "#0d6efd", borderRadius: "7px" }
              : { color: "#0d6efd", cursor: "pointer" }
          }
        >
          Login Validation
        </h5>
        <h5
          className="mx-3"
          onClick={() => IsActive(4)}
          style={
            active === 4
              ? { color: "white", padding: "7px 13px 10px 13px", cursor: "pointer", backgroundColor: "#0d6efd", borderRadius: "7px" }
              : { color: "#0d6efd", cursor: "pointer" }
          }
        >
          Json
        </h5>
      </div>

      <div className="home-list">
        {active == 1 && (
          <>
            <RegistrationForm />
          </>
        )}

        {active == 2 && (
          <>
            <AlertRegistration />
          </>
        )}

        {active == 3 && (
          <>
            <LoginValidation />
          </>
        )}

        {active == 4 && (
          <>
            <CreateData />
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
