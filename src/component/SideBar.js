import React from 'react'
import './sideBar.css'
import navList from '../data/navItems'
import NavItem from './NavItem'
import { Link } from 'react-router-dom'
 const SideBar = () => {
  return (
  <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav " id="sidebar-nav">
        <li className="nav-item">
            <a className="nav-link " href="/">
                <i className="bi bi-grid"></i>
                <span>لوحة  التحكم</span>
            </a>
        </li>
        <li className="nav-heading">Pages</li>
        {navList.map((nav)=>{
             return(
            <NavItem key={nav._id} nav={nav}/>
             );
        })}
      
    </ul>
  </aside>
  )
}
 export default SideBar