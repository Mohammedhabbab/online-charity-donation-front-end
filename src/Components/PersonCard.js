  import React, { useState, useEffect } from 'react';
  import '../Components/PersonCard.css'; 

  function Card({ id, image, name, age, description, charity }) {
    return (
      <div className="card">
        <img src={image} alt={name} className="card-image"/>
        <div className="card-details">
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>{description}</p>
          <p>Charity: {charity}</p>
        </div>
      </div>
    );
  }


  function CardContainer() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
/*
    useEffect(() => {
      fetch('YOUR_API_ENDPOINT') 
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCards(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error);
          setIsLoading(false);
        });
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }*/

    return (
      <div className="card-container">
        {cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    );
  }


  export default Card;
