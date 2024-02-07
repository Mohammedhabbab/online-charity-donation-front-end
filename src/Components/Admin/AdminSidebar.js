import React, { useState, useEffect } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import './AdminSidebar.css';
import { useUser } from '../Dynamic/UserContext';
import MaleImg from '../Assets/Male.png'
import FemaleImg from '../Assets/Female.png'
const AdminSidebar = () => {
    const [isNavigationActive, setIsNavigationActive] = useState(true);
    const [isServicesVisible, setIsServicesVisible] = useState(false);
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

    
   

    const toggleNavigation = () => {
        setIsNavigationActive((prev) => !prev);
        setIsServicesVisible(false);
    };

   

  

   

    return (
    <>
            <div className={`Anavigation ${isNavigationActive ? 'active' : ''}`}>
                <h2>{userData?.full_name}</h2>
                {userData?.gender === 'ذكر' ? (
                    <img src={MaleImg} alt="img" id='MFimg'  />
                    ) : (
                        <img src={FemaleImg} alt="img" id='MFimg' />
 
)  }
            <ul>
                <li className='list' onClick={toggleNavigation}>
                    <b></b>
                    <b></b>
                    <NavLink id='nav' to='/admin/dashboard' activeClassName='active' exact>
                        <span className='icon'>
                            <ion-icon name='home-outline'></ion-icon>
                        </span>
                        <span className='title'>الرئيسية</span>
                    </NavLink>
                </li>
               
                
                <li className='list' onClick={toggleNavigation}>
                    <NavLink id='nav' to='/admin/services' activeClassName='active'>
                        <span className='icon'>
                                <ion-icon name="storefront-outline"></ion-icon>                        </span>
                        <span className='title'>الخدمات</span>
                    </NavLink>
                    </li>
                    <li className='list' onClick={toggleNavigation} >
                        <NavLink id='nav' to='/admin/donations' activeClassName='active' >
                            <span className='icon'>
                                <ion-icon name='server-outline'></ion-icon>
                            </span>
                            <span className='title'>التبرعات</span>
                        </NavLink>
                    </li>
                    <li className='list' onClick={toggleNavigation}>
                        <NavLink id='nav' to='/admin/charities' activeClassName='active'>
                            <span className='icon'>
                                <ion-icon name="business-outline"></ion-icon>                            </span>
                            <span className='title'>الجمعيات</span>
                        </NavLink>
                        
                    </li>  
                    <li className='list' onClick={toggleNavigation}>
                        <NavLink id='nav' to='/admin/beneficaries' activeClassName='active'>
                            <span className='icon'>
                                <ion-icon name="people-outline"></ion-icon>                            </span>
                            <span className='title'>الأشخاص</span>
                        </NavLink>
                        
                    </li> 

                    <li className='list' onClick={toggleNavigation}>
                        <NavLink id='nav' to='/admin/needs' activeClassName='active'>
                            <span className='icon'>
                                <ion-icon name="medkit-outline"></ion-icon>                            </span>
                            <span className='title'>الأغراض</span>
                        </NavLink>

                    </li> 

                    <li className='list' onClick={toggleNavigation}>
                        <NavLink id='nav' to='/admin/users' activeClassName='active'>
                            <span className='icon'>
                                <ion-icon name='person-outline'></ion-icon>
                            </span>
                            <span className='title'>المستخدمين</span>
                        </NavLink>
                    </li>  
                    <li className='list' onClick={toggleNavigation}>
                        <NavLink id='nav' to='/admin/messages' activeClassName='active'>
                            <span className='icon'>
                                <ion-icon name="mail-outline"></ion-icon>                            </span>
                            <span className='title'>الرسائل</span>
                        </NavLink>
                    </li> 
                <li className='list' onClick={toggleNavigation}>
                    <NavLink id='nav' to='/admin/manage-account' activeClassName='active'>
                        <span className='icon'>
                            <ion-icon name='person-circle-outline'></ion-icon>
                        </span>
                        <span className='title'>إدارة الحساب</span>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className={`AToggle ${isNavigationActive ? 'active' : ''}`} onClick={toggleNavigation}>
            <ion-icon name='menu-outline' class='open'></ion-icon>
            <ion-icon name='close-outline' class='close'></ion-icon>
        </div>
        </>
    );
};

export default AdminSidebar
