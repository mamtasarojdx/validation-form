import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "./FormStyle.module.css";
import data from "../CrudData/Data.json";

function FormTable() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    setItems(data);
  }, []);

const editItem =(id)=>{
  navigate("edit");
}

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const addItem = (newItem) => {
    setItems([...items, newItem]);
    // setNewItemName("");
    navigate("/create");
  };
  
  return (
    <>
      <section className={`${Style.search1}`}>
        <div className="col-lg-4 col-md-4 col-sm-4 text-end">
          <button type="button" className={`${Style.userBtn}`} onClick={addItem}>
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
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.qualification ? item.qualification + " " : item.qualification}</td>
                  <td>{item.gender}</td>
                  <td>{item.country}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>
                    <button type="button" className={`${Style.editBtn}`} onClick={() => editItem(item.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button type="button" className={`${Style.dltBtn}`}  onClick={() => deleteItem(item.id)}>
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
