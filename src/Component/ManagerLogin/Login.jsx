import React, { useState } from 'react';
import './style.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/login', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/');
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-container'>
        <h2>Manager Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        {error && <div className='error-message'>{error}</div>}
        
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Enter Email'
            name='email'
            onChange={(e) =>
              setValues({ ...values, email: e.target.value })
            }
            autoComplete='off'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}

export default Login;