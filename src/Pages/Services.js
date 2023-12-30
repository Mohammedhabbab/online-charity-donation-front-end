import React, { useState, useEffect, useMemo } from 'react';

import ServicesSearchbar from '../Components/Services/ServicesSearchbar';
import ServicesCard from '../Components/Services/ServicesCard';
// import '../Components/Services/Services.css';
import '../Components/Services/ServicesCard.css';
import BackImage from '../Components/images/Back.jpg'

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredServices, setFilteredServices] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/api/get_services')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setServices(data || []); 
        setFilteredServices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(prev => query);
  };
  
  useMemo(() => {
    const filterServices = services.filter(service =>
    service.title.includes(searchQuery) ||
    service.description.includes(searchQuery)  
  );

  setFilteredServices(filterServices);
}, [services, searchQuery]);
    
    return (
    <>  
    
      <div className='ServiceContainer'>
      
          <ServicesSearchbar handleSearch={handleSearch} />
          
        <div className='Services'>
          <img src={BackImage} className='BackgroundImage'></img>
          <div className="services-card-container">
            {isLoading ? (
              <div>Loading services...</div>
            ) : error ? (
              <div>Error fetching services: {error.message}</div>
            ) : (
              filteredServices.map((service) => ( 
                <ServicesCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  url={service.url}
                />
              ))
            )}
          </div>
            </div>
          
      </div>
    </>
  );
};

export default Services;
