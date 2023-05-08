import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import axios from 'axios'
const Profile = () => {
useEffect(()=>{
  axios.get(`http://localhost:8080/rateadmin/admin/ciserverdata`).then((res)=>{
    console.log(res);
  })
},[])
  return (
    <div className='d-flex w-100 h-100'>

    <Sidebar/>
    <div className='w-100 h-100 m-3'>Profile</div>
    </div>
  )
}

export default Profile