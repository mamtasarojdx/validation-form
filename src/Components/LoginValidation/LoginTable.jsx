import React, { useEffect, useState } from "react";
import { Navigate, json, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "./LoginTableStyle.module.css";
import { useTimer } from "./TimerContext";
import LoginData from "./LoginData.json";

function LoginTable() {
  const location = useLocation();
  const { userList, loggedInUser } = location.state || {};
  const { time,incrementTime,timeRunning } = useTimer();
  const navigate = useNavigate();

  console.log("userList:", userList);
  console.log("loggedInUser:", loggedInUser);

  function handleClick() {
    navigate("/login-data");

    console.log("time", time);
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
            Back To User Profile
          </button>
        </div>
        <section className="search-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Gender</th>

                <th>State</th>
                <th>City</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {userList
                ?.filter((user) => user.email !== loggedInUser?.email)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.title}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.qualification ? user.qualification.join(", ") : ""}</td>
                    <td>{user.gender}</td>
                    <td>{user.state}</td>
                    <td>{user.city}</td>
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

export default LoginTable;
