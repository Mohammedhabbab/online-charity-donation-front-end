import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/org.css';

const OrganizationProfile = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    // Example API call using fetch:
    fetch('your-api-endpoint')
      .then((response) => response.json())
      .then((data) => setServicesData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleChartClick = (elements) => {
    if (elements && elements[0]) {
      const clickedService = servicesData[elements[0]._index];
      setSelectedService(clickedService);
    }
  };

  const chartOptions = {
    onClick: (event, elements) => handleChartClick(elements),
  };

  return (
    <>
      <section className='Org'>
        <div className='Org-Container'>
          <div className='Org-Services'>
            {servicesData.map((service, index) => (
              <div key={index} className='Chart'>
                <Doughnut data={service.chartData} options={chartOptions} />
              </div>
            ))}
          </div>
        </div>
        <SideBar />

        {selectedService && (
          <div className='StatisticsBox'>
            {/* Display statistics for the selected service */}
            <p>{selectedService.name}</p>
            <p>Stat 1: {selectedService.stat1}</p>
            <p>Stat 2: {selectedService.stat2}</p>
            <p>Stat 3: {selectedService.stat3}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default OrganizationProfile;
