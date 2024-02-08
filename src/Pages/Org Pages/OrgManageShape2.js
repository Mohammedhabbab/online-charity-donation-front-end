import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../Components/Sidebar/SideBar';
import '../../Components/Org/OrgShape2.css';

const OrgManageShape2 = () => {
  const { serviceUrl } = useParams();

  const [stuff, setStuff] = useState([]);
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
  const [selectedImage, setSelectedImage] = useState(null);

  const [newPerson, setNewPerson] = useState({});
  const handleNullValue = (value) => (value === '' ? null : value);


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
          navigate('./sign')
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
    const fetchStuff = fetch('http://localhost:8000/api/get_needs');


    Promise.all([fetchServices, fetchStuff])
      .then(async ([servicesResponse, stuffResponse]) => {
        if (!servicesResponse.ok || !stuffResponse.ok) {
          throw new Error('Failed to fetch services or people');
        }

        const sdata = await servicesResponse.json();
        const data = await stuffResponse.json();

        setService(sdata);
        setStuff(data);
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


  const filteredStuff = stuff
    .filter((person) => person.needs_type.toLowerCase() === lowercasedServiceUrl)
    .filter((person) => person.charity_id === userData?.id);

  console.log('Filtered People:', filteredStuff);
  console.log('People Array:', stuff);





  const totalPages = Math.ceil(filteredStuff.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentStuff = filteredStuff.slice(startIndex, endIndex);

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


  const handleEditSubmit = async (e, editedPerson) => {
    try {
      e.preventDefault();

      const formData = new FormData();
    

      
      formData.append('name_of_proudct', editedPerson.name_of_proudct);
      formData.append('type_of_proudct', editedPerson.type_of_proudct);
      formData.append('total_count', editedPerson.total_count);
      formData.append('available_count', editedPerson.available_count);
      formData.append('price_per_item', editedPerson.price_per_item);
      formData.append('overview', editedPerson.overview);
      formData.append('total_amount', editedPerson.total_amount);
      formData.append('status', editedPerson.status);
      formData.append('needs_type', lowercasedServiceUrl);
      formData.append('charity_id', userData?.id);
      formData.append('image', selectedImage); 
      formData.append('_method', "PUT"); 



      const response = await fetch(`http://localhost:8000/api/update_Needs/${editedPerson.id}`, {
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

      formData.append('name_of_proudct', newPerson.name_of_proudct);
      formData.append('type_of_proudct', newPerson.type_of_proudct);
      formData.append('total_count', newPerson.total_count);
      formData.append('price_per_item', newPerson.price_per_item);
      formData.append('overview', newPerson.overview);
      formData.append('total_amount', newPerson.total_amount);
      formData.append('status', 0);
      formData.append('available_count', 0);
      formData.append('needs_type', lowercasedServiceUrl);
      formData.append('charity_id', userData?.id);

      // Append the image file to FormData
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:8000/api/insert_needs', {
        method: 'POST',
        body: formData,
      });

      console.log('Add Record Response:', response);

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      setNewPerson({
        name_of_proudct: '',
        type_of_proudct: '',
        total_amount: '',
        total_count: '',
        overview: '',
        price_per_item: '',
        status: 0,
        available_count:0,
      });

      setUpdateTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };




  const handleDeleteSubmit = async (personToDelete) => {
    try {
      if (!personToDelete) {
        console.error('No person selected for deletion');
        return;
      }

      const response = await fetch(`http://localhost:8000/api/delete_Needs/${personToDelete.id}`, {
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
    if (!isLoading && (!service)) {

      const timeoutId = setTimeout(() => {
        navigate('/404');
      }, 1000);


      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, service, stuff, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const getHeaders = () => {
    const headers = Object.keys(filteredStuff[0] || {});
    return headers.filter(header => !['id', 'charity_id', 'needs_type', 'created_at', 'updated_at'].includes(header));
  };
  const headers = getHeaders();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  return (
    <>
      <section className='Services' key={filteredStuff.id}>
        <div className='Containers'>
          <span key={filteredServices?.id}>{filteredServices?.title}</span>
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
                <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
              </tr>
            </thead>

            <tbody>
              {currentStuff.map((person) => (
                <tr key={person.id}>
                  <td>{person.name_of_proudct}</td>
                  <td>{person.type_of_proudct}</td>
                  <td>{person.total_count}</td>
                  <td>{person.available_count}</td>
                  <td>{person.price_per_item}</td>
                  <td>{person.total_amount}</td>
                  <td>{person.overview}</td>
                 
                  <td>{person.status === 0 ? 'Still in Need' : 'Needed Amount Claimed '}</td>
                  

                 

                    <td>
                      <button  className='EditB' onClick={() => openEditModal(person)}>تعديل</button>
                      <button className='DeleteB' onClick={() => openDeleteModal(person)}>X</button>
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
        className="Modal"
      >
        <h2>تعديل المنتج</h2>

        {selectedPerson && (
          <form onSubmit={(e) => handleEditSubmit(e, selectedPerson)}>
            
            <div>
              <label style={{ color: 'black' }}>اسم المنتج:</label>
              <input
                type="text"
                value={selectedPerson.name_of_proudct || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, name_of_proudct: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>النوع:</label>
              <input
                type="text"
                value={selectedPerson.type_of_proudct || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, type_of_proudct: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                الكمية المطلوبة:
              </label>
              <input
                type="text"
                value={selectedPerson.total_count || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, total_count: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                الكمية المستلمة:
              </label>
              <input
                type="text"
                value={selectedPerson.available_count || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, available_count: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                سعر المنتج:
              </label>
              <input
                type="text"
                value={selectedPerson.price_per_item || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, price_per_item: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                التفاصيل:
              </label>
              <input
                type="text"
                value={selectedPerson.overview || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, overview: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                السعر بالكامل:
              </label>
              <input
                type="text"
                value={selectedPerson.total_amount || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, total_amount: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                الحالة:
              </label>
              <input
                type="text"
                value={selectedPerson.status || ''}
                onChange={(e) => setSelectedPerson((prev) => ({ ...prev, status: e.target.value }))}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>
                صورة المنتج:
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
        <h2 className='Add'  key={filteredServices?.id}>"أضف إلى فئة "{filteredServices?.title}</h2>

        <form onSubmit={handleAddSubmit}>
          <div>
            <label style={{ color: 'black' }}>
              اسم المنتج:
            </label>
            <input
              type="text"
              value={newPerson.name_of_proudct || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, name_of_proudct: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ color: 'black' }}>
               النوع:
            </label>
            <input
              type="text"
              value={newPerson.type_of_proudct || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, type_of_proudct: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ color: 'black' }}>
              الكمية المطلوبة:
            </label>
            <input
              type="text"
              value={newPerson.total_count || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, total_count: e.target.value }))}
            />
          </div>
      
          <div>
            <label style={{ color: 'black' }}>
              سعر المنتج:
            </label>
            <input
              type="text"
              value={newPerson.price_per_item || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, price_per_item: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ color: 'black' }}>
              التفاصيل:
            </label>
            <input
              type="text"
              value={newPerson.overview || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, overview: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ color: 'black' }}>
              السعر بالكامل:
            </label>
            <input
              type="text"
              value={newPerson.total_amount || ''}
              onChange={(e) => setNewPerson((prev) => ({ ...prev, total_amount: e.target.value }))}
            />
          </div>
       
          <div>
          <label style={{ color: 'black' }}>
            صورة المنتج:
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
          <button className='Button2'  onClick={() => setIsDeleteModalOpen(false)}>إلغاء</button>
          <button className='Button1'  onClick={() => handleDeleteSubmit(selectedPerson)}>حذف</button>
        </div>
      </Modal>
    </>
  );
};

export default OrgManageShape2;
