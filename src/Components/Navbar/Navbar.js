import React, { useState } from 'react'
import './Navbar.css'

//img
import logoClinic from '../../Assets/logo-clinic.png';
import { Navigate } from 'react-router-dom';
import { getActive } from '../../Helpers/Utils/Common';

function Navbar() {

  const [isNavExpanded, setIsNavExpended] = useState(false);
  const [redirectToView, setRedirectToView] = useState(false);
  const [active, setActive] = useState(getActive());
  console.log(active)
  const handleActive = (index) => {
    localStorage.setItem('active',  JSON.stringify(index));
    setActive(index);
  }

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={logoClinic} className="navbar-logo"/>
      </a>
      <button className="hamburger" onClick={() => {setIsNavExpended(!isNavExpanded)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
        <ul className='list-items'>
          <li><a href="/home" className={active == 0 ? "active" : ""} onClick={() => handleActive(0)}>Home</a></li>
          <li className={active === 1 ? "active" : ""} onClick={() => handleActive(1)}>About</li>
          <li><a href="/appointment" className={active == 2 ? "active" : ""} onClick={() => handleActive(2)}>Book Appointment</a></li>
          <li><a href="/" className={active == 3 ? "active" : ""} onClick={() => handleActive(3)}>View Queue</a></li>
          <li><a href="/contact" className={active == 4 ? "active" : ""} onClick={() => handleActive(4)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar