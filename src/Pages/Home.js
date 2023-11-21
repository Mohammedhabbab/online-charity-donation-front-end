import {useState,useEffect} from 'react'

import Urgent from '../Components/Urgent'
import img from '../images/dmitry-ratushny-xsGApcVbojU-unsplash.jpg'
import '../Components/Home.css'
import HeroSection from '../Components/HeroSection'
import ServicesSection from '../Components/ServicesSection'
import AboutusHomeSection from '../Components/AboutusHomeSection'
import ContactusHomeSection from '../Components/ContactusHomeSection'
const Home = () => {
  const [services, setServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((serviceData) => {
        setServices(serviceData);
      })
      .catch((error) => {
        console.error('Error fetching services: ', error);
      });
  }, []);

 useEffect(() => {
    
    const interval = setInterval(() => {
      
      const updatedServices = [...services];
      const firstService = updatedServices.shift();
      updatedServices.push(firstService);
      setServices(updatedServices);

      
      setScrollPosition(0);
    }, 4500); 

    return () => {
      clearInterval(interval); 
    };
  }, [services]);

 
  useEffect(() => {
    setVisibleServices(services.slice(0, 4));
  }, [services]);

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