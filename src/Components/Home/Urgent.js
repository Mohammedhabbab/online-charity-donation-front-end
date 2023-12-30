import React, { useState, useEffect } from "react";

const Urgent = () => {
  const [newdonationData, setNewDonationData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get_dividable');
        if (!response.ok) {
          throw new Error('Failed to fetch donation data');
        }
        const data = await response.json();
        setNewDonationData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Automatic slide change every 5 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newdonationData.length);
    }, 12000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [newdonationData]);

  const handleSlide = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + newdonationData.length) % newdonationData.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newdonationData.length);
    }
  };


  if (!newdonationData || newdonationData.length === 0) {
    return null; // or some loading indicator
  }

  const currentDonation = newdonationData[currentIndex];
  const percentage = (currentDonation.amount_paid / currentDonation.total_cost) * 100;
  const timeNow = new Date();
  const created_at = new Date(currentDonation.expiration_date);
  const TimeRemaining = created_at - timeNow;
  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  if (TimeRemaining > 0) {
     days = Math.floor(TimeRemaining / (1000 * 60 * 60 * 24));
     hours = Math.floor((TimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     minutes = Math.floor((TimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
     seconds = Math.floor((TimeRemaining % (1000 * 60)) / 1000);
  } else {
    currentDonation.status = 1;
  }

  
  
    return (
      <div className="Urgent-Container">
        {newdonationData.map((donation, index) => (
   
          <div key={index} className={`Urgent-Content   ${currentDonation.status === 1 ?  index=index+1 :index =index-1} ${index === currentIndex ? 'active' : '' }`}>
            <div className="Urgent-Info-Container">
              <div className="Urgent-Info">
                <h3>{currentDonation.name}</h3>
                <p>{currentDonation.overview}</p>
              </div>
              <div className="Time">
                <div className="Time-Container">
                  <h5 id="sec"> {seconds} ثانية</h5>
                  <h5 id="min">{minutes}دقائق</h5>
                  <h5 id="hours">{hours}ساعات</h5>
                  <h5 id="days">{days}يوم</h5>
                </div>
              </div>
            </div>
            <div className="CircularBar-Container">
              <div className='Progress'>
                <div className='Fill' style={{ '--percentage': `${percentage}`, '--color': '#c0974b' }}>
                  <div className='Dot'></div>
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className='Number'>
                    <h2>{percentage.toFixed(2)}<span>%</span></h2>
                    <p>{currentDonation.amount_paid}</p>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => handleSlide('left')} className='Slider-Button Prev'>&#9664; </button>
        <button onClick={() => handleSlide('right')} className='Slider-Button Next'>&#9654;  </button>
      </div>
    );
  
};

export default Urgent;
