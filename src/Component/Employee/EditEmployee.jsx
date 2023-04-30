import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditEmployee.scss";

function EditEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    salary: "",
    department: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        console.log(res);
        setData({
          ...data,
          name: res.data.Result[0].NAME,
          email: res.data.Result[0].EMAIL,
          salary: res.data.Result[0].SALARY,
          department: res.data.Result[0].DEPARTMENT,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/employee");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log("data-->", data);
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSalary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) => setData({ ...data, salary: e.target.value })}
              value={data.salary}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDepartment">Department</label>
            <input
              type="text"
              className="form-control"
              id="inputDepartment"
              placeholder="IT Sales HR"
              autoComplete="off"
              onChange={(e) => setData({ ...data, department: e.target.value })}
              value={data.department}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
