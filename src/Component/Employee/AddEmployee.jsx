import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddEmployee.scss'

function AddEmployee() {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		salary: '',
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		console.log("event", event, data)
		event.preventDefault();
		axios.post('http://localhost:8081/create', data)
		  .then(res => {
			navigate('/employee')
		  })
		  .catch(err => console.log(err));
	  }
	  	  
	return (
		<div className='add-employee-container'>
			<h2>Add Employee</h2>
			<form className="" onSubmit={handleSubmit}>
			<div className="">
					<label for="inputName" className="">Name</label>
					<input type="text" className="" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div className="">
					<label for="inputEmail4" className="">Email</label>
					<input type="email" className="" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div className="">
					<label for="inputPassword4" className="">Password</label>
					<input type="password" className="" id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, password: e.target.value})}/>
				</div>
				<div className="">
					<label for="inputSalary" className="">Salary</label>
					<input type="text" className="" id="inputSalary" placeholder="Enter Salary" autoComplete='off'
					onChange={e => setData({...data, salary: e.target.value})}/>
				</div>
				<div className="">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
			</form>
		</div>

	)
}

export default AddEmployee