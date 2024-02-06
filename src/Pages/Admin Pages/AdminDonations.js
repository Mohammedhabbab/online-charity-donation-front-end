import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
const AdminDonations = () => {
    const [donations, setdonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selecteddonation, setSelecteddonation] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newdonation, setNewdonation] = useState({});




    useEffect(() => {
        fetch('http://localhost:8000/api/get_donations')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setdonations(data || []);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(donations.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentdonation = donations.slice(startIndex, endIndex);

    const openEditModal = (donation) => {
        setSelecteddonation(donation);
        setIsEditModalOpen(true);
    };


    const openAddModal = () => {
        setSelecteddonation(null);
        setIsAddModalOpen(true);
    };


    const openDeleteModal = (donation) => {
        setSelecteddonation(donation);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (e, editeddonation) => {
        try {
            e.preventDefault();

            const formData = new FormData();



            formData.append('full name', newdonation.full_name);
            formData.append('email', newdonation.email);
            formData.append('address', newdonation.address);
            formData.append('mobile_number', newdonation.mobile_number);
            formData.append('telephone_number', newdonation.telephone_number);

            //formData.append('image', selectedImage);
            formData.append('_method', "PUT");



            const response = await fetch(`http://localhost:8000/api/update_Services/${editeddonation.id}`, {
                method: 'POST',
                body: formData,
            });
            console.log('Add Record Response:', response);
            if (!response.ok) {
                throw new Error('Failed to edit record');
            }

            setIsEditModalOpen(false);
            setUpdateTrigger((prev) => !prev);
        } catch (error) {
            console.error('Error editing record:', error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('full name', newdonation.full_name);
            formData.append('email', newdonation.email);
            formData.append('address', newdonation.address);
            formData.append('mobile_number', newdonation.mobile_number);
            formData.append('telephone_number', newdonation.telephone_number);


            // formData.append('image', selectedImage);

            const response = await fetch('http://localhost:8000/api/insert_donation', {
                method: 'POST',
                body: formData,
            });

            console.log('Add Record Response:', response);

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setNewdonation({
                full_name: '',
                email: '',
                address: '',
                mobile_number: '',
                telephone_number: '',
            });

            setUpdateTrigger((prev) => !prev);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };




    const handleDeleteSubmit = async (donationToDelete) => {
        try {
            if (!donationToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_donations/${donationToDelete.id}`, {
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <>
            <section className='AdminUsers' key={donations.id}>
                <div className='AdminContainers'>

                    <table className='InfoTable'>

                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>الحساب</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>الهاتف</th>

                                <th>اجراء</th>
                                <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentdonation.map((donation) => (
                                <tr key={donation.id}>
                                    <td>{donation.full_name}</td>
                                    <td>{donation.email}</td>
                                    <td>{donation.address}</td>
                                    <td>{donation.mobile_number}</td>
                                    <td>{donation.telephone_number}</td>




                                    <td>
                                        <button className='EditB' onClick={() => openEditModal(donation)}>تعديل</button>
                                        <button className='DeleteB' onClick={() => openDeleteModal(donation)}>X</button>
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

            {/* edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Modal"
                className="Modal"
            >
                <h2>تعديل الخدمة</h2>

                {selecteddonation && (
                    <form onSubmit={(e) => handleEditSubmit(e, selecteddonation)}>

                        <div>
                            <label style={{ color: 'black' }}>
                                الاسم:
                            </label>
                            <input
                                type="text"
                                value={selecteddonation.full_name || ''}
                                onChange={(e) => setSelecteddonation((prev) => ({ ...prev, full_name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                الحساب:
                            </label>
                            <input
                                type="text"
                                value={selecteddonation.email || ''}
                                onChange={(e) => setSelecteddonation((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                العنوان:
                            </label>
                            <input
                                type="text"
                                value={selecteddonation.address || ''}
                                onChange={(e) => setSelecteddonation((prev) => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                رقم:
                            </label>
                            <input
                                type="text"
                                value={selecteddonation.mobile_number || '0'}
                                onChange={(e) => setSelecteddonation((prev) => ({ ...prev, mobile_number: e.target.value }))}
                            />
                        </div>

                        <div>
                            <label style={{ color: 'black' }}>
                                الهاتف:
                            </label>
                            <input
                                type="text"
                                value={selecteddonation.telephone_number || '0'}
                                onChange={(e) => setSelecteddonation((prev) => ({ ...prev, telephone_number: e.target.value }))}
                            />
                        </div>
                        {/*<div>
                            <label style={{ color: 'black' }}>
                                صورة الخدمة:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e)}
                                />

                            </label>
                        </div>
                */}



                        <div className='TwoButtons'>
                            <button onClick={() => setIsEditModalOpen(false)} className='cancel'>إلغاء</button>
                            <button type="submit" className='create'>تعديل</button>
                        </div>
                    </form>
                )}
            </Modal>



            {/* add Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Modal"
                className="Modal"
            >
                <h2 className='Add' >"أضف إلى الخدمات "</h2>

                <form onSubmit={handleAddSubmit}>
                    <div>
                        <label style={{ color: 'black' }}>
                            الاسم:
                        </label>
                        <input
                            type="text"
                            value={newdonation.full_name || ''}
                            onChange={(e) => setNewdonation((prev) => ({ ...prev, full_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            الحساب:
                        </label>
                        <input
                            type="text"
                            value={newdonation.email || ''}
                            onChange={(e) => setNewdonation((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            العنوان:
                        </label>
                        <input
                            type="text"
                            value={newdonation.address || ''}
                            onChange={(e) => setNewdonation((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            رقم:
                        </label>
                        <input
                            type="text"
                            value={newdonation.shape || ''}
                            onChange={(e) => setNewdonation((prev) => ({ ...prev, shape: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            رقم الهاتف:
                        </label>
                        <input
                            type="text"
                            value={newdonation.telephone_number || ''}
                            onChange={(e) => setNewdonation((prev) => ({ ...prev, telephone_number: e.target.value }))}
                        />
                    </div>

                    {/*}    <div>
                        <label style={{ color: 'black' }}>
                            صورة الخدمة:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e)}
                            />

                        </label>
            </div>
            */}


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
                    <button className='Button1' onClick={() => handleDeleteSubmit(selecteddonation)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminDonations
