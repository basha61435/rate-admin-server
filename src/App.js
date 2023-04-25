import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/views/Login'
import CiServer from './components/CiServer/CiServer'
import CustomersManagement from './components/Customers/CustomersManagement'
import CompanyManagement from './components/Companies/CompanyManagement'
import Profile from './components/views/Profile'

const App = () => {
  return (
   
    
    <Routes>
      <Route path='/' element={<Login />} />
      
      <Route path="/ciServers" element={<CiServer />} />
      <Route path="/customersManagement" element={<CustomersManagement />} />
      <Route path='/companyManagement' element={<CompanyManagement />} />
      <Route path='/profile' element={<Profile/>}/>
      
    </Routes>
    
  )
}

export default App