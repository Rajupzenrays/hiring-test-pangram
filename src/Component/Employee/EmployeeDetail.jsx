import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EmployeeDetail.scss'

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/get/'+id)
        .then(res => setEmployee(res.data.Result[0]))
        .catch(err => console.log(err));
    })
    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}

  return (
    <div className='container'>
        <div className='inside_container'>
            <div className='info'>
                <h3>Name: {employee.NAME}</h3>
                <h3>Email: {employee.EMAIL}</h3>
                <h3>Salary: {employee.SALARY ? employee.SALARY : 'N/A'}</h3>
                <h3>Department: {employee.DEPARTMENT ? employee.DEPARTMENT : 'N/A'}</h3>

            </div>
            <div className='actions'>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail
