import React from 'react'
import "./sideBar.css"
import { Link } from 'react-router-dom'
 const NavItem = ({nav}) => {
  return (
    <li className='nav-item'>
                        <Link className="nav-link collapsed" to={nav.link}>
                            <i className={nav.icon}></i>
                            <span>{nav.name}</span>
                        </Link>
                    </li>
  )
}
export default NavItem