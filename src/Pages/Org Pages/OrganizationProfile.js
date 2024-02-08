import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/org.css';

const OrganizationProfile = () => {
  const [benfData, setBenfData] = useState([]);
  const [sponBenfData, setSponBenfData] = useState([]);
  const [notSponBenfData, setNotSponBenfData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [product, setProducts] = useState([]);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          setUserData(null);
          setIsLoading(false);
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
          navigate('/sign');
          throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setUserData(userData);
  

          const servicesResponse = await fetch('http://localhost:8000/api/get_services');

          if (!servicesResponse.ok) {
            throw new Error(`Failed to fetch services data. Status: ${servicesResponse.status}`);
          }

          const servicesData = await servicesResponse.json();
          setServices(servicesData || []);
          setChanged(true);

       


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


 
  useEffect(() => {
    const fetchBeneficiaryData = async (service) => {

    
      try {
        if (userData && (service.shape === 0)) {
          const benfUrl = `http://localhost:8000/api/get_beneficiaries/${userData.id}/${service.url}`;
          const sponBenfUrl = `http://localhost:8000/api/get_sponsored_beneficiaries/${userData.id}/${service.url}`;
          const notSponBenfUrl = `http://localhost:8000/api/get_notsponsored_beneficiaries/${userData.id}/${service.url}`;

          const [benfResponse, sponBenfResponse, notSponBenfResponse] = await Promise.all([
            fetch(benfUrl),
            fetch(sponBenfUrl),
            fetch(notSponBenfUrl),
         
         
          ]);

          const benfData = await (benfResponse.ok ? benfResponse.json() : { beneficiaries: [] });
          setBenfData((prev) => [...prev, benfData]);

          const sponBenfData = await (sponBenfResponse.ok ? sponBenfResponse.json() : { beneficiaries: [] });
          setSponBenfData((prev) => [...prev, sponBenfData]);

          const notSponBenfData = await (notSponBenfResponse.ok ? notSponBenfResponse.json() : { beneficiaries: [] });
          setNotSponBenfData((prev) => [...prev, notSponBenfData]);
          
          
       
        }
      } catch (error) {
        console.error('Error fetching beneficiary data:', error);
      }
    };

    services.forEach((service) => {
      fetchBeneficiaryData(service);
      
    });
  }, [changed]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDataArray = [];

        for (const service of services) {
          if (userData && service.shape !== 0) {
            const proData = `http://localhost:8000/api/products/${service.url}/${userData.id}`;
            const productDataResponse = await fetch(proData);
            const productData = await (productDataResponse.ok ? productDataResponse.json() : { products: [] });

            productDataArray.push(productData);
          } else {
            productDataArray.push({ products: [] });
          }
        }

        setProductData(productDataArray);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [changed]);

 
  const calculateTotalItemCount = (items) => {
    return items && items.length > 0 ? items.reduce((total, item) => total + (item.total_count || 0), 0) : 0;
  };

  const calculateTotalItemAvailable = (items) => {
    return items && items.length > 0 ? items.reduce((total, item) => total + (item.available_count || 0), 0) : 0;
  };

  const calculateTotalItemRemaining = (items) => {
    return items && items.length > 0 ? items.reduce((total, item) => total + (item.remaining_count || 0), 0) : 0;
  };


   

   
 



  console.log('product', productData)





 
  const calculatePercentage = (value, total) => {
    return total !== 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
  };
  const handleSegmentClick = (index) => {
    setSelectedSegment(index);
  };
  return (
    <>
      <section className='Full-Org'>
        <div className='Org'>
          {services.map((service, index) => (
         
            <div className='Org-Container' key={service.id}>
             
              <span>{service.title}</span>
              {service.shape === 0 ? (
                <>
              <div className='Org-Services' key={index}>
                <p>عدد الأخاص الكلي في هذه الفئة: {benfData[index]?.beneficiaries.length || 0}</p>
                <p>عدد الأخاص الذي تم التبرع لهم في هذه الفئة: {sponBenfData[index]?.beneficiaries.length || 0}</p>
                <p>عدد الأخاص الذي لم يتم التبرع لهم بعد في هذه الفئة: {notSponBenfData[index]?.beneficiaries.length || 0}</p>
              </div>
              <div className='Pie-Chart'>
                <div className='Simplified-Pie-Chart' key={`simplified-pie-chart-${index}`}
                  style={{ '--sponsored-percentage': calculatePercentage(sponBenfData[index]?.beneficiaries.length || 0, benfData[index]?.beneficiaries.length || 0) }}
                  onClick={() => handleSegmentClick(index)}>
                </div>

                {selectedSegment === index && (
                  <div className='PopUp'>
                 
                    <p>إحصائيات {service.title}</p>
                    <p>{calculatePercentage(notSponBenfData[index]?.beneficiaries.length || 0, benfData[index]?.beneficiaries.length || 0)}لم يتم التبرع لهم</p>
                    <p>{calculatePercentage(sponBenfData[index]?.beneficiaries.length || 0, benfData[index]?.beneficiaries.length || 0)} تم التبرع لهم</p>
                  </div>
                )}
                  </div>
                  </>
                  ) : (
                  <>
                  
                   <div className='Org-Services' key={index}>
                     
                      <p>عدد السلع الكلي في هذه الفئة:{calculateTotalItemCount(productData[index])}</p>
                      <p>عدد السلع التي تم الحصول عليها:{calculateTotalItemAvailable(productData[index])} </p> 
                      <p>عدد السلع التي لم يتم الحصول عليها بعد:{calculateTotalItemRemaining(productData[index])} </p> 
                    </div>
                    
                    <div className='Pie-Chart'>
                      <div className='Simplified-Pie-Chart' key={`simplified-pie-chart-${index}`}
                        style={{ '--sponsored-percentage': calculatePercentage(calculateTotalItemAvailable(productData[index]) || 0, calculateTotalItemCount(productData[index]) || 0) }}
                        onClick={() => handleSegmentClick(index)}>
                            
                      </div>

                      {selectedSegment === index && (
                        <div className='PopUp'>

                          <p>إحصائيات {service.title}</p>
                          <p>{calculatePercentage(calculateTotalItemRemaining(productData[index]) || 0, calculateTotalItemCount(productData[index]) || 0)} لم يتم الحصول عليه بعد </p>
                          <p>{calculatePercentage(calculateTotalItemAvailable(productData[index]) || 0, calculateTotalItemCount(productData[index]) || 0)}  تم الحصول عليه</p>
                        </div>
                      )}
                    </div>
                  </>
                    
                  )
                }
           
            </div>
          ))}

        </div>
        <SideBar />
      </section>
    </>
  );
};
export default OrganizationProfile;