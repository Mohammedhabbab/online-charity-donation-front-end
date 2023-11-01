import './index.css';
import * as React from 'react';
import Background from '../../Assets/Aboutus.jpg';
import Services from '../../Assets/Services.jpg';

const Body = () => {
  const [showMission, setShowMission] = React.useState(false);
  const [showDrive, setShowDrive] = React.useState(false);
  const [showWay, setShowWay] = React.useState(false);
  const [showCreativity, setShowCreativity] = React.useState(false);
  const [showBox, setShowBox] = React.useState(false);
  const [showVission, setVission] = React.useState(false);
  const [showMulti, setMulti] = React.useState(false);
  const [showExt, setExt] = React.useState(false);
  React.useEffect(() => {
    const missionTimeout = setTimeout(() => setShowMission(true), 3000);
    const driveTimeout = setTimeout(() => setShowDrive(true), 4000);
    const wayTimeout = setTimeout(() => setShowWay(true), 5000);
    const creativityTimeout = setTimeout(() => setShowCreativity(true),6000);
    const boxTimeout = setTimeout(() => setShowBox(true),7000);
    const VissionTimeout = setTimeout(() => setVission(true),8000);
    const MultiTimeout = setTimeout(() => setMulti(true),9000);
    const ExtTimeout = setTimeout(() => setExt(true),10000);

    return () => {
      clearTimeout(missionTimeout);
      clearTimeout(driveTimeout);
      clearTimeout(wayTimeout);
      clearTimeout(creativityTimeout);
      clearTimeout(boxTimeout);
      clearTimeout(VissionTimeout);
      clearTimeout(MultiTimeout);
      clearTimeout(ExtTimeout);
    };
  }, []);

  return (
    <div>
      <img src={Background} alt='div-1.jpg' id='background' />
      <p id='ABOUT'>ABOUT </p>
      <p id='RAYEH'>RAYEH </p>
      <p id='WHAT'> WHAT IS RAYEH ?</p>
      <p id='ambitious'>    “A group of ambitious Marketers,<br></br>
                            Designers, Photographers & Copy Writers<br></br>
                            aiming to leave their mark on the<br></br>
                            Marketing and Advertising business <br></br>Domain ”</p>
      <p id='mission'>{showMission && 'OUR MISSION'}</p>
      <p id='Drive'>{showDrive && 'To Drive Quality.'}</p>
      <p id='Way'>{showWay && 'Perfect Way Job.'}</p>
      <p id='Creativity'>{showCreativity && 'Creativity.'}</p>
      <p id='Box'>{showBox && 'Think Outside the Box .'}</p>
      <p id='Vission'>{showVission && 'Our Vission'}</p>
      <p id='Multi'>{showMulti && 'Multinational Company.'}</p>
      <p id='Ext'>{showExt && 'Extending Outside GCC'}</p>
      <div>
      <img src={Services} alt='Services.jpg' id='Services' />
      <p id='Our'>OUR</p>
      <p id='Ser'>SERVICES</p>
      <p id='marketing'>Marketing</p>

      </div>
    </div>
  );
};

export default Body;
