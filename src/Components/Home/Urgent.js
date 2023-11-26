import React, { useState, useEffect } from 'react';

import './Home.css';

const Urgent = () => {
  const [newdonationData, setNewDonationData] = useState([]);

 useEffect(() => {
    fetch('http://localhost:8000/api/get_dividable')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch hero data');
        }
        return response.json();
      })
      .then(data => {
        setNewDonationData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 
  const percentage = (newdonationData.amount_paid / newdonationData.total_cost) * 100;
  // const TimeRemaing = (newdonationData.expiration_date - newdonationData.created_at);

  return (
    <section className="Urgent-Container">
      <div className='urgent'>
                <h3>اغاثات عاجلة</h3>
   
      </div>
      <div className='CircularBar-Container'>
        <div className='Progress'>
          <div className='Fill' style={{ '--percentage': `${percentage}`, '--color': '#c0974b' }}>
            <div className='Dot'>

            </div>
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
                       <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className='Number'>
              <h2>{percentage}<span>%</span></h2>
              <p>{newdonationData.amount_paid}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgent;

