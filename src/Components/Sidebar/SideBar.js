import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useService } from '../Dynamic/ServiceContext';
import { useUser } from '../Dynamic/UserContext';
import MaleImg from '../Assets/Male.png'
import FemaleImg from '../Assets/Female.png'
const SideBar = () => {
    const [isNavigationActive, setIsNavigationActive] = useState(true);
    const [isServicesVisible, setIsServicesVisible] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const { userData, setUserData } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const { setServiceS } = useService();
    
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

    const toggleServices = () => {
        setIsServicesVisible((prev) => !prev);
    };

    const selectService = (serviceId) => {
        setSelectedService(serviceId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_services');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const brElements = Array.from({ length: services.length }, (_, index) => (
        <br key={`br-${index}`} />
    ));

    const handleClick = (shape) => {
        const selectedServiceS = { shape };
        setServiceS(selectedServiceS);
    };

    return (
        <>
            {userData?.type_of_user === 'user' ? (
                <>
                    <div className={`navigation ${isNavigationActive ? 'active' : ''}`}>
                        <h2>{userData?.full_name}</h2>
                        {userData?.gender === 'ذكر' ? (
                            <img src={MaleImg} alt="img" id='MFimg'/>
                        ) : (
                                <img src={FemaleImg} alt="img" id='MFimg' />

                        )}
                        <br></br>
                        <br></br>
                        <ul>
                            <li className='list' onClick={toggleNavigation}>
                                <b></b>
                                <b></b>
                                <NavLink id='nav' to='/profile' activeClassName='active' exact>
                                    <span className='icon'>
                                        <ion-icon name='home-outline'></ion-icon>
                                    </span>
                                    <span className='title'>الرئيسية</span>
                                </NavLink>
                            </li>
                            <li className={`list ${isServicesVisible ? 'active' : ''}`} onClick={toggleServices}>
                                <NavLink id='nav' to='/user-donations' activeClassName='active' exact>
                                    <span className='icon'>
                                        <ion-icon name='server-outline'></ion-icon>
                                    </span>
                                    <span className='title'>التبرعات</span>
                                </NavLink>
                            </li>
                            {isServicesVisible && brElements}
                            <li className='list' onClick={toggleNavigation}>
                                <NavLink id='nav' to='/user-notifications' activeClassName='active'>
                                    <span className='icon'>
                                        <ion-icon name='notifications-outline'></ion-icon>
                                    </span>
                                    <span className='title'>الرسائل</span>
                                </NavLink>
                            </li>
                            <li className='list' onClick={toggleNavigation}>
                                <NavLink id='nav' to='/user-manage-account' activeClassName='active'>
                                    <span className='icon'>
                                        <ion-icon name='person-circle-outline'></ion-icon>
                                    </span>
                                    <span className='title'>إدارة الحساب</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={`Toggle ${isNavigationActive ? 'active' : ''}`} onClick={toggleNavigation}>
                        <ion-icon name='menu-outline' class='open'></ion-icon>
                        <ion-icon name='close-outline' class='close'></ion-icon>
                    </div>
                </>
            ) : (
                <>
                        <div className={`navigation ${isNavigationActive ? 'active' : ''}`}>
                            <h2>{userData?.full_name}</h2>
                           
                        <ul>
                            <li className='list' onClick={toggleNavigation}>
                                <b></b>
                                <b></b>
                                <NavLink id='nav' to='/profile' activeClassName='active' exact>
                                    <span className='icon'>
                                        <ion-icon name='home-outline'></ion-icon>
                                    </span>
                                    <span className='title'>الرئيسية</span>
                                </NavLink>
                            </li>
                            <li className={`list ${isServicesVisible ? 'active' : ''}`} onClick={toggleServices}>
                                <div id='nav'>
                                    <span className='icon'>
                                        <ion-icon name='server-outline'></ion-icon>
                                    </span>
                                    <span className='title'>إدارة الخدمات</span>
                                </div>
                                <ul className={`services-list ${isServicesVisible ? 'active' : ''}`}>
                                    {services.map((service) => (
                                        <li
                                            key={service.id}
                                            className={`list ${selectedService === service.id ? 'active' : ''}`}
                                            onClick={() => handleClick(service.shape)}
                                        >
                                            <NavLink
                                                id='nav2'
                                                to={`/org-profile/manage/${service.url}`}
                                                onClick={() => selectService(service.id)}
                                            >
                                                <span className='icon'>
                                                    {service.shape === 0 ? (
                                                        <ion-icon name="accessibility-outline"></ion-icon>
                                                    ) : (
                                                        <ion-icon name="cart-outline"></ion-icon>
                                                    )}
                                                </span>
                                                <span className='title'>{service.title}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {isServicesVisible && brElements}
                            <li className='list' onClick={toggleNavigation}>
                                <NavLink id='nav' to='/org-notifications' activeClassName='active'>
                                    <span className='icon'>
                                        <ion-icon name='notifications-outline'></ion-icon>
                                    </span>
                                    <span className='title'>الرسائل</span>
                                </NavLink>
                            </li>
                            <li className='list' onClick={toggleNavigation}>
                                <NavLink id='nav' to='/org-manage-account' activeClassName='active'>
                                    <span className='icon'>
                                        <ion-icon name='person-circle-outline'></ion-icon>
                                    </span>
                                    <span className='title'>إدارة الحساب</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={`Toggle ${isNavigationActive ? 'active' : ''}`} onClick={toggleNavigation}>
                        <ion-icon name='menu-outline' class='open'></ion-icon>
                        <ion-icon name='close-outline' class='close'></ion-icon>
                    </div>
                </>
            )}
        </>
    );
};

export default SideBar;
