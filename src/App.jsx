import React from 'react'
import Login from './Component/ManagerLogin/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Component/Dashboard/Dashboard'
import Employee from './Component/Employee/Employee'
import Home from './Home'
import AddEmployee from './Component/Employee/AddEmployee'
import EditEmployee from './Component/Employee/EditEmployee'
import Start from './Component/StartPage/Start'
import EmployeeDetail from './Component/Employee/EmployeeDetail'
import EmployeeLogin from './Component/EmployeeLogin/EmployeeLogin'
import SignUp from './Component/SignUp/Signup'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/create' element={<AddEmployee />}></Route>
        <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>

      <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App