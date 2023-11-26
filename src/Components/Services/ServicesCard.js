import React from 'react';
import './ServicesCard.css';
import { NavLink } from 'react-router-dom';
// import OrphanImage from '../images/orphan.jpg';
// import MedicalImage from '../images/Medical.png';
// import StudentsImage from '../images/Students.jpg';
// import SchoolImage from '../images/School.png';


const ServicesCard = ({ title,description,url,image }) => {
  console.log(title)
  return (
    <div className="services-card">
      <img src={image} alt={title} />
      <div className="services-card-body">
        <h5 className="services-card-title">{title}</h5>
        <p className="services-card-text">{description}</p>
        <button><NavLink id="td" to={`/services/${url}`}>تواصل معنا</NavLink></button> 
      </div>
    </div>
  );
};

export default ServicesCard;
