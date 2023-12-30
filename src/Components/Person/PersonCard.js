import React from 'react';
import './PersonCard.css'; 

function Card({ id, full_anme, address, age, gender, charity_id, status }) {
  return (
    <div className="card">
      <div className="card-header">
        <img src="path-to-your-image.jpg" alt="Avatar" className="avatar" />
        <div className="name-and-check">
          <h3 className="name">{full_anme}</h3>
          {status && <span className="status-check"> Check✔</span>}
        </div>
        <p className="location">{address}</p>
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-value">{age}</span>
          <span className="stat-label">AGE</span>
        </div>
        <div className="stat">
          <span className="stat-value">{gender}</span>
          <span className="stat-label">Gender</span>
        </div>
        <div className="stat">
          <span className="stat-value">{charity_id}</span>
          <span className="stat-label">Charity</span>
        </div>
      </div>
      <button className="About-button">About</button>
    </div>
  );
}

export default Card;
