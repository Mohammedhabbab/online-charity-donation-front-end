import './index.css';
import Background from '../../Assets/div-1.jpg';
import RayehLogo from '../../Assets/RayehL.png';
import * as React from 'react';

const Header = () => {
  
  return (
    <div>
      <div id='top-bar' style={{ position: 'fixed'  }}>
        <img src={RayehLogo} alt='r-logo' id='logo' />
        <div className='wrapper'>
          <a href =''><button>HOME</button></a>
          <a href ='#ABOUT'><button>ABOUT US</button></a> 
          <a href ='#Ser'><button>SERVICES</button></a>
          <button>PORTFOLIO</button>
          <button>CLIENTS</button>
          <button>CONTACT US</button>
        </div>
      </div>
      <img src={Background} alt='div-1.jpg' id='background' />
      <p id='Digital'>
        <ul>DIGITAL MARKETING</ul>
      </p>
      <p id='slogan'>The Sky is the limit</p>
      <p id='make'>We Make Your </p>
      <p id='brand'>BRAND</p>
      <p id='impact'>More Impactful</p>
    </div>
  );
};

export default Header;