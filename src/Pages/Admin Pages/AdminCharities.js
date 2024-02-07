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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedcharity, setSelectedCharity] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newcharity, setNewcharity] = useState({});




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
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(charities.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentcharity = charities.slice(startIndex, endIndex);

    const openEditModal = (charity) => {
        setSelectedCharity(charity);
        setIsEditModalOpen(true);
    };


    const openAddModal = () => {
        setSelectedCharity(null);
        setIsAddModalOpen(true);
    };


    const openDeleteModal = (charity) => {
        setSelectedCharity(charity);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (e, editedCharity) => {
        try {
            e.preventDefault();

            const formData = new FormData();



            formData.append('full name', newcharity.full_name);
            formData.append('email', newcharity.email);
            formData.append('address', newcharity.address);
            formData.append('mobile_number', newcharity.mobile_number);
            formData.append('telephone_number', newcharity.telephone_number);

            //formData.append('image', selectedImage);
            formData.append('_method', "PUT");



            const response = await fetch(`http://localhost:8000/api/auth/update_user/${editedCharity.id}`, {
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

            formData.append('full name', newcharity.full_name);
            formData.append('email', newcharity.email);
            formData.append('address', newcharity.address);
            formData.append('mobile_number', newcharity.mobile_number);
            formData.append('telephone_number', newcharity.telephone_number);
            formData.append('status', 0);
            formData.append('type_of_user', 'charity');
            formData.append('gender', '');

            
           // formData.append('image', selectedImage);

            const response = await fetch('http://localhost:8000/api/insert_user', {
                method: 'POST',
                body: formData,
            });

            console.log('Add Record Response:', response);

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setNewcharity({
                full_name: '',
                email: '',
                address: '',
                mobile_number: '',
                telephone_number: '',
                status:'0'
            });

            setUpdateTrigger((prev) => !prev);
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <>
            <section className='AdminUsers' key={charities.id}>
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
                            {currentcharity.map((charity) => (
                                <tr key={charity.id}>
                                    <td>{charity.full_name}</td>
                                    <td>{charity.email}</td>
                                    <td>{charity.address}</td>
                                    <td>{charity.mobile_number}</td>
                                    <td>{charity.telephone_number}</td>




                                    <td>
                                        <button className='EditB' onClick={() => openEditModal(charity)}>تعديل</button>
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

            {/* edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Modal"
                className="Modal"
            >
                <h2>تعديل الخدمة</h2>

                {selectedcharity && (
                    <form onSubmit={(e) => handleEditSubmit(e, selectedcharity)}>

                        <div>
                            <label style={{ color: 'black' }}>
                                الاسم:
                            </label>
                            <input
                                type="text"
                                value={selectedcharity.full_name || ''}
                                onChange={(e) => setSelectedCharity((prev) => ({ ...prev, full_name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                الحساب:
                            </label>
                            <input
                                type="text"
                                value={selectedcharity.email || ''}
                                onChange={(e) => setSelectedCharity((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                العنوان:
                            </label>
                            <input
                                type="text"
                                value={selectedcharity.address || ''}
                                onChange={(e) => setSelectedCharity((prev) => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label style={{ color: 'black' }}>
                                رقم:
                            </label>
                            <input
                                type="text"
                                value={selectedcharity.mobile_number || '0'}
                                onChange={(e) => setSelectedCharity((prev) => ({ ...prev, mobile_number: e.target.value }))}
                            />
                        </div>

                        <div>
                            <label style={{ color: 'black' }}>
                                الهاتف:
                            </label>
                            <input
                                type="text"
                                value={selectedcharity.telephone_number || '0'}
                                onChange={(e) => setSelectedCharity((prev) => ({ ...prev, telephone_number: e.target.value }))}
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
                            value={newcharity.full_name || ''}
                            onChange={(e) => setNewcharity((prev) => ({ ...prev, full_name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            الحساب:
                        </label>
                        <input
                            type="text"
                            value={newcharity.email || ''}
                            onChange={(e) => setNewcharity((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                         العنوان:
                        </label>
                        <input
                            type="text"
                            value={newcharity.address || ''}
                            onChange={(e) => setNewcharity((prev) => ({ ...prev, address: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            رقم:
                        </label>
                        <input
                            type="text"
                            value={newcharity.shape || ''}
                            onChange={(e) => setNewcharity((prev) => ({ ...prev, shape: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>
                            رقم الهاتف:
                        </label>
                        <input
                            type="text"
                            value={newcharity.telephone_number || ''}
                            onChange={(e) => setNewcharity((prev) => ({ ...prev, telephone_number: e.target.value }))}
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
                    <button className='Button1' onClick={() => handleDeleteSubmit(selectedcharity)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminCharities
