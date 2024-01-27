import React, { useState, useEffect } from 'react';
import Details from './Person'; 
import './PersonDetails.css'; 
import { BeneficiarProvider, useBene } from '../Dynamic/BeneficiarContext';


const PersonDetailsPage = () => {
  const { selectedBene, setSelectedBene } = useBene(); 

  
  return (
    <div className="Container">
      <p className='paragraph'>الملف الشخصي </p>
      <div className='beigeBar'></div> 
      <div className='body'>
        <div className='Cards'>
            <Details key={selectedBene.id} {...selectedBene} />
        
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsPage; 
