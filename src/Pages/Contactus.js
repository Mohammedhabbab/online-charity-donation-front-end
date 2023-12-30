import React, { useState } from 'react';

import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'; // Import icons for location and email
import BackContactImage from '../Components/images/Back.jpg'
import '../Components/ContactUs/Contactus.css';
import ContactUsMap from '../Components/ContactUs/ContactUsMap';

const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with:', { name, email, problem, message });
    fetch('http://localhost:8000/api/insert_complain', {
       method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     name:name,
      email:email,
      problem:problem,
      message:message,

    }),
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        
      });
   
    setName('');
    setEmail('');
    setProblem('');
    setMessage('');
  };
  
  
  const position = [33.4913, 36.2983];

  return (
    <>
        <div>
      <div style={{ backgroundImage: `url(${BackContactImage})` }} className='BackgroundImage'>
    
      <div className="contact-container"> 
        <body>
    <img className='BackgroundImage' src={BackContactImage} alt=''></img>
        
         <div className='container' >
          <div className="contact-info">
            <div className="contact-info-item">
              <FaMapMarkerAlt className="contact-info-icon" />
              <a href="https://www.google.com/maps?q=33.4913,36.2983" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                <span>Syria.Damascus.AlMidan</span>
              </a>
            </div>
            <div className="contact-info-item">
              <FaEnvelope className="contact-info-icon" />
              <a href="mailto:OCD.@GMAIL.COM" style={{ color: 'black' }}>OCD@GMAIL.COM</a>
            </div>
          </div>
         
          <form onSubmit={handleSubmit} className="contact-form" dir="rtl">
            <p className="form-description animated-fade-in">
              يرجى ملئ الطلب لكي نعلم ماهي مشكلتكم والتواصل معكم وحلها بأسرع وقت
              نحن هنا لندعم بعض لأننا متحدين نقف متفرقين نسقط
            </p>
            <label htmlFor="name">الاسم:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">البريد الإلكتروني:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="problem">المشكلة:</label>
            <input
              type="text"
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            />
            <label htmlFor="message">الرسالة:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">إرسال</button>
          </form>
          <ContactUsMap position={position} />
          </div>
      </body>
     </div>
     </div>
     </div>
      
    </>
  );
};

export default Contactus;
