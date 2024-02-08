import { React, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../Dynamic/UserContext';

import './Person.css';
import MaleImg from '../Assets/Male.png'
import FemaleImg from '../Assets/Female.png'
import { json } from 'react-router-dom';

function Details({ id, full_name, mother_name, age, gender, monthly_need, address }) {
  const { userData, setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          setUserData(null);
          setIsLoading(false);
          navigate('/404');
          return;
        }

        const userResponse = await fetch('http://localhost:8000/api/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken,
          },
          body: JSON.stringify({}),
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const handleDonate = async () => {
    try {
      if (!userData) {
  console.log('please sign in')
}else{

      const response = await fetch(`http://localhost:8000/api/create-payment/${monthly_need}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });

      console.log('Edit Response:', response);

      if (!response.ok) {
        throw new Error('Failed to edit record');
      }

      response.json().then(data => {
        const url = data.Data.url;

        window.open(url, '_blank');

        const intervalId = setInterval(() => {
          fetch(`http://localhost:8000/api/payment-callback/${data.Data.paymentId}`)
            .then(response => response.json())
            .then(data => {
              if (data.Data.status === 'A') {
                clearInterval(intervalId); // Stop further checks
                // Do something when payment is approved
                console.log('Payment approved:', data);
navigate('./profile')


                try {
                 


                const formData = new FormData();



                formData.append('donater_id', userData.id);
                  formData.append('beneficiar_id', id);
                formData.append('amount', monthly_need);

             



                const insert =  fetch(`http://localhost:8000/api/donate`, {
                  method: 'POST',
                  body: formData,
                });
                console.log('Add Record Response:', insert);
                if (!insert.ok) {
                  throw new Error('Failed to edit record');
                }

             
              } catch (error) {
                console.error('Error editing record:', error);
              }
            




              }
            })
            .catch(error => {
              console.error('Error occurred while checking payment status:', error);
              clearInterval(intervalId); // Stop further checks
            });
        }, 100000); // Check every second
      }).catch(error => {
        console.error("Error occurred while parsing JSON:", error);
      });

      }
    } catch (error) {
      console.error('Error editing record:', error);
    }
  };



  return (
    <div className="person-details-card">
      <div className="person-details-header">
        {gender === 'ذكر' ? (
          <img src={MaleImg} alt="Avatar" className="person-details-avatar" />)
          : (
            <img src={FemaleImg} alt="Avatar" className="person-details-avatar" />
          )}
        <div className="person-details-name-mother">
          <h3 className="person-details-full-name">الاسم:{full_name}</h3>
          <p className="person-details-mother-name">اسم الام: {mother_name}</p>
        </div>
        <p className="person-details-location">العنوان:{address}</p>
      </div>

      <div className="person-details-stats">
        <div className="person-details-stat">
          <span className="person-details-stat-label">العمر</span>
          <span className="person-details-stat-value">{age}</span>

        </div>
        <div className="person-details-stat">
          <span className="person-details-stat-label"> الجنس </span>
          <span className="person-details-stat-value">{gender}</span>
        </div>
        <div className="person-details-stat">
          <span className="person-details-stat-label">الاحتياج الشهري</span>
          <span className="person-details-stat-value">{monthly_need}</span>

        </div>
      </div>
      <button className="person-details-about-button" onClick={handleDonate} >تبرع</button>
    </div>
  );
}

export default Details;
