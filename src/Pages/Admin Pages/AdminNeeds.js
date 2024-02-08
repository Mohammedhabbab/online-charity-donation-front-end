import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AdminNeeds = () => {
    const [needs, setneeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedneed, setSelectedneed] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newneed, setNewneed] = useState({});




    useEffect(() => {
        fetch('http://localhost:8000/api/get_needs')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setneeds(data || []);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(needs.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentneed = needs.slice(startIndex, endIndex);





    const openDeleteModal = (need) => {
        setSelectedneed(need);
        setIsDeleteModalOpen(true);
    };




    const handleDeleteSubmit = async (needToDelete) => {
        try {
            if (!needToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_Needs/${needToDelete.id}`, {
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
            <section className='AdminUsers' key={needs.id}>
                <div className='AdminContainers'>

                    <table className='InfoTable'>

                        <thead>
                            <tr>
                                <th>اسم المنتج</th>
                                <th>النوع</th>
                                <th>الكمية المطلوبة</th>
                                <th>الكمية المستلمة </th>
                                <th>سعر المنتج</th>
                                <th>السعر بالكامل</th>
                                <th>تفاصيل</th>
                                <th>الحالة</th>
                                <th>اجراء</th>

                               
                            </tr>
                        </thead>

                        <tbody>
                            {currentneed.map((need) => (
                                <tr key={need.id}>
                                    <td>{need.name_of_proudct}</td>
                                    <td>{need.type_of_proudct}</td>
                                    <td>{need.total_count}</td>
                                    <td>{need.available_count}</td>
                                    <td>{need.price_per_item}</td>
                                    <td>{need.total_amount}</td>
                                    <td>{need.overview}</td>

                                    <td>{need.status === 0 ? 'Still in Need' : 'Needed Amount Claimed '}</td>




                                    <td>
                                        <button className='DeleteB' onClick={() => openDeleteModal(need)}>X</button>
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
                    <button className='Button1' onClick={() => handleDeleteSubmit(selectedneed)}>حذف</button>
                </div>
            </Modal>
        </>
    )
}

export default AdminNeeds
