import React, { useState } from 'react'
import './Navbar.css'

//img
import logo from '../../Assets/logo.png';
import { Navigate } from 'react-router-dom';

function Navbar() {

  const [isNavExpanded, setIsNavExpended] = useState(false);
  const [redirectToView, setRedirectToView] = useState(false);


  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <img src={logo} className="navbar-logo"/>
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
          <li>Home</li>
          <li>About</li>
          <li><a href="/">View Queue</a></li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar