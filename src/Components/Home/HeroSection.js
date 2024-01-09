import React, { useState, useEffect } from 'react';





const HeroSection = () => {
  const [heroData, setHeroData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const apiUrl = 'http://localhost:8000/api/get_hero';
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch hero data');
        }
        return response.json();
      })
      .then(data => {
        setHeroData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroData]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroData.length) % heroData.length);
  };


  return (
    <section className='Hero-Section'>
          <div className='Hero-Card-Container'>
        {heroData.map((heroSet, i) => (
          <div key={i} className={`Hero-Card ${i === currentIndex ? 'active' : ''}`}>
            <img src={heroSet.image} alt={`Hero ${i + 1}`} />
            <div className={`Asset ${i === currentIndex ? 'active' : ''}`} >
              <img src={heroSet.asset} alt={`Asset ${i + 1}`} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className='Slider-Button Prev'>&#9664;</button>
      <button onClick={nextSlide} className='Slider-Button Next'>&#9654;</button>
    </section>
  );
};

export default HeroSection;