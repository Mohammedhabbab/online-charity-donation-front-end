import {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import img from '../images/dmitry-ratushny-xsGApcVbojU-unsplash.jpg'
import '../Components/Home.css'
const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
   
    fetch('/api/') 
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  let paymentPercentage = 0;
  if (data) {
    paymentPercentage = (data.payed / data.totalCost) * 100;
  }

  return (
    <>
      <Navbar />
      <section className="New">
        {data && (
          <div className="circle-loader">
            <div className="circle">
              <svg width="100" height="100">
                <circle cx="50" cy="50" r="45" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  style={{
                    strokeDasharray: `${paymentPercentage}, 283`,
                  }}
                />
              </svg>
              <div className="loader-text">{paymentPercentage}%</div>
            </div>
            <div className="payment-info">
              <div>
                <img src={img} alt="name" id="hero-pic" style={{ width: '70%' }} />
              </div>
              <div style={{ width: '30%' }}>
                <h3 id="W1">{data.name}</h3>
                <p>Total Cost: {data.totalCost}</p>
                <p>Payed Until Now: {data.payed}</p>
              </div>
            </div>
          </div>
        )}
      </section>
     
      <section className='Hero'>
        <img src={img} alt='name' id='hero-pic' />
        <h3 id='W1'> We Rise</h3>
                            <h3 id='W2'>By Lifting Others</h3>
      </section>
       <section id="services-section">
        services
      </section>
     
      </>
  )
}

export default Home