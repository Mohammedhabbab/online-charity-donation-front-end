import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesCard.css';

const ServicesCard = ({ id, title, description, imageUrl }) => {
  const navigate = useNavigate();

  const navigateToService = () => {
    navigate(`/service/${id}`); 
  };

  return (
    <div className="services-card">
      <img src={imageUrl} alt={title} />
      <div className="services-card-body">
        <h5 className="services-card-title">{title}</h5>
        <p className="services-card-text">{description}</p>
        <button onClick={navigateToService}>اضغط</button>
      </div>
    </div>
  );
};

export default ServicesCard;
