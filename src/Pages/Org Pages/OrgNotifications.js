import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/OrgNotifications.css';

const OrgNotifications = () => {
  const [recentStatusChanges, setRecentStatusChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentStatusChanges = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching recent status changes
        const response = await fetch('http://localhost:8000/api/get_Beneficiaries');
        if (response.ok) {
          const data = await response.json();
          setRecentStatusChanges(data);
        } else {
          console.error('Failed to fetch recent status changes:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentStatusChanges();
  }, []); // Trigger the effect on component mount

  const handleRemoveBeneficiary = (id) => {
    setRecentStatusChanges((prev) => prev.filter((beneficiary) => beneficiary.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter beneficiaries with recent status changes (from 0 to 1 or 1 to 0)
  const filteredRecentStatusChanges = recentStatusChanges.filter(
    (beneficiary) =>
      (beneficiary.status === 1 && beneficiary.prev_status === 0) || // Changed from 0 to 1
      (beneficiary.status === 0 && beneficiary.prev_status === 1)    // Changed from 1 to 0
  );

  return (
    <>
      <section className='OrgNotifications'>
        <div className='NContainer'>
          <h2>Recent Status Changes</h2>
          <table className='InfoTable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Needy Type</th>
                <th>New Status</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecentStatusChanges.map((beneficiary) => (
                <tr key={beneficiary.id}>
                  <td>{beneficiary.id}</td>
                  <td>{beneficiary.full_name}</td>
                  <td>{beneficiary.needy_type}</td>
                  <td>{beneficiary.status === 1 ? 'Sponsored' : 'Not Sponsored'}</td>
                  <td>{beneficiary.updated_at}</td>
                  <td>
                    <button onClick={() => handleRemoveBeneficiary(beneficiary.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SideBar />
      </section>
    </>
  );
};

export default OrgNotifications;
