import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/OrgServices.css';

const OrgManageShape1 = () => {
    const { serviceUrl } = useParams();
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

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

    
    const lowercasedServiceUrl = serviceUrl?.toLowerCase();
    const filteredService = services.find(
        (service) => service.url.toLowerCase() === lowercasedServiceUrl
    );

    if (!filteredService) {
     
        navigate('/404');
       
        return null;
    }

    return (
        <>
            <section className='Services' key={filteredService.id}>
                <div className='Containers'>
                    <span> {filteredService.title}</span>
                    <label>إضافة طالب علم</label>

                    <p >
                        {filteredService.title},,,,,,{filteredService.url}
                    </p>
                </div>
                <SideBar />
            </section>
        </>
    );
};

export default OrgManageShape1;
