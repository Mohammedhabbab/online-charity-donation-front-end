import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './PersonCard';
import './People.css';

const People = () => {
  const { serviceUrl } = useParams();
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_beneficiar');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        setPeople(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(serviceUrl)
  const lowercasedServiceUrl = serviceUrl?.toLowerCase();
  const filteredBenf = people.filter(
    (person) => person.needy_type.toLowerCase() === lowercasedServiceUrl
  );

  if (!filteredBenf) {
    navigate('/404');
    return null;
  }

  return (
    <>
<body style={{background:'black'}}>
        <div className="Container" style={{ width: '97%', left: '0rem', marginBottom: '2rem',display:'flex' ,flexDirection:'column'}} >
        <p className='paragraph'>تبرع من أجل مستقبل أفضل</p>
        <div className='beigeBar'></div>
          <div className='Cards'  style={{position:'relative' , flexWrap:'wrap'}}>
          {filteredBenf.map((person) => (
            <Card key={person.id} {...person} />
          ))}
        </div>
      </div>
      </body>
    </>
  );
};

export default People;
