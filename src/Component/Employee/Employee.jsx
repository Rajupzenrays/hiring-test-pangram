import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'NAME',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'EMAIL',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'DEPARTMENT',
      key: 'department',
    },
    {
      title: 'Salary',
      dataIndex: 'SALARY',
      key: 'salary',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/employeeEdit/${record.ID}`} className='edit-btn'>Edit</Link>
          <Button onClick={e => handleDelete(record.ID)} className='delete-btn'>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className='employee-container'>
      <div className='employee-header'>
        <h3>Employee List</h3>
        <Link to='/create' className='btn btn-success'>Add Employee</Link>
      </div>
      <div className='employee-table'>
        <Table dataSource={data} columns={columns} rowKey="ID" pagination={{
          pageSize: 5,
        }}/>
      </div>
    </div>
  );
}

export default Employee;
