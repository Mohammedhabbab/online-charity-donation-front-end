import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './NavAssets/Asset 17.svg'
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Abril+Fatface" />;
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bangers" />;
export const Navbar = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userType, setUserType] = useState('user');
  const [charityData, setCharityData] = useState({ logoUrl: '', name: '' });

  useEffect(() => {
    // Fetlogo,name api a
    fetchCharityData();
  }, []);

  const fetchCharityData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
      if (response.ok) {
        const data = await response.json();
        setCharityData({ logoUrl: data.logoUrl, name: data.name });
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
             {/* <img src={charityData.logoUrl} alt="Logo" id="logo" /> */}
          <img src={logo} alt="Logo" id="logo" />
          {/* <span id="charity-name">{charityData.name}</span> */}
                  <span id="charity-name">OCD</span>
        </div>
        <ul>
          <li><NavLink id='nav' to="/">الرئيسية</NavLink></li>
          <li><NavLink id='nav' to="/services">خدماتنا</NavLink></li>
          <li><NavLink id='nav' to="/about">من نحن</NavLink></li>
          <li><NavLink id='nav' to="/contactus">تواصل معنا</NavLink></li>

          {isUserSignedIn ? (
            userType === 'user' ? (
              <li><NavLink id='nav' to="/user-profile">Profile</NavLink></li>
            ) : (
              <li><NavLink id='nav' to="/org-profile">Profile</NavLink></li>
            )
          ) : (
            <li><NavLink id='nav' to="/signin">Sign In</NavLink></li>
          )}
        </ul>
        
      </header>
    
    </>
  );
};

export default Navbar;
