import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8081/dashboard").then((res) => {
      if (res.data.Status === "Success") {
        if (res.data.role === "admin") {
          navigate("/");
        } else {
          const id = res.data.id;
          navigate("/employeedetail/" + id);
        }
      } else {
        navigate("/start");
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/" className="logo">
          <span className="logo-text">Manager Dashboard</span>
        </Link>
        <ul className="menu" id="menu">
          <li>
            <Link to="/" data-bs-toggle="collapse">
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/employee">
              <i className="fs-4 bi-people"></i>{" "}
              <span className="menu-text">Manage Employees</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <a href="#">
              <i className="fs-4 bi-power"></i>{" "}
              <span className="menu-text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="main-content">
        <div className="header">
          <h4>Manage Employee</h4>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
