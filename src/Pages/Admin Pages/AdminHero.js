import { React, useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminUsers.css'
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AdminHero = () => {
  const [heroes, setheroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedhero, setSelectedhero] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [asset, setAsset] = useState(null);


  useEffect(() => {
    fetch('http://localhost:8000/api/get_hero')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setheroes(data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [updateTrigger]);

  const totalPages = Math.ceil(heroes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currenthero = heroes.slice(startIndex, endIndex);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (hero) => {
    setSelectedhero(hero);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('asset', asset);
      

      const response = await fetch('http://localhost:8000/api/insert_hero', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      setImage(null);
      setAsset(null);
      setUpdateTrigger(prev => !prev);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleDeleteSubmit = async (heroToDelete) => {
    try {
      if (!heroToDelete) {
        console.error('No person selected for deletion');
        return;
      }

      const response = await fetch(`http://localhost:8000/api/update_Hero_section/${heroToDelete.id}`, {
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
    setImage(file);
  };
  const handleAssetChange = (e) => {
    const file = e.target.files[0];
    setAsset(file);
  };
  return (
    <>
      <section className='AdminUsers'>
        <div className='AdminContainers'>
          <table className='InfoTable'>
            <thead>
              <tr>
                <th>الرقم التعريفي</th>
                <th>الصورة</th>
                <th>الملضق</th>
               

                <th>اجراء</th>
                <th><button className='Add-B' onClick={openAddModal}>إضافة</button></th>
              </tr>
            </thead>
            <tbody>
              {currenthero.map((hero) => (
                <tr key={hero.id}>
                  <td>{hero.id}</td>
                  <td>{hero.image}</td>
                  <td>{hero.asset}</td>
                 
                  <td>
                    
                    <button className='DeleteB' onClick={() => openDeleteModal(hero)}>X</button>
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
            <label style={{ color: 'black' }}>الصورة:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div>
            <label style={{ color: 'black' }}>الملصق:</label>
            <input type="file" accept="asset/*" onChange={handleAssetChange} />

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
          <button className='Button1' onClick={() => handleDeleteSubmit(selectedhero)}>حذف</button>
        </div>
      </Modal>
    </>
  )
}

export default AdminHero
