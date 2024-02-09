import { useEffect, useState } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/User/UserProfile.css'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const OrgNotifications = () => {
  const [people, setPeople] = useState([]);
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [editTrigger, setEditTrigger] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [newMessage, setNewMessage] = useState({});

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

        const donationsResponse = await fetch(`http://localhost:8000/api/get_all_donations_for_charity/${userData?.id}`);

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

  const openAddModal = (donation) => {
    setSelectedDonation(donation);
    setIsAddModalOpen(true);
  };


 

  const handleAddSubmit = async (e,donation) => {
    e.preventDefault();
console.log('fdfd')
    try {
      const formData = new FormData();

      formData.append('message', newMessage.message);
      formData.append('user_id', donation?.users_id);
      formData.append('Beneficiaries_id', donation?.Beneficiaries_id);
      formData.append('charity_id', userData?.id);

   

      const response = await fetch('http://localhost:8000/api/send_message', {
        method: 'POST',
        body: formData,
      });

      console.log('Add Record Response:', response);

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      setNewMessage({
        message: '',
        user_id: '',
        charity_id: '',
        Beneficiaries_id: '',
     
      });

      setUpdateTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };




 






  const totalPages = Math.ceil(donations.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDonation = donations.slice(startIndex, endIndex);

  return (
    <section className='User'>
      <div className='UContainers'>

        <table className='UInfoTable'>

          <thead>
            <tr>
              <th>الخدمة</th>
              <th>التفاصيل</th>
              <th>المبلغ</th>
              <th>الاسم</th>
              <th>اجراء</th>



            </tr>
          </thead>

          <tbody>
            {currentDonation.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.service}</td>
                <td>{donation.overview}</td>
                <td>{donation.total_amount_of_donation}</td>
                <td>{donation.Beneficiaries_name}</td>

                <td>
                  <button className='EditB' onClick={()=>openAddModal(donation)}>ارسال رسالة</button>


                </td>



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
      {/* add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Add Modal"
        className="Modal"
      >
        <h2 className='Add'>  ارسال رسالة  </h2>

        <form onSubmit={(e) => handleAddSubmit(e, selectedDonation)}>
          <div>
            <label style={{ color: 'black' }}>
               الرسالة:
            </label>
            <input
              type="text-box"
              value={newMessage.message || ''}
              onChange={(e) => setNewMessage((prev) => ({ ...prev, message: e.target.value })) }
            />
          </div>
         
          <div className='TwoButtons'>
            <button onClick={() => setIsAddModalOpen(false)} className='cancel'>إلغاء</button>
            <button type="submit" className='create'>إضافة</button>
          </div>
        </form>
      </Modal>



      
    </section>
  )
}

export default OrgNotifications
