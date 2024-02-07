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
                    navigate('/');

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

    useEffect(() => {
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
    }, [userData, donations]);
    

   
    console.log(people[0]?.data.id);

   


    const totalPages = Math.ceil(people.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPeople = people.slice(startIndex, endIndex);

    return (
      <>
        <section className='User'>
            <div className='Containers'>

                <table className='InfoTable'>

                    <thead>
                        <tr>
                            <th>الاسم</th>
                                {/*    <th>Mother Name</th> */}
                            <th>العمر</th>
                            <th>الجنس</th>
                                {/*    <th>Phone Number</th> */}
                            <th>معلومات</th>
                                {/*    <th>Address</th> */}
                                {/*   <th>Status</th> */}
                            {people.some(person => person.data.monthly_need !== null) && <th>Monthly Need</th>}
                            {people.some(person => person.data.name_of_school !== null) && <th>الجامعة</th>}
                            {people.some(person => person.data.Educational_level !== null) && <th>الدراسة</th>}
                           

                        </tr>
                    </thead>

                    <tbody>
                        {currentPeople.map((person) => (
                            <tr key={person.data.id}>
                                <td>{person.data.full_name}</td>
                                {/*   <td>{person.mother_name}</td> */}
                                <td>{person.data.age}</td>
                                   <td>{person.data.gender}</td>
                               {/* <td>{person.phone_number}</td> */}
                                <td>{person.data.overview}</td>
                                {/* <td>{person.address}</td> */}
                             {/*   <td>{person.status === 0 ? 'Not Sponsored' : 'Sponsored'}</td> */}
                                {people.some((p) => p.data.monthly_need !== null) && <td>{person.data.monthly_need || '-'}</td>}
                                {people.some((p) => p.data.name_of_school !== null) && <td>{person.data.name_of_school || '-'}</td>}
                                {people.some((p) => p.data.Educational_level !== null) && <td>{person.data.Educational_level || '-'}</td>}


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
