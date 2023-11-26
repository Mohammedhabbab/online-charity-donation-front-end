import {useState,useEffect} from 'react'

import Urgent from '../Components/Home/Urgent'
// import img from '../Components/images/dmitry-ratushny-xsGApcVbojU-unsplash.jpg'
import '../Components/Home/Home.css'
import HeroSection from '../Components/Home/HeroSection'
import ServicesSection from '../Components/Home/ServicesSection'
import AboutusHomeSection from '../Components/Home/AboutusHomeSection'
import ContactusHomeSection from '../Components/Home/ContactusHomeSection'
const Home = () => {

  
//   useEffect(() => {
    
//     fetch('http://localhost:8000/api/get_services')
//       .then((response) => response.json())
//       .then((serviceData) => {
//         setServices(serviceData);
//       })
//       .catch((error) => {
//         console.error('Error fetching services: ', error);
//       });
//   }, []);

//  useEffect(() => {
    
//     const interval = setInterval(() => {
      
//       const updatedServices = [...services];
//       const firstService = updatedServices.shift();
//       updatedServices.push(firstService);
//       setServices(updatedServices);

      
//       setScrollPosition(0);
//     }, 4500); 

//     return () => {
//       clearInterval(interval); 
//     };
//   }, [services]);

 
//   useEffect(() => {
//     setVisibleServices(services.slice(0, 4));
//   }, [services]);

  return (
    <>
      < >
       <Urgent/>
      </>
      <>
        <HeroSection/>
      </>
       {/* <div className='white-space'></div> */}
              
      
      <>
        <ServicesSection/>
      </>
      {/* <div className='white-space'>   </div> */}
      <>
     <AboutusHomeSection />
      </>
            {/* <div className='white-space'>   </div>*/}
      <><ContactusHomeSection/></>
      </>
  )
}

export default Home