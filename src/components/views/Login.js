import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { FaUser } from 'react-icons/fa'
import axios from 'axios'
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const SignIn = () => {
    console.log("USename ",userName)
    console.log("Password ",password)
    navigate('/customersManagement')
  }
  return (
    <div className='container'>

      <center>
        <div className='login-form col-sm' style={{ width: '20%' }}>
          <div className='logo mt-5 mb-4'>
            <img src={require('../../assests/ReleaseOwl-Logo.png')} className='w-100 h-100' />
          </div>
          <div className='userName mb-4 '>

            <input type='text ' className='form-control' placeholder='Username'
              value={userName} onChange={(e) => setUserName(e.target.value)} />

          </div>
          <div className='password mb-4'>

            <input type='password' className='form-control' placeholder='password'
              value={password} onChange={(e) => setPassword(e.target.value)} />

          </div>
          <div className='password '>

            <button type="button" class="btn btn-info text-white" style={{ width: "100%" }}
              onClick={() => SignIn()}>SignIn</button>

          </div>
        </div>
      </center>
    </div>

  );
}

export default Login