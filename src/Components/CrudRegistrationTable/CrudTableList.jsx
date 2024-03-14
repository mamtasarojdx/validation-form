import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Style from "./CrudTableStyle.module.css";
import { useTimer } from "../LoginValidation/TimerContext";

function CrudTableList({ userList: initialUserList }) {
  const { time, incrementTime, timeRunning } = useTimer();
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser } = location.state || {};
  const [userList, setUserList] = useState(initialUserList);

  useEffect(() => {
    const registrationData = localStorage.getItem("registrationValues");
    if (registrationData) {
      const newData = JSON.parse(registrationData);
      setUserList((prevUserList) => [...prevUserList, { id: Date.now(), ...newData }]);
    }
  }, []);

  function handleClick() {
    navigate("/company-registration");
  }

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
    <>
      <section className={`${Style.search1}`}>
        <div className="col-lg-4 col-md-4 col-sm-4 text-end">
          <button type="button" className={`${Style.userBtn}`} onClick={handleClick}>
            Add New Company
          </button>
        </div>
        <section className="search-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Company Name</th>
                <th>Owner Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Company Type</th>
                <th>Address</th>
                <th>User Icon</th>
                <th>Company Logo</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{loggedInUser ? loggedInUser.name : "N/A"}</td>
                  <td>{user.CompanyName}</td>
                  <td>{user.OwnerName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.companyType}</td>
                  <td>{`${user.zipCode}, ${user.street}, ${user.city}, ${user.state}, ${user.country}`}</td>

                  <td>{user.userIcon && <img src={user.userIcon} alt="User Icon" style={{ maxWidth: "50px", maxHeight: "50px" }} />}</td>
                  <td>{user.companyLogo && <img src={user.companyLogo} alt="Company Logo" style={{ maxWidth: "50px", maxHeight: "50px" }} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </section>
      </section>
    </>
  );
}

export default CrudTableList;
