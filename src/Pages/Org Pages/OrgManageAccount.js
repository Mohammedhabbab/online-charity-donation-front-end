import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/OrgManageAccount.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

const OrgManageAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [updatedInfo, setUpdatedInfo] = useState({
  
    full_name: '',
    email: '',
   
  });

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setUserData(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/auth/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.pathname]); 

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditFormOpen(false);
  };

  const handleUpdateInfo = async (updatedData) => {
    try {
     
      const response = await fetch('http://localhost:8000/api/update_user', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // If the update is successful, refetch user data
        await fetchData();
        setIsEditFormOpen(false);
      } else {
        // Handle errors or show a notification to the user
        console.error('Failed to update user information:', response.status);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section className="OrgManageAccount">
        <div className="UserInfo">
          <h2>User Information</h2>
          <label>Name:</label>
          <p>{userData.full_name}</p>
          <label>Email:</label>
          <p>{userData.email}</p>
          
          <button className="EditButton" onClick={handleEditClick}>
            Edit Information
          </button>
        </div>
        <SideBar />
      </section>
      

      <Modal
        isOpen={isEditFormOpen}
        onRequestClose={handleCancelEdit}
        contentLabel="Edit Information Modal"
      >
        <div className="ModalContent">
          <h2>Edit Information</h2>
          <label>Name:</label>
          <input
            type="text"
            value={updatedInfo.full_name}
            onChange={(e) => setUpdatedInfo({ ...updatedInfo, full_name: e.target.value })}
          />
          <label>Email:</label>
          <input
            type="text"
            value={updatedInfo.email}
            onChange={(e) => setUpdatedInfo({ ...updatedInfo, email: e.target.value })}
          />
          
          <button onClick={() => handleUpdateInfo(updatedInfo)}>Update Information</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default OrgManageAccount;
