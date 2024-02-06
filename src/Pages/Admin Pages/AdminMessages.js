import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
const AdminMessages = () => {

    const [complaines, setComplaines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
  
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedcomplain, setSelectedComplain] = useState(null);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8000/api/get_complain')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setComplaines(data || []);

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [deleteTrigger ]);

    const totalPages = Math.ceil(complaines.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentcomplain = complaines.slice(startIndex, endIndex);



    const openDeleteModal = (complain) => {
        setSelectedComplain(complain);
        setIsDeleteModalOpen(true);
    };



    const handleDeleteSubmit = async (complainToDelete) => {
        try {
            if (!complainToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_complain/${complainToDelete?.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete record');
            }


            setIsDeleteModalOpen(false);

            setDeleteTrigger(prev => !prev);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };
  return (
      <>
          <section className='AdminUsers' key={complaines.id}>
              <div className='AdminContainers'>

                  <table className='InfoTable'>

                      <thead>
                          <tr>
                              <th>الاسم</th>
                              <th>الحساب</th>
                              <th>المشكلة</th>
                              <th>الرسالة</th>

                              <th>اجراء</th>
                              
                          </tr>
                      </thead>

                      <tbody>
                          {currentcomplain.map((complain) => (
                              <tr key={complain.id}>
                                  <td>{complain.name}</td>
                                  <td>{complain.email}</td>
                                  <td>{complain.problem}</td>
                                  <td>{complain.message}</td>




                                  <td>
                                      <button className='DeleteB' onClick={() => openDeleteModal(complain)}>X</button>
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
                  <button className='Button1' onClick={() => handleDeleteSubmit(selectedcomplain)}>حذف</button>
              </div>
          </Modal>
      
    </>
  )
}

export default AdminMessages
