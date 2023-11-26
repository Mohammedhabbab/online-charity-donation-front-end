import React from 'react'
import { RouterProvider, createBrowserRouter,createRoutesFromElements, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Services from '../Pages/Services'
import About from '../Pages/About'
import Contactus from '../Pages/Contactus'
import Sign from '../Pages/Sign'
import Adding from '../Pages/Adding'
import HeroAdd from '../Pages/HeroAdd'
import { RootPage } from '../Pages/Root'
import OrganizationProfile from '../Pages/OrganizationProfile'
import UserProfile from '../Pages/UserProfile'
// import Navbar from '../Components/Navbar/Navbar'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About/>}/>
            <Route path="contactus" element={<Contactus/>}/>
        <Route path="sign" element={<Sign />} />
        <Route path="Adding" element={<Adding />} />
        <Route path="AddingHero" element={<HeroAdd />} />
        <Route path="user-profile" element={<UserProfile />} />
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
