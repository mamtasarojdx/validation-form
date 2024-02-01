import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "./FormStyle.module.css";

function FormTable() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    qualification: [],
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
      localStorage.setItem('myData', JSON.stringify(json));
      console.log(users);
    }, []);
 

  const handleDelete = (id) => {
    fetch(`/data.json/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((users) => {
        setUsers(users.filter((user) => user.id !== id));
      });
  };

  const handleCreate = () => {
    const newUser = { id: users.length + 1, name: `Item ${users.length + 1}` };
    setUsers([...users, newUser]);
    setUsers([...users, newUser]);
    navigate("/create");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <section className={`${Style.search1}`}>
        <div className="col-lg-4 col-md-4 col-sm-4 text-end">
          <button type="button" className={`${Style.userBtn}`} onClick={handleCreate}>
            Create new User
          </button>
        </div>
        <section className="search-table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Gender</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.qualification ? user.qualification + " " : user.qualification}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                  <td>
                    <button type="button" className={`${Style.editBtn}`} onClick={() => handleEdit(user.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button type="button" className={`${Style.dltBtn}`} onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
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

export default FormTable;
