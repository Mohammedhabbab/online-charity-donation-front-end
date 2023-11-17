import {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Urgent from '../Components/Urgent'
import img from '../images/dmitry-ratushny-xsGApcVbojU-unsplash.jpg'
import '../Components/Home.css'
import HeroSection from '../Components/HeroSection'
import ServicesSection from '../Components/ServicesSection'
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
      <Navbar />
      < >
       <Urgent/>
      </>
      <>
        <HeroSection/>
      </>
       <div className='white-space'>
              
      </div>
      <>
        <ServicesSection/>
      </>
        <div className='white-space'>
              
      </div>

      {/* <section className='Hero'>
        <img src={img} alt='name' id='hero-pic' />
        <h3 id='W1'> We Rise</h3>
        <h3 id='W2'>By Lifting Others</h3>
        </section> 
       <section id="services">
        <div className="service-cards-container" style={{ transform: `translateX(-${scrollPosition}px)` }}>
          
         {services.map((service, index) => (
            <div key={index} className="service-card">
            {/*<img src={service.imageUrl} alt={service.name} />
            <h3>{service.name}</h3>
         <p>{service.description}</p> 
            </div>
          ))}
        </div>
      </section>
     */}
      </>
  )
}

export default Home