import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminHomePage.css'
const AdminHomePage = () => {
  const [userData, setUserData] = useState(null);
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

  return (
    <>
          <section className='Admin'>
        <div className='CardsContainer'>

          <NavLink id='nav' to='/admin/services'>

                  <div className='Card'>
            <h2>الخدمات</h2>
            <div className='Blackline'></div>
            <h3>22</h3>
            </div>
          </NavLink>

          <NavLink id='nav' to='/admin/charities'>

        <div className='Card'>
          <h2>الجمعيات</h2>
          <div className='Blackline'></div>
          <h3>11</h3>
              </div>
          </NavLink>

          <NavLink id='nav' to='/admin/users'>
          <div className='Card'>
            <h2>المستخدمين</h2>
            <div className='Blackline'></div>
            <h3>12</h3>
            </div>
              </NavLink>
              <NavLink id='nav' to='/admin/donations'>

          <div className='Card'>
            <h2>التبرعات</h2>
            <div className='Blackline'></div>
            <h3>13</h3>
              </div>
            </NavLink>

              <NavLink id='nav' to='/admin/beneficiars'>

          <div className='Card'>
            <h2>الأشخاص</h2>
            <div className='Blackline'></div>
            <h3>13</h3>
                </div>
          </NavLink>

                <NavLink id='nav' to='/admin/products'>

          <div className='Card'>
            <h2>الأغراض</h2>
            <div className='Blackline'></div>
            <h3>13</h3>
                  </div>
          </NavLink>

                  <NavLink id='nav' to='/admin/hero'>

          <div className='Card'>
            <h2>الهيرو</h2>
            <div className='Blackline'></div>
            <h3>13</h3>
                    </div>
          </NavLink>

                    <NavLink id='nav' to='/admin/messages'>

          <div className='Card'>
            <h2>الرسائل</h2>
            <div className='Blackline'></div>
            <h3>13</h3>
            </div>
          </NavLink>

        </div>
              <AdminSidebar />
          </section>
          
    </>
  )
}

export default AdminHomePage
