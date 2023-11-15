import React, { useState, useEffect } from 'react';

import './Home.css';

const Urgent = () => {
  const [newdonationData, setNewDonationData] = useState({
    donationType: '',
    totalCost: 0,
    amountPaid: 0,
    expirationDate: '',
  });

  useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => {
      setNewDonationData({
        donationType: data.title, 
        totalCost: 1000, 
        amountPaid: 800, 
        expirationDate: '2023-12-31', 
      });
    })
    .catch((error) => {
      console.error('Error fetching donation data: ', error);
    });
}, []);

 
  const percentage = (newdonationData.amountPaid / newdonationData.totalCost) * 100;

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
              <p>{newdonationData.amountPaid}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgent;

