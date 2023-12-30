import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../Components/Person/PersonCard';
import '../../Components/Person/People.css';

const ServicePageShape1 = () => {
    const { serviceUrl } = useParams();
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_beneficiar');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data); // Log the data to the console
                setPeople(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log(serviceUrl)
    const lowercasedServiceUrl = serviceUrl?.toLowerCase();
    const filteredBenf = people.filter(
        (person) => person.needy_type.toLowerCase() === lowercasedServiceUrl
    );

    if (!filteredBenf) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <div className="Container">
                <p className='paragraph'>تبرع من أجل مستقبل أفضل</p>
                <div className='beigeBar'></div>
                <div className='Cards'>
                    {filteredBenf.map((person) => (
                        <Card key={person.id} {...person} />
                    ))}
                </div>
            </div>
        </>
    );
};
    export default ServicePageShape1;
