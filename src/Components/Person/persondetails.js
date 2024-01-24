import React, { useState, useEffect } from 'react';
import Details from './Person'; 
import './PersonDetails.css'; 

const PersonDetailsPage = () => {
  const [personDetails, setPersonDetails] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_beneficiar');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        setPersonDetails(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Container">
      <p className='paragraph'>الملف الشخصي </p>
      <div className='beigeBar'></div> 
      <div className='body'>
        <div className='Cards'>
          {personDetails.map((person) => ( // Use the updated variable name here
            <Details key={person.id} {...person} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsPage; // Corrected the export statement
