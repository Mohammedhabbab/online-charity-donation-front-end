import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  
import svg0 from '../Assets/Asset 14.svg';
import svg from '../Assets/Asset 2.svg';
import svg1 from '../Assets/Asset 3.svg';
import svg2 from '../Assets/Asset 4.svg';
import svg3 from '../Assets/Asset 5.svg';
import svg4 from '../Assets/Asset 2.svg';

const placeholderHeroData = [
  {
    img: svg,
    name: 'طالب علم',
  },
  {
    img: svg1,
    name: 'كفالة يتيم',
    },
   {
    img: svg2,
    name: 'رعاية طبية' ,
  },
    {
    img: svg3,
   name: 'مستلزمات مدرسية',
    },
   {
    img: svg4,
    name: 'مستلزمات مدرسية',
  },
  // Add more sets as needed
];


const ServicesSection = () => {
  const [services, setServices] = useState(placeholderHeroData);
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

  const getSVG = (img) => {
    return <img src={img} alt="Service" />;
  };

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
          <img src={svg0} alt='Donation' />
          {services
            .slice(setIndex * servicesPerSet, (setIndex + 1) * servicesPerSet)
            .map((service, index) => (
              <Link
                key={index + setIndex * servicesPerSet}
                to={`/services/${service.name}`} 
                className={`Service-Card ${
                  (index + setIndex * servicesPerSet) % 4 === 0 ? 'A1' : ''
                } ${(index + setIndex * servicesPerSet) % 4 === 1 ? 'A2' : ''} ${
                  (index + setIndex * servicesPerSet) % 4 === 2 ? 'A3' : ''
                } ${(index + setIndex * servicesPerSet) % 4 === 3 ? 'A4' : ''}`}
              >
                {getSVG(service.img)}
                <h3>{service.name}</h3>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
