import React, { useState, useEffect } from 'react';

import SideBar from '../Components/Sidebar/SideBar';
import '../Components/Org/org.css';
import '../Components/User/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Dynamic/UserContext';

const Profile = () => {
    //charity
    const [benfData, setBenfData] = useState([]);
    const [sponBenfData, setSponBenfData] = useState([]);
    const [notSponBenfData, setNotSponBenfData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [services, setServices] = useState([]);
    
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [product, setProducts] = useState([]);
    //user
    const [people, setPeople] = useState([]);
    const [donations, setDonations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(30);
   //all
    const [user, setUser] = useState(false);
    const [charity, setCharity] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState();
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
                    navigate('/');

                    throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                setUserData(userData);
                if (userData?.type_of_user === 'charity') {


                    const servicesResponse = await fetch('http://localhost:8000/api/get_services');

                    if (!servicesResponse.ok) {
                        throw new Error(`Failed to fetch services data. Status: ${servicesResponse.status}`);
                    }

                    const servicesData = await servicesResponse.json();
                    setServices(servicesData || []);
                    
                    setCharity(true);

                } else if (userData?.type_of_user === 'user') {
                    setUser(true);
                    const donationsResponse = await fetch(`http://localhost:8000/api/get_all_donations_for_user/${userData?.id}`);

                    if (!donationsResponse.ok) {
                        throw new Error(`Failed to fetch services data. Status: ${donationsResponse.status}`);
                    }
                    const fetchedDonations = await donationsResponse.json();
                    const donationsArray = fetchedDonations[""] || [];
                    console.log('Fetched Donations:', donationsArray);
                    setDonations(donationsArray || []);
                }


            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

//charity profile

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
    }, [charity]);

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
    }, [charity, services]);


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


    //user profile 
    
   {/*  useEffect(() => {
        const fetchpeopledata = async () => {
            try {
                const PeopleArray = [];

                for (const donation of donations) {
                    if (userData && donation) {
                        const peopleData = (`http://localhost:8000/api/search_beneficiaries/${donation.Beneficiaries_id}`);
                        const peopleResponse = await fetch(peopleData);
                        const people = await (peopleResponse.ok ? peopleResponse.json() : { peopleinfo: [] });

                        PeopleArray.push(people);
                    } else {
                        PeopleArray.push({ peopleinfo: [] });
                    }
                }

                setPeople(PeopleArray);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchpeopledata();
    }, [user, donations]);



    console.log(people[0]?.data.id);



*/}
    const totalPages = Math.ceil(people.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentDonation = donations.slice(startIndex, endIndex);

    useEffect(() => {
        if (!isLoading && (!userData)) {

            const timeoutId = setTimeout(() => {
                navigate('/404');
            }, 1000);


            return () => clearTimeout(timeoutId);
        }
    }, [isLoading, userData, navigate]);

    if (isLoading) {
        return <div style={{color:'white'}}>Loading...</div>;
    }

    return (
        <>
            {
                userData?.type_of_user === 'charity' ? (
                    <section className='Full-Org'>
                        <div className='Org'>
                            {services.map((service, index) => (

                                <div className='Org-Container' key={service.id}>

                                    <span>{service.title}</span>
                                    {service.shape === 0 ? (
                                        <>
                                            <div className='Org-Services' key={index}>
                                                <p>عدد الأشخاص الكلي في هذه الفئة: {benfData[index]?.beneficiaries.length || 0}</p>
                                                <p>عدد الأشخاص الذي تم التبرع لهم في هذه الفئة: {sponBenfData[index]?.beneficiaries.length || 0}</p>
                                                <p>عدد الأشخاص الذي لم يتم التبرع لهم بعد في هذه الفئة: {notSponBenfData[index]?.beneficiaries.length || 0}</p>
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

                ) : userData?.type_of_user === 'user' ? (
                
               
                            <section className='User'>
                         <div className='UContainers'>

                             <table className='UInfoTable'>

                                    <thead>
                                        <tr>
                                            <th>الخدمة</th>
                                            <th>التفاصيل</th>
                                            <th>المبلغ</th>
                                            <th>الاسم</th>



                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentDonation.map((donation) => (
                                            <tr key={donation.id}>
                                                <td>{donation.service}</td>
                                                <td>{donation.overview}</td>
                                                <td>{donation.total_amount_of_donation}</td>
                                                <td>{donation.Beneficiaries_name}</td>





                                            </tr>
                                        ))}
                                    </tbody>
                             </table>


                             <div>
                                 {Array.from({ length: totalPages }).map((_, index) => (
                                     <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                                         {index + 1}
                                     </button>
                                 ))}
                                </div>
                                </div>
                         <SideBar />

                    </section>
                ) : (navigate('/404'))
                 }   
            


            
           
        </>
    );
};
export default Profile;