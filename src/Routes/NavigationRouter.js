import React from 'react'
import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route,Outlet } from 'react-router-dom'
import Home from '../Pages/Home'
import Services from '../Pages/Services'
import About from '../Pages/About'
import Contactus from '../Pages/Contactus'
import SignIn from '../Pages/SignIn'
import UserProfile from '../Pages/UserProfile'
import OrganizationProfile from '../Pages/OrganizationProfile'
// import Navbar from '../Components/Navbar/Navbar'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
            <Route index element={<Home/>} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About/>}/>
            <Route path="contactus" element={<Contactus/>}/>
        <Route path="SignIn" element={<SignIn/>} />
        <Route path="user-profile" element={< UserProfile/>} />
         <Route path="org-profile" element={<OrganizationProfile/>}/>
        </Route>
    )
);

function Routee() {
  return (
    <>
      
      <RouterProvider router={router} />
    </>
      
  );
}
export default Routee
