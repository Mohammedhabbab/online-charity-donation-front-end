import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/OrgShape1.css';

const OrgManageShape1 = () => {
    const { serviceUrl } = useParams();

    const [people, setPeople] = useState([]);
    const [service, setService] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(30);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [newPerson, setNewPerson] = useState({});

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
                    throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchServices = fetch('http://localhost:8000/api/get_services');
        const fetchPeople = fetch('http://localhost:8000/api/get_beneficiar');

        Promise.all([fetchServices, fetchPeople])
            .then(async ([servicesResponse, peopleResponse]) => {
                if (!servicesResponse.ok || !peopleResponse.ok) {
                    throw new Error('Failed to fetch services or people');
                }

                const sdata = await servicesResponse.json();
                const data = await peopleResponse.json();

                setService(sdata);
                setPeople(data);
            })
            .catch(error => {
                console.error('Error fetching services and people:', error);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);


    const lowercasedServiceUrl = serviceUrl?.toLowerCase();
    console.log('Lowercased Service URL:', lowercasedServiceUrl);
    const filteredServices = service.find(
        (service) => service.url.toLowerCase() === lowercasedServiceUrl
    );


    const filteredPeople = people
        .filter((person) => person.needy_type.toLowerCase() === lowercasedServiceUrl)
        .filter((person) => person.charity_id === userData?.id);

    console.log('Filtered People:', filteredPeople);
    console.log('People Array:', people);





    const totalPages = Math.ceil(filteredPeople.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPeople = filteredPeople.slice(startIndex, endIndex);

    const openEditModal = (person) => {
        setSelectedPerson(person);
        setIsEditModalOpen(true);
    };

  
    const openAddModal = () => {
        setSelectedPerson(null);
        setIsAddModalOpen(true);
    };

    
    const openDeleteModal = (person) => {
        setSelectedPerson(person);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (editedPerson) => {
        try {
            const response = await fetch(`http://localhost:8000/api/update_Beneficiaries/${editedPerson.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedPerson),
            });

            if (!response.ok) {
                throw new Error('Failed to edit record');
            }

         
            setIsEditModalOpen(false);

         
            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error('Error editing record:', error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const updatedNewPerson = {
                ...newPerson,
                needy_type: lowercasedServiceUrl,
                charity_id: userData?.id,
            };

           
            const headers = getHeaders();
            headers.forEach((header) => {
                if (!(header in updatedNewPerson)) {
                    updatedNewPerson[header] = null;
                }
            });

            console.log('Updated New Person State:', updatedNewPerson);

          
            setNewPerson(updatedNewPerson);

           
            setUpdateTrigger((prev) => !prev);

           
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/register_Beneficiaries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPerson),
                });

                console.log('Add Record Response:', response);

                if (!response.ok) {
                    throw new Error('Failed to add record');
                }

               
                setNewPerson({
                    full_name: '',
                    mother_name: '',
                    age: '',
                    gender: '',
                    phone_number: '',
                    overview: '',
                    address:'',
                    status: 0,
                    monthly_need: '',
                    name_of_school: '',
                    Educational_level: '',
                });

                setUpdateTrigger((prev) => !prev);
            } catch (error) {
                console.error('Error adding record:', error);
            }
        };

     
        if (updateTrigger) {
            fetchData();
        }
    }, [updateTrigger, newPerson]);





    const handleDeleteSubmit = async (personToDelete) => {
        try {
            if (!personToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_Beneficiaries/${personToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete record');
            }

         
            setIsDeleteModalOpen(false);

            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };


   


    useEffect(() => {
        if (!isLoading && (!service || !people || people.length === 0)) {
            
            const timeoutId = setTimeout(() => {
                navigate('/404');
            }, 1000); 

           
            return () => clearTimeout(timeoutId);
        }
    }, [isLoading, service, people, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const getHeaders = () => {
        const headers = Object.keys(filteredPeople[0] || {});
        return headers.filter(header => !['id', 'charity_id', 'needy_type', 'created_at', 'updated_at'].includes(header));
    };
    const headers = getHeaders();



    return (
        <>
            <section className='Services' key={filteredPeople.id}>
                <div className='Containers'>
                    <span key={filteredServices?.id}>{filteredServices?.title}</span>
                    <table className='InfoTable'>

                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Mother Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Overview</th>
                                <th>Address</th>
                                <th>Status</th>
                                {filteredPeople.some(person => person.monthly_need !== null) && <th>Monthly Need</th>}
                                {filteredPeople.some(person => person.name_of_school !== null) && <th>School</th>}
                                {filteredPeople.some(person => person.Educational_level !== null) && <th>Education Level</th>}
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentPeople.map((person) => (
                                <tr key={person.id}>
                                    <td>{person.full_name}</td>
                                    <td>{person.mother_name}</td>
                                    <td>{person.age}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.phone_number}</td>
                                    <td>{person.overview}</td>
                                    <td>{person.address}</td>
                                    <td>{person.status === 0 ? 'Not Sponsored' : 'Sponsored'}</td>
                                    {filteredPeople.some((p) => p.monthly_need !== null) && <td>{person.monthly_need || '-'}</td>}
                                    {filteredPeople.some((p) => p.name_of_school !== null) && <td>{person.name_of_school || '-'}</td>}
                                    {filteredPeople.some((p) => p.Educational_level !== null) && <td>{person.Educational_level || '-'}</td>}

                                    <td>

                                        <td>
                                            <button onClick={() => openEditModal(person)}>Edit</button>
                                            <button onClick={openAddModal}>Add</button>
                                            <button onClick={() => openDeleteModal(person)}>Delete</button>
                                        </td>


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
            </section>
            {/* edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Modal"
               
            >
           
                <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button onClick={() => handleEditSubmit(selectedPerson)}>Change</button>
            </Modal>

            {/* add Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Modal"
                className="Modal"
            >
                <h2 key={filteredServices?.id}>"أضف إلى فئة "{filteredServices?.title}</h2>
             
                <form onSubmit={handleAddSubmit}>
                    <div>
                        <label style={{ color: 'black' }}>
                            Full Name:
                        </label>
                        <input
                            type="text"
                            value={newPerson.full_name || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, full_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Mother Name:
                        </label>
                        <input
                            type="text"
                            value={newPerson.mother_name || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, mother_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Age:
                        </label>
                        <input
                            type="text"
                            value={newPerson.age || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, age: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Gender:
                        </label>
                        <input
                            type="text"
                            value={newPerson.gender || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, gender: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            value={newPerson.phone_number || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, phone_number: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Overview:
                        </label>
                        <input
                            type="text"
                            value={newPerson.overview || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, overview: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Address:
                        </label>
                        <input
                            type="text"
                            value={newPerson.address || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            Status:
                        </label>
                        <input
                            type="text"
                            value={newPerson.status || ''}
                            onChange={(e) => setNewPerson((prev) => ({ ...prev, status: e.target.value }))}
                        />
                    </div>
                  
                    {headers.map((header) => (
                        header !== 'id' && 
                        header !== 'charity_id' && 
                        header !== 'needy_type' && 
                        header !== 'created_at' && 
                        header !== 'updated_at' && ( 
                            (header === 'monthly_need' && filteredPeople.some(person => person.monthly_need !== null)) ||
                            (header === 'name_of_school' && filteredPeople.some(person => person.name_of_school !== null)) ||
                            (header === 'Educational_level' && filteredPeople.some(person => person.Educational_level !== null))
                        ) && (
                            <div key={header}>
                                <label style={{color:'black'}}>
                                    {header}:
                                </label>
                                <input
                                    type="text"
                                    value={newPerson[header] || ''}
                                    onChange={(e) => setNewPerson((prev) => ({ ...prev, [header]: e.target.value }))}
                                />
                            </div>
                        )
                    ))}
                    <div className='TwoButtons'>
                    <button onClick={() => setIsAddModalOpen(false)} className='cancel'>Cancel</button>
                        <button type="submit" className='create'>Create</button>
                    </div>
                </form>
            </Modal>



            {/* Delete Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                contentLabel="Delete Modal"
            >
             
                <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                <button onClick={() => handleDeleteSubmit(selectedPerson)}>Yes, Delete</button>
            </Modal>
        </>
    );
};

export default OrgManageShape1;