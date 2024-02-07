import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import '../../Components/Admin/AdminHomePage.css';

const AdminHomePage = () => {
  const [counts, setCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/404');
          return;
        }

        const urls = [
          '/user-count',
          '/charity-count',
          '/service-count',
          '/beneficiary-count',
          '/archive-count',
          '/needs-count',
          '/heros-count',
          '/complains-count'
        ];

        const requests = urls.map(url =>
          fetch(`http://localhost:8000/api${url}`, {
            headers: {
              Authorization: 'Bearer ' + authToken,
            },
          })
        );

        const responses = await Promise.all(requests);
        const countsData = await Promise.all(responses.map(response => response.json()));

        // Extract count data from the response and create a new object
        const newCounts = {};
        countsData.forEach((data, index) => {
          // Get the count from the response data
          const count = data[Object.keys(data)[0]]; 
          newCounts[urls[index]] = count;
        });

        setCounts(newCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchCounts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
          <section className='Admin'>
        <div className='CardsContainer'>

          <NavLink id='nav' to='/admin/services'>
            <div className='Card'>
              <h2>الخدمات</h2>
              <div className='Blackline'></div>
              <h3>{counts['/service-count']}</h3>
            </div>
          </NavLink>

          <NavLink id='nav' to='/admin/charities'>
            <div className='Card'>
              <h2>الجمعيات</h2>
              <div className='Blackline'></div>
              <h3>{counts['/charity-count']}</h3>
            </div>
          </NavLink>

          <NavLink id='nav' to='/admin/users'>
            <div className='Card'>
              <h2>المستخدمين</h2>
              <div className='Blackline'></div>
              <h3>{counts['/user-count']}</h3>
            </div>
          </NavLink>

          <NavLink id='nav' to='/admin/donations'>
            <div className='Card'>
              <h2>التبرعات</h2>
              <div className='Blackline'></div>
              <h3>{counts['/archive-count']}</h3>
            </div>
          </NavLink>

          <NavLink id='nav' to='/admin/beneficaries'>
            <div className='Card'>
              <h2>الأشخاص</h2>
              <div className='Blackline'></div>
              <h3>{counts['/beneficiary-count']}</h3>
            </div>
          </NavLink>

                <NavLink id='nav' to='/admin/needs'>

          <div className='Card'>
            <h2>الأغراض</h2>
            <div className='Blackline'></div>
              <h3>{counts['/needs-count']}</h3>
                  </div>
          </NavLink>

                  <NavLink id='nav' to='/admin/hero'>

          <div className='Card'>
            <h2>الهيرو</h2>
            <div className='Blackline'></div>
              <h3>{counts['/heros-count']}</h3>
                    </div>
          </NavLink>

                    <NavLink id='nav' to='/admin/messages'>

          <div className='Card'>
            <h2>الرسائل</h2>
            <div className='Blackline'></div>
              <h3>{counts['/complains-count']}</h3>
            </div>
          </NavLink>

        </div>
              <AdminSidebar />
          </section>
          
    </>
  )
}

export default AdminHomePage
