import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import svg from '../Assets/Asset 14.svg';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const servicesSectionRef = useRef(null);
  const servicesCardRef = useRef(null);
  const servicesPerSet = 4;
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleSlide = (direction) => {
    const scrollWidth = servicesCardRef.current.offsetWidth;
    const currentScrollLeft = servicesSectionRef.current.scrollLeft;

    if (direction === 'left') {
      servicesSectionRef.current.scrollTo({
        left: currentScrollLeft - scrollWidth,
        behavior: 'smooth',
      });
    } else {
      servicesSectionRef.current.scrollTo({
        left: currentScrollLeft + scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollByInterval = () => {
    if (servicesSectionRef.current && servicesCardRef.current) {
      const scrollWidth = servicesCardRef.current.offsetWidth;
      servicesSectionRef.current.scrollBy({
        left: scrollWidth,
        behavior: 'smooth',
      });
    }

    setTimeout(scrollByInterval, 10000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_services');
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollLeft = servicesSectionRef.current?.scrollLeft || 0;
      const maxScrollLeft =
        (servicesSectionRef.current?.scrollWidth || 0) -
        (servicesSectionRef.current?.clientWidth || 0);

      setShowLeftButton(currentScrollLeft > 0);
      setShowRightButton(currentScrollLeft < maxScrollLeft - 1);
    };

    servicesSectionRef.current?.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      // Check if the ref and current property are available before removing the listener
      if (servicesSectionRef.current) {
        servicesSectionRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  useEffect(() => {
    scrollByInterval();

    // Clear interval when the component is unmounted
    return () => {
      clearTimeout(scrollByInterval);
    };
  }, []);

  return (
    <>
      <div className='Services-Section' ref={servicesSectionRef}>
        {Array.from({ length: Math.ceil(services.length / servicesPerSet) }).map(
          (set, setIndex) => (
            <div key={setIndex} className='Service-Card' ref={servicesCardRef}>
              <button
                className="Slider-Button PrevS"
                onClick={() => handleSlide('left')}
                style={{ display: showLeftButton ? 'block' : 'none' }}
              >
                &#9664;
              </button>
              <h2>خدماتنا</h2>
              <img src={svg} alt='' />
              {services
                .slice(setIndex * servicesPerSet, (setIndex + 1) * servicesPerSet)
                .map((service, index) => (
                  <Link
                    key={index + setIndex * servicesPerSet}
                    to={`/services/${service.url}`}
                    className={`Service-Card ${(index + setIndex * servicesPerSet) % 4 === 0 ? 'A1' : ''
                      } ${(index + setIndex * servicesPerSet) % 4 === 1 ? 'A2' : ''} ${(index + setIndex * servicesPerSet) % 4 === 2 ? 'A3' : ''
                      } ${(index + setIndex * servicesPerSet) % 4 === 3 ? 'A4' : ''}`}
                  >
                    <img src={service.image} alt={service.title} />
                    <h3>{service.title}</h3>
                  </Link>
                ))}
              <button
                className="Slider-Button NextS"
                onClick={() => handleSlide('right')}
                style={{ display: showRightButton ? 'block' : 'none' }}
              >
                &#9654;
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ServicesSection;
