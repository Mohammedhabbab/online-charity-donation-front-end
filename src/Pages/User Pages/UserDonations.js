import { useEffect, useState } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/User/UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserDonations = () => {
    const [people, setPeople] = useState([]);
    const [donations, setDonations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(30);
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

                const donationsResponse = await fetch(`http://localhost:8000/api/get_all_donations_for_user/${userData?.id}`);

                if (!donationsResponse.ok) {
                    throw new Error(`Failed to fetch services data. Status: ${donationsResponse.status}`);
                }
                const fetchedDonations = await donationsResponse.json();
                const donationsArray = fetchedDonations[""] || [];
                console.log('Fetched Donations:', donationsArray);
                setDonations(donationsArray || []);







            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);










    const totalPages = Math.ceil(donations.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentDonation = donations.slice(startIndex, endIndex);

    return (
        <>
            <section className='User'>
                <div className='Containers'>

                    <table className='InfoTable'>

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
                                <tr key={donation.data.service}>
                                    <td>{donation.data.overview}</td>
                                    <td>{donation.data.total_amount_of_donation}</td>
                                    <td>{donation.data.Beneficiaries_id}</td>





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
        </>
    )
}

export default UserDonations
