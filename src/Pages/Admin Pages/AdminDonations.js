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

   


    const openDeleteModal = (donation) => {
        setSelecteddonation(donation);
        setIsDeleteModalOpen(true);
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
                                <th>الخدمة</th>
                                <th>التفاصيل</th>
                                <th>المتبرع</th>
                                <th>الجمعية المسؤولة</th>
                                <th>المبلغ</th>
                                <th>رقم العملية</th>

                                <th>اجراء</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentdonation.map((donation) => (
                                <tr key={donation.id}>
                                    <td>{donation.donation_type_id}</td>
                                    <td>{donation.overview}</td>
                                    <td>{donation.users_id}</td>
                                    <td>{donation.beneficaries_id}</td>
                                    <td>{donation.total_amount_of_donation}</td>
                                    <td>{donation.id}</td>




                                    <td>
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
