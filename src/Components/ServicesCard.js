import React from 'react';
import './ServicesCard.css';
import OrphanImage from '../images/orphan.jpg';
import MedicalImage from '../images/Medical.png';
import StudentsImage from '../images/Students.jpg';
import SchoolImage from '../images/School.png';


const ServicesCard = ({ title, description, imageUrl }) => {
  console.log(title)
  return (
    <div className="services-card">
      <img src={imageUrl} alt={title} />
      <div className="services-card-body">
        <h5 className="services-card-title">{title}</h5>
        <p className="services-card-text">{description}</p>
        <button>اضغط</button> 
      </div>
    </div>
  );
};

export default ServicesCard;
