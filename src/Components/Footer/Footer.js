import React from 'react'
import './Footer.css'
import svg from './Assets/Asset 18.svg'
import logo from './Assets/Asset 1.svg'
const Footer = () => {
  return (
    <footer className='Footer'>
      <div className='Footer-Background'>
        <img src={svg} alt='' />
      </div>
     
      <div className='Footer-Header'>
        <h1>الجمعية الخيرية للتبرع</h1>
        <img src={logo} alt='logo' />
      </div>
      <div className='Footer-Container'>
        <div className='contact'>
          <h2>للتواصل</h2>
</div>
     <div className='bank-info'>
          <h2>الحسابات البنكية</h2>
        </div>
             <div className='address'>
          <h2>العنوان</h2>
</div>
      </div>
      </footer>
  )
}

export default Footer