import React from 'react';
import '../Components/PagesStyles/About.css';
import img from '../Components/images/alex-radelich-rtCfGTI7nCA-unsplash.jpg'
const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="image-container">
          <img src={img} alt="Company" className="company-image" />
        </div>
        <div className="text-container">
          <h2 className="company-name">Ocd</h2>
          <p className="summary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget feugiat libero. Duis ut elit nec nisi
            volutpat accumsan eget sed velit. Proin lacinia facilisis nulla id maximus. Integer nec malesuada lacus, ac
            volutpat lacus.
          </p>
          <p className="summary">
            Nulla facilisi. Morbi quis ligula nec urna volutpat rutrum. Vivamus varius leo et neque ultricies, nec
            viverra odio condimentum. Integer et tortor a lorem sodales accumsan. Suspendisse potenti. Sed non ex nec
            tortor pellentesque malesuada.
          </p>
          <p className="summary">
            Fusce sit amet metus eu ipsum fermentum bibendum. In id turpis vel magna interdum interdum. Proin nec
            dapibus justo, nec ultricies odio. Donec ac varius velit. Duis suscipit mi sed quam dictum, at mollis ante
            auctor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
