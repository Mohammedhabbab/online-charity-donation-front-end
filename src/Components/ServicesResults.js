import React from 'react';
import ServicesCard from './ServicesCard';
import '../images/orphan.jpg'

const ServicesResults = ({ results }) => {
  return (
    <div className="services-results">
      {results.map((result, index) => (
        <ServicesCard
          key={index}
          title={result.title}
          description={result.description}
          imageUrl={result.imageUrl}
        >
          <button onClick={() => window.location.href = `/service/${index+1}`}>Learn More</button>
        </ServicesCard>
      ))}
    </div>
  );
};

export default ServicesResults;
