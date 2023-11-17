import React, { useState, useEffect } from 'react';
import img from '../images/alex-radelich-rtCfGTI7nCA-unsplash.jpg'
import svg from '../Assets/Asset 16.svg'
import img1 from '../images/avel-chuklanov-9cx4-QowgLc-unsplash.jpg'
import svg1 from '../Assets/Asset 15.svg'
import img2 from '../images/clement-chai-yrCp5O-x2uc-unsplash.jpg'
import svg2 from '../Assets/Asset 14.svg'

const placeholderHeroData = [
  {
    heroImg: img,
    assetImg: svg,
  },
  {
    heroImg: img1,
    assetImg: svg1,
    },
   {
    heroImg: img2,
    assetImg: svg2,
  },
  // Add more sets as needed
];


const HeroSection = () => {
  const [heroData, setHeroData] = useState(placeholderHeroData);
  const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     // Use your actual API endpoint here
//     const apiUrl = 'https://api.example.com/hero-data';
    
//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch hero data');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setHeroData(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

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
            <img src={heroSet.heroImg} alt={`Hero ${i + 1}`} />
            <div className={`Asset ${i === currentIndex ? 'active' : ''}`} >
              <img src={heroSet.assetImg} alt={`Asset ${i + 1}`} />
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