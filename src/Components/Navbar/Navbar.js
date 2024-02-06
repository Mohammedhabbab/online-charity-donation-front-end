import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from './NavAssets/Asset 17.svg';

export const Navbar = ({ handleSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        setUserData(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/auth/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]); 

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };


 // const navLinkTo = useMemo(() => userData?.type_of_user === 'user' ? '/user-profile' : '/org-profile', [userData]);
  const navLinkTo = useMemo(() => userData?.type_of_user === 'user' ? '/profile' : '/profile', [userData]);
  if (isLoading) {
    return null;
  }

  return (
    <>
      <header className='Navbar'>
        <div className="logo-container">
          <img src={logo} alt="Logo" id="logo" />
          <span id="charity-name">OCD</span>
        </div>
        <ul>
          <li><NavLink id='nav' to="/">الرئيسية</NavLink></li>
          <li><NavLink id='nav' to="/services">خدماتنا</NavLink></li>
          <li><NavLink id='nav' to="/about">من نحن</NavLink></li>
          <li><NavLink id='nav' to="/contactus">تواصل معنا</NavLink></li>

          {userData && userData.type_of_user !== 'admin' ? (
            <li onClick={toggleDropdown} className="dropdown-trigger">
              <span id="nav">{userData.type_of_user === 'user' ? 'حسابي' :userData.type_of_user === 'charity' ? 'حساب الجمعية' : ''}</span>
              {showDropdown && (
                <div className="dropdown-content">
                  <NavLink to={navLinkTo}>
                    {userData.type_of_user === 'user' ? 'الملف الشخصي' : 'ملف الجمعية'}
                  </NavLink>
                  <br></br>
                  <button onClick={handleSignOut}>الخروج</button>
                </div>
              )}
            </li>
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
