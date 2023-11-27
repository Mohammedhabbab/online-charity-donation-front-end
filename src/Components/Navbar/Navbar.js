import React, { useState, useEffect } from "react";
import { NavLink,useNavigate,useLocation } from 'react-router-dom';


import './Navbar.css';
import logo from './NavAssets/Asset 17.svg'
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Abril+Fatface" />;
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Bangers" />;

export const Navbar = ({ mode,handleSignOut }) => {
    const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
 const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    // check  token exists
    const authToken = localStorage.getItem('authToken');

    // update the local state
    setIsUserSignedIn(!!authToken);
  }, []); // empty array means this effect runs imed




 // const [charityData, setCharityData] = useState({ logoUrl: '', name: '' });

  // useEffect(() => {
  //   // Fetlogo,name api a
  //   fetchCharityData();
  // }, []);

  // const fetchCharityData = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users'); 
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCharityData({ logoUrl: data.logoUrl, name: data.name });
  //     } else {
  //       console.error('Failed to fetch company data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching company data:', error);
  //   }
  // };

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
     <>
              <li onClick={toggleDropdown} className="dropdown-trigger">
                <span id="nav">{mode === 'user' ? 'حسابي' : 'حساب الجمعية'}</span>
                {showDropdown && (
                  <div className="dropdown-content">
                    <NavLink  to={mode === 'user' ? '/user-profile' : '/org-profile'}>
                      {mode === 'user' ? 'الملف الشخصي' : 'ملف الجمعية'}
                    </NavLink>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <li>
              <NavLink id="nav" to="/sign">تسجيل</NavLink>
            </li>
          )}
        </ul>
        
      </header>
    
    </>
  );
};

export default Navbar;
