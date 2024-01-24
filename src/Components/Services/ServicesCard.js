import React from 'react';
import './ServicesCard.css';
import { NavLink } from 'react-router-dom';
import {useService} from '../Dynamic/ServiceContext'
// import OrphanImage from '../images/orphan.jpg';
// import MedicalImage from '../images/Medical.png';
// import StudentsImage from '../images/Students.jpg';
// import SchoolImage from '../images/School.png';


const ServicesCard = ({ title,description,url,image,shape }) => {
  console.log(title)

  const { setServiceS } = useService();

  const handleClick = () => {
    const selectedServiceS = { title, description, url, image, shape };

    setServiceS(selectedServiceS);
  };
  return (
    <div className="services-card">
      <img src={image} alt={title} />
      <div className="services-card-body">
        <h5 className="services-card-title">{title}</h5>
        <p className="services-card-text">{description}</p>
        <button onClick={handleClick} ><NavLink id="td" to={`/services/${url}`}>اضغط</NavLink></button> 
      </div>
    </div>
  );
};

export default ServicesCard;
