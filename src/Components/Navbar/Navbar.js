import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userType, setUserType] = useState('user');
  const [companyData, setCompanyData] = useState({ logoUrl: '', name: '' });

  useEffect(() => {
    // Fetlogo,name api a
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('/api/'); 
      if (response.ok) {
        const data = await response.json();
        setCompanyData({ logoUrl: data.logoUrl, name: data.name });
      } else {
        console.error('Failed to fetch company data');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  return (
    <>
      <header className='Navbar'>
        <div className="logo-container">
          <img src={companyData.logoUrl} alt="Logo" id="logo" />
          <span id="company-name">{companyData.name}</span>
        </div>
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
