import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { FaUser } from 'react-icons/fa'
import axios from 'axios'
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const SignIn = () => {
    // console.log("USename ",userName)
    // console.log("Password ",password)

    // const formData = new FormData();
    // formData.append("username",userName);
    // formData.append("password",password);
    // formData,
    const data = {
      "username": userName,
      "password": password
    }
    const headers = {
      'Content-Type': 'application/json',
      // "Access-Control-Allow-Credentials":true
    }
    // , {credentials: 'include'}
    axios.post(`http://localhost:8084/rateadmin/login1`, data
   )
      //  {
      //   "username":userName,
      //   "password":password
      //   }
      //  data, {

      // })
      // {
      // "username":userName,
      // "password":password
      // }
      // })

      .then((res) => {
        // alert("login Success")
        console.log(res);
        if (res.status == 200) {
          navigate('/customersManagement')
        }
      }, (err) => {
        if (err.response.data.status == 401) {
          setErrorMessage("Bad Credential");
        }
        console.log(err)
      });
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
          {errorMessage != null ? <small className='text-danger'>{errorMessage}</small> : <small />}
          <div className='signIn '>

            <button type="button" class="btn btn-info text-white" style={{ width: "100%" }}
              onClick={() => SignIn()}>SignIn</button>

          </div>
        </div>

      </center>
    </div>

  );
}

export default Login