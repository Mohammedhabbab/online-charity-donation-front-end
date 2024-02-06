import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
const AdminUsers = () => {
    const [users, setusers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selecteduser, setSelecteduser] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newuser, setNewuser] = useState({});




    useEffect(() => {
        fetch('http://localhost:8000/api/get_users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setusers(data || []);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(users.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentuser = users.slice(startIndex, endIndex);

    const openEditModal = (user) => {
        setSelecteduser(user);
        setIsEditModalOpen(true);
    };


    const openAddModal = () => {
        setSelecteduser(null);
        setIsAddModalOpen(true);
    };


    const openDeleteModal = (user) => {
        setSelecteduser(user);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (e, editeduser) => {
        try {
            e.preventDefault();

            const formData = new FormData();



            formData.append('full name', newuser.full_name);
            formData.append('email', newuser.email);
            formData.append('address', newuser.address);
            formData.append('mobile_number', newuser.mobile_number);
            formData.append('telephone_number', newuser.gender);

            //formData.append('image', selectedImage);
            formData.append('_method', "PUT");



            const response = await fetch(`http://localhost:8000/api/update_Services/${editeduser.id}`, {
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

            formData.append('full name', newuser.full_name);
            formData.append('email', newuser.email);
            formData.append('address', newuser.address);
            formData.append('mobile_number', newuser.mobile_number);
            formData.append('telephone_number', newuser.gender);


            // formData.append('image', selectedImage);

            const response = await fetch('http://localhost:8000/api/insert_user', {
                method: 'POST',
                body: formData,
            });

            console.log('Add Record Response:', response);

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setNewuser({
                full_name: '',
                email: '',
                address: '',
                mobile_number: '',
                gender: '',
            });

            setUpdateTrigger((prev) => !prev);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };




    const handleDeleteSubmit = async (userToDelete) => {
        try {
            if (!userToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_users/${userToDelete.id}`, {
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
            <section className='AdminUsers' key={users.id}>
                <div className='AdminContainers'>

                    <table className='InfoTable'>

                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>الحساب</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>الجنس</th>

                                <th>اجراء</th>
                                <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentuser.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.full_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.mobile_number}</td>
                                    <td>{user.gender}</td>




                                    <td>
                                        <button className='EditB' onClick={() => openEditModal(user)}>تعديل</button>
                                        <button className='DeleteB' onClick={() => openDeleteModal(user)}>X</button>
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

                {selecteduser && (
                    <form onSubmit={(e) => handleEditSubmit(e, selecteduser)}>

                        <div>
                            <label style={{ color: 'black' }}>
                                الاسم:
                            </label>
                            <input
                                type="text"
                                value={selecteduser.full_name || ''}
                                onChange={(e) => setSelecteduser((prev) => ({ ...prev, full_name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                الحساب:
                            </label>
                            <input
                                type="text"
                                value={selecteduser.email || ''}
                                onChange={(e) => setSelecteduser((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                العنوان:
                            </label>
                            <input
                                type="text"
                                value={selecteduser.address || ''}
                                onChange={(e) => setSelecteduser((prev) => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                رقم:
                            </label>
                            <input
                                type="text"
                                value={selecteduser.mobile_number || '0'}
                                onChange={(e) => setSelecteduser((prev) => ({ ...prev, mobile_number: e.target.value }))}
                            />
                        </div>

                        <div>
                            <label style={{ color: 'black' }}>
                                الجنس:
                            </label>
                            <input
                                type="text"
                                value={selecteduser.gender || '0'}
                                onChange={(e) => setSelecteduser((prev) => ({ ...prev, gender: e.target.value }))}
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
                            value={newuser.full_name || ''}
                            onChange={(e) => setNewuser((prev) => ({ ...prev, full_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            الحساب:
                        </label>
                        <input
                            type="text"
                            value={newuser.email || ''}
                            onChange={(e) => setNewuser((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            العنوان:
                        </label>
                        <input
                            type="text"
                            value={newuser.address || ''}
                            onChange={(e) => setNewuser((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            رقم:
                        </label>
                        <input
                            type="text"
                            value={newuser.shape || ''}
                            onChange={(e) => setNewuser((prev) => ({ ...prev, shape: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            الجنس:
                        </label>
                        <input
                            type="text"
                            value={newuser.gender || ''}
                            onChange={(e) => setNewuser((prev) => ({ ...prev, gender: e.target.value }))}
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
                    <button className='Button1' onClick={() => handleDeleteSubmit(selecteduser)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminUsers
