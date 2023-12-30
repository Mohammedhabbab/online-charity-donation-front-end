import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const SideBar = () => {
    const [isNavigationActive, setIsNavigationActive] = useState(true);
    const [isServicesVisible, setIsServicesVisible] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

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

    return (
        <>
            <div className={`navigation ${isNavigationActive ? 'active' : ''}`}>
                <ul>
                    <li className='list' onClick={toggleNavigation}>
                        <b></b>
                        <b></b>
                        <NavLink id='nav' to='/org-profile' activeClassName='active' exact>
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
    );
};

export default SideBar;




