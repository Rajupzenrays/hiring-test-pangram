import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'

function Start() {
  const navigate = useNavigate()

  return (
    <div className='start'>
      <div className='start__wrapper'>
        <h2>Login As</h2>
        <div className='start__wrapper__buttons'>
          <button onClick={() => navigate('/employeeLogin')}>Employee</button>
          <button onClick={() => navigate('/login')}>Manager</button>
        </div>
        <h4><Link to={'/signup'}>SignUp ?</Link></h4>
      </div>
    </div>
  )
}

export default Start
