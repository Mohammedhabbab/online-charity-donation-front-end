import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userType, setUserType] = useState('user');

  return (
    <>
      <header className='Navbar'>
        <ul>
          <li><NavLink id='nav' to="/">Home</NavLink></li>
          <li><NavLink id='nav' to="/services">Services</NavLink></li>
          <li><NavLink id='nav' to="/about">About</NavLink></li>
          <li><NavLink id='nav' to="/contactus">Contact Us</NavLink></li>

          {isUserSignedIn ? (
            userType === 'user' ? (
              <li><NavLink id='nav' to="/user-profile">Profile</NavLink></li>
            ) : (
              <li><NavLink id='nav' to="/org-profile">Profile</NavLink></li>
            )
          ) : (
            <li><NavLink id='nav' to="/sign">Sign In</NavLink></li>
          )}
        </ul>
        
      </header>
    
    </>
  );
};

export default Navbar;
