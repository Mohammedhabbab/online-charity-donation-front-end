import React, { useState, useEffect } from 'react';

import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/org.css';

const OrganizationProfile = () => {
  const [benfData, setBenfData] = useState([]);
  const [sponBenfData, setSponBenfData] = useState([]);
  const [notSponBenfData, setNotSponBenfData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState(null);




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
        if (userData && service) {
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
  }, [userData, services]);



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
                    <p>{calculatePercentage(notSponBenfData[index]?.beneficiaries.length || 0, benfData[index]?.beneficiaries.length || 0)} تم التبرع لهم</p>
                    <p>{calculatePercentage(sponBenfData[index]?.beneficiaries.length || 0, benfData[index]?.beneficiaries.length || 0)} لم يتم التبرع لهم</p>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
        <SideBar />
      </section>
    </>
  );
};
export default OrganizationProfile;