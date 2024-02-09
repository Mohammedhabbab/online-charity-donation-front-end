import { useEffect, useState } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/User/UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserMessages = () => {
    const [messages, setmessages] = useState([]);
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

                const messagesResponse = await fetch(`http://localhost:8000/api/get_user_messages/${userData?.id}`);

                if (!messagesResponse.ok) {
                    throw new Error(`Failed to fetch services data. Status: ${messagesResponse.status}`);

                }

                const fetchedmessages = await messagesResponse.json();
                setmessages(fetchedmessages.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const totalPages = Math.ceil(messages.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentmessage = messages.slice(startIndex, endIndex);

    return (
        <>
            <section className='User'>
                <div className='UContainers'>
                    <table className='UInfoTable'>
                        <thead>
                            <tr>
                                <th>الرقم التعريفي</th>
                                <th>الرسالة</th>
                                <th>الجمعية</th>
                                <th>رقم التبرع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentmessage.map((message) => (
                                <tr key={message.id}>
                                    <td>{message.id}</td>
                                    <td>{message.message}</td>
                                    <td>{message.charity_id}</td>
                                    <td>{message.Beneficiaries_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {Array.from({ length: totalPages }).map((index) => (
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
};

export default UserMessages;