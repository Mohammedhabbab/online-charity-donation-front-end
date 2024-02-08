import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AdminCharities = () => {
    const [charities, setCharities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const navigate = useNavigate();
    const [newCharity, setNewCharity] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/api/get_charities')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCharities(data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger]);

    const totalPages = Math.ceil(charities.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCharity = charities.slice(startIndex, endIndex);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const openDeleteModal = (charity) => {
        setSelectedCharity(charity);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('full_name', newCharity.full_name);
            formData.append('email', newCharity.email);
            formData.append('address', newCharity.address);
            formData.append('mobile_number', newCharity.mobile_number);
            formData.append('telephone_number', newCharity.telephone_number);
            formData.append('status', 0);
            formData.append('type_of_user', 'charity');
            formData.append('gender', '');

            const response = await fetch('http://localhost:8000/api/insert_user', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setNewCharity({
                full_name: '',
                email: '',
                address: '',
                mobile_number: '',
                telephone_number: '',
            });

            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const handleDeleteSubmit = async (charityToDelete) => {
        try {
            if (!charityToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_user/${charityToDelete.id}`, {
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

    const handleStatusUpdate = async (charity) => {
        try {
            const response = await fetch(`http://localhost:8000/api/auth/update_status/${charity.id}`, {
                method: 'PUT',
                body: JSON.stringify(), 
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setUpdateTrigger(prev => !prev);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <section className='AdminUsers'>
                <div className='AdminContainers'>
                    <table className='InfoTable'>
                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>الحساب</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>الهاتف</th>
                                <th>الحالة</th>

                                <th>اجراء</th>
                                <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCharity.map((charity) => (
                                <tr key={charity.id}>
                                    <td>{charity.full_name}</td>
                                    <td>{charity.email}</td>
                                    <td>{charity.address}</td>
                                    <td>{charity.mobile_number}</td>
                                    <td>{charity.telephone_number}</td>
                                    <td>{charity.status}</td>
                                    <td>
                                        {charity.status === 0 ?
                                            <button className='EditB' onClick={() => handleStatusUpdate(charity)}>قبول</button>
                                            :
                                            <button className='EditB' onClick={() => handleStatusUpdate(charity)}  >تعطيل</button>
                                        }
                                        <button className='DeleteB' onClick={() => openDeleteModal(charity)}>X</button>
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
                <AdminSidebar />
            </section>

            {/* Add Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Modal"
                className="Modal"
            >
                <h2 className='Add' >"أضف إلى الخدمات "</h2>
                <form onSubmit={handleAddSubmit}>
                    <div>
                        <label style={{ color: 'black' }}>الاسم:</label>
                        <input
                            type="text"
                            value={newCharity.full_name || ''}
                            onChange={(e) => setNewCharity((prev) => ({ ...prev, full_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>الحساب:</label>
                        <input
                            type="text"
                            value={newCharity.email || ''}
                            onChange={(e) => setNewCharity((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>العنوان:</label>
                        <input
                            type="text"
                            value={newCharity.address || ''}
                            onChange={(e) => setNewCharity((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>رقم:</label>
                        <input
                            type="text"
                            value={newCharity.shape || ''}
                            onChange={(e) => setNewCharity((prev) => ({ ...prev, shape: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>رقم الهاتف:</label>
                        <input
                            type="text"
                            value={newCharity.telephone_number || ''}
                            onChange={(e) => setNewCharity((prev) => ({ ...prev, telephone_number: e.target.value }))}
                        />
                    </div>
                    <div className='TwoButtons'>
                        <button onClick={() => setIsAddModalOpen(false)} className='cancel'>إلغاء</button>
                        <button type="submit" className='create'>إضافة</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                contentLabel="Delete Modal"
                className="ModalD1"
            >
                <div className='Delete'>
                    <button className='Button2' onClick={() => setIsDeleteModalOpen(false)}>إلغاء</button>
                    <button className='Button1' onClick={() => handleDeleteSubmit(selectedCharity)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminCharities
