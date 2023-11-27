import React from 'react'
import svg from '../Assets/Asset 14.svg';
import { NavLink } from 'react-router-dom';
const ContactusHomeSection = () => {
  return (
      <section>
          <div className='Contactus'>
              <img src={svg} alt='background' />
              <div className='Contactus-Container'>
          <p>هل لديك بعض الإستفسارات والإقتراحات؟لا تتردد بالتواصل معنا</p>
           < NavLink id='h2'  to="/contactus" >تواصل معنا</NavLink> 
              </div>
          </div>

    </section>
  )
}

export default ContactusHomeSection