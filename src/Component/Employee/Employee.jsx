import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Employee.scss';

function Employee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getEmployee')
      .then(res => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('Error');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='employee-container'>
      <div className='employee-header'>
        <h3>Employee List</h3>
        <Link to='/create' className='btn btn-success'>Add Employee</Link>
      </div>
      <div className='employee-table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              {console.log("data",data)}
              return (
                <tr key={index}>
                  <td>{employee.NAME}</td>
                  <td>{employee.EMAIL}</td>
                  <td>{employee.DEPARTMENT}</td>
                  <td>{employee.SALARY}</td>
                  <td>
                    <Link to={`/employeeEdit/${employee.ID}`} className='edit-btn'>Edit</Link>
                    <button onClick={e => handleDelete(employee.ID)} className='delete-btn'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
