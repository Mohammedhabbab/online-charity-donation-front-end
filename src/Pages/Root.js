import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import '../index.css';

export const RootPage = () => {
  return (
      <>
      <Navbar />
       <div className="Full"> 
        <Outlet />
      
      <Footer />
       </div>
    </>
  )
}
