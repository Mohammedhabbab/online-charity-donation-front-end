import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AdminBeneficiaries = () => {
    const [beneficiaries, setbeneficiaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedbeneficiar, setSelectedbeneficiar] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newbeneficiar, setNewbeneficiar] = useState({});




    useEffect(() => {
        fetch('http://localhost:8000/api/get_beneficiar')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setbeneficiaries(data || []);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(beneficiaries.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentbeneficiar = beneficiaries.slice(startIndex, endIndex);

 



    const openDeleteModal = (beneficiar) => {
        setSelectedbeneficiar(beneficiar);
        setIsDeleteModalOpen(true);
    };

    


    const handleDeleteSubmit = async (beneficiarToDelete) => {
        try {
            if (!beneficiarToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_Beneficiaries/${beneficiarToDelete.id}`, {
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
            <section className='AdminUsers' key={beneficiaries.id}>
                <div className='AdminContainers'>

                    <table className='InfoTable'>

                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>اسم الأم</th>
                                <th>الخدمة</th>
                                <th>العنوان</th>
                                <th>العمر</th>
                                <th>الجنس</th>

                                <th>اجراء</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentbeneficiar.map((beneficiar) => (
                                <tr key={beneficiar.id}>
                                    <td>{beneficiar.full_name}</td>
                                    <td>{beneficiar.mother_name}</td>
                                    <td>{beneficiar.needy_type}</td>
                                    <td>{beneficiar.address}</td>
                                    <td>{beneficiar.age}</td>
                                    <td>{beneficiar.gender}</td>




                                    <td>
                                        <button className='DeleteB' onClick={() => openDeleteModal(beneficiar)}>X</button>
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
                    <button className='Button1' onClick={() => handleDeleteSubmit(selectedbeneficiar)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminBeneficiaries
