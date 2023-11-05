import React from 'react'
import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route,Outlet } from 'react-router-dom'
import Home from '../Pages/Home'
import Services from '../Pages/Services'
import About from '../Pages/About'
import Contactus from '../Pages/Contactus'
import Sign from '../Pages/Sign'
import ProfileU from '../Pages/ProfileU'
import ProfileO from '../Pages/ProfileO'
// import Navbar from '../Components/Navbar/Navbar'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
            <Route index element={<Home/>} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About/>}/>
            <Route path="contactus" element={<Contactus/>}/>
        <Route path="sign" element={<Sign />} />
        <Route path="user-profile" element={<ProfileU />} />
         <Route path="org-profile" element={<ProfileO/>}/>
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
