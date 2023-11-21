import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  
import svg from '../Assets/Asset 14.svg';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const servicesSectionRef = useRef(null);
  const servicesCardRef = useRef(null);
  const servicesPerSet = 4;
  

 useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await fetch(''); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // const getSVG = (img) => {
  //   return <img src={img} alt="Service" />;
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      if (servicesSectionRef.current && servicesCardRef.current) {
        const scrollWidth = servicesCardRef.current.offsetWidth;
        servicesSectionRef.current.scrollBy({
          left: scrollWidth,
          behavior: 'smooth',
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='Services-Section' ref={servicesSectionRef}>
      {Array.from({ length: Math.ceil(services.length / servicesPerSet) }).map((set, setIndex) => (
          <div key={setIndex} className='Service-Card' ref={servicesCardRef}>
              <h2>خدماتنا</h2>
          <img src={svg} alt='' />
          {services
            .slice(setIndex * servicesPerSet, (setIndex + 1) * servicesPerSet)
            .map((service, index) => (
              <Link
                key={index + setIndex * servicesPerSet}
                to={`/services/${service.url}`} 
                className={`Service-Card ${
                  (index + setIndex * servicesPerSet) % 4 === 0 ? 'A1' : ''
                } ${(index + setIndex * servicesPerSet) % 4 === 1 ? 'A2' : ''} ${
                  (index + setIndex * servicesPerSet) % 4 === 2 ? 'A3' : ''
                } ${(index + setIndex * servicesPerSet) % 4 === 3 ? 'A4' : ''}`}
              >
                <img src={service.img} alt={service.name} />
                <h3>{service.name}</h3>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
