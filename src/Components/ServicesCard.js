import React from 'react';
import './ServicesCard.css';

const ServicesCard = ({ title, description, imageUrl }) => {
  return (
    <div className="services-card">
      <img src={imageUrl} alt={title} />
      <div className="services-card-body">
        <h5 className="services-card-title">{title}</h5>
        <p className="services-card-text">{description}</p>
        <button>اضغط</button> {/* Include the button */}
      </div>
    </div>
  );
};

export default ServicesCard;
