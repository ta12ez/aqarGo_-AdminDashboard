import React from 'react';
import "./main.css";
import PageTitle from './PageTite';
import Dashboard from './Dashboard';
import UserPage from './userPage';
import { Route, Routes } from 'react-router-dom'; 
import EditUserPage from './EidetUserPage';
import OfficesPage from './OffecesPage';
import PropertiesPage from './PropertiesPage';
import PropertyDetails from './PropertyDetails';
import Officedetails from './Officedetails';
import Login from './login';
import States from './states.js';
import Cities from './Cities.js';

const Main = () => {
  return (
    <main id="main" className="main">
      <PageTitle page="لوحةالتحكم"/>
      <Routes> 
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/UsersPage' element={<UserPage/>} />
        <Route path='/EditeUserPage' element={<EditUserPage/>} />
        <Route path='/OfficesPage' element={<OfficesPage/>} />
        <Route path='/PropertiesPage' element={<PropertiesPage/>} />
        <Route path='/PropertyDetails/:id' element={<PropertyDetails/>} />
         <Route path="/OfficeDetails/:id" element={<Officedetails />} />
        <Route path='/loginPage' element={<Login/>} />
        <Route path='/States' element={<States/>} />
        <Route path='/Cities' element={<Cities/>} />
      </Routes>
    </main>
  )
}

export default Main;
