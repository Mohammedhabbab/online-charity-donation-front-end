import { React,useEffect,useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const [newService, setNewService] = useState({});




    useEffect(() => {
        fetch('http://localhost:8000/api/get_services')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setServices(data || []);
               
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [updateTrigger, deleteTrigger, editTrigger]);

    const totalPages = Math.ceil(services.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentservices = services.slice(startIndex, endIndex);

    const openEditModal = (service) => {
        setSelectedService(service);
        setIsEditModalOpen(true);
    };


    const openAddModal = () => {
        setSelectedService(null);
        setIsAddModalOpen(true);
    };


    const openDeleteModal = (service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const handleEditSubmit = async (e, editedService) => {
        try {
            e.preventDefault();

            const formData = new FormData();



            formData.append('title', editedService.title);
            formData.append('description', editedService.description);
            formData.append('shape', editedService.shape);
            formData.append('url', editedService.url);
         
            formData.append('image', selectedImage);
            formData.append('_method', "PUT");



            const response = await fetch(`http://localhost:8000/api/update_Services/${editedService.id}`, {
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

            formData.append('title', newService.title);
            formData.append('description', newService.description);
            formData.append('url', newService.url);
            formData.append('shape', newService.shape);
            formData.append('image', selectedImage);

            const response = await fetch('http://localhost:8000/api/insert_service', {
                method: 'POST',
                body: formData,
            });

            console.log('Add Record Response:', response);

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setNewService({
                title: '',
                description: '',
                shape: '',
                url: '',
               
            });

            setUpdateTrigger((prev) => !prev);
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };




    const handleDeleteSubmit = async (serviceToDelete) => {
        try {
            if (!serviceToDelete) {
                console.error('No person selected for deletion');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/delete_Services/${serviceToDelete.id}`, {
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
          <section className='AdminUsers' key={services.id}>
              <div className='AdminContainers'>
                
                  <table className='InfoTable'>

                      <thead>
                          <tr>
                              <th>الاسم</th>
                              <th>الوصف</th>
                           
                              <th>رابط</th>
                              <th>النوع</th>
                           
                          
                              <th>اجراء</th>
                              <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
                          </tr>
                      </thead>

                      <tbody>
                          {currentservices.map((service) => (
                              <tr key={service.id}>
                                  <td>{service.title}</td>
                                  <td>{service.description}</td>
                                
                                  <td>{service.url}</td>
                                  <td>{service.shape === 0 ? 'أشخاص' : 'أغراض'}</td>
                               



                                  <td>
                                      <button className='EditB' onClick={() => openEditModal(service)}>تعديل</button>
                                      <button className='DeleteB' onClick={() => openDeleteModal(service)}>X</button>
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

              {selectedService && (
                  <form onSubmit={(e) => handleEditSubmit(e, selectedService)}>

                      <div>
                          <label style={{ color: 'black' }}>
                              الاسم:
                          </label>
                          <input
                              type="text"
                              value={selectedService.title || ''}
                              onChange={(e) => setSelectedService((prev) => ({ ...prev, title: e.target.value }))}
                          />
                      </div>
                      <div>
                          <label style={{ color: 'black' }}>
                              التفاصيل:
                          </label>
                          <input
                              type="text"
                              value={selectedService.description || ''}
                              onChange={(e) => setSelectedService((prev) => ({ ...prev, description: e.target.value }))}
                          />
                      </div>
                      <div>
                          <label style={{ color: 'black' }}>
                              اسم العنوان:
                          </label>
                          <input
                              type="text"
                              value={selectedService.url || ''}
                              onChange={(e) => setSelectedService((prev) => ({ ...prev, url: e.target.value }))}
                          />
                      </div>
                      <div>
                          <label style={{ color: 'black' }}>
                              النوع:
                          </label>
                          <input
                              type="text"
                              value={selectedService.shape || '0'}
                              onChange={(e) => setSelectedService((prev) => ({ ...prev, shape: e.target.value }))}
                          />
                      </div>


                      <div>
                          <label style={{ color: 'black' }}>
                              صورة الخدمة:
                              <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e)}
                              />

                          </label>
                      </div>




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
                          value={newService.title || ''}
                          onChange={(e) => setNewService((prev) => ({ ...prev, title: e.target.value }))}
                      />
                  </div>
                  <div>
                      <label style={{ color: 'black' }}>
                          التفاصيل:
                      </label>
                      <input
                          type="text"
                          value={newService.description || ''}
                          onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                      />
                  </div>
                  <div>
                      <label style={{ color: 'black' }}>
                          اسم العنوان:
                      </label>
                      <input
                          type="text"
                          value={newService.url || ''}
                          onChange={(e) => setNewService((prev) => ({ ...prev, url: e.target.value }))}
                      />
                  </div>
                  <div>
                      <label style={{ color: 'black' }}>
                          النوع:
                      </label>
                      <input
                          type="text"
                          value={newService.shape || ''}
                          onChange={(e) => setNewService((prev) => ({ ...prev, shape: e.target.value }))}
                      />
                  </div>
                

                  <div>
                      <label style={{ color: 'black' }}>
                          صورة الخدمة:
                          <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e)}
                          />

                      </label>
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
                  <button className='Button1' onClick={() => handleDeleteSubmit(selectedService)}>حذف</button>
              </div>
          </Modal>
      </>
  )
}

export default AdminServices
