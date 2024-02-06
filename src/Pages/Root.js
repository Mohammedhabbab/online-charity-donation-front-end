import React from 'react'
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import '../index.css';

export const RootPage = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [mode, setMode] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsUserSignedIn(!!authToken);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsUserSignedIn(false);
    setMode('user');
    navigate('/sign');
  };
  return (
      <>
      <Navbar isUserSignedIn={isUserSignedIn} mode={mode} handleSignOut={handleSignOut} />
      <div className='Fully'>
        <Outlet /></div>
      
        
     
      <Footer />
      
    </>
  )
}
