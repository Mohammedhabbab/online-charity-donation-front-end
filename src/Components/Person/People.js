import React, { useState, useEffect } from 'react';
import Card from './PersonCard';
import './People.css';

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_beneficiar');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data); // Log the data to the console
        setPeople(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
    

  
    
  return (
    <div className="Container">
      <p className='paragraph'>تبرع من أجل مستقبل أفضل</p>
      <div className='beigeBar'></div> 
      <div className='body'>
      <div className='Cards'>
        {people.map((person) => (
          <Card key={person.id} {...person} />
        
        ))}
      
        </div>
      </div>
    </div>
  );
};

export default People;
