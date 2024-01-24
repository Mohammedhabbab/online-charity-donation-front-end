import React from 'react';
import './Person.css'; 

function Details({ id, full_name, mother_name, age, gender, monthly_need, address }) {
  return (
    <div className="person-details-card">
      <div className="person-details-header">
        <img src="path-to-your-image.jpg" alt="Avatar" className="person-details-avatar" />
        <div className="person-details-name-mother">
          <h3 className="person-details-full-name">الاسم:{full_name}</h3>
          <p className="person-details-mother-name">اسم الام: {mother_name}</p>
        </div>
        <p className="person-details-location">العنوان:{address}</p>
      </div>

      <div className="person-details-stats">
        <div className="person-details-stat">
          <span className="person-details-stat-value">{age}</span>
          <span className="person-details-stat-label">العمر</span>
        </div>
        <div className="person-details-stat">
          <span className="person-details-stat-value">{gender}</span>
          <span className="person-details-stat-label">الجنس</span>
        </div>
        <div className="person-details-stat">
          <span className="person-details-stat-value">{monthly_need}</span>
          <span className="person-details-stat-label">الاحتياج الشهري</span>
        </div>
      </div>
      <button className="person-details-about-button">تبرع</button>
    </div>
  );
}

export default Details;
