import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import '../../Components/Admin/AdminManageAccount.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
const AdminManageAccount = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isChangePassFormOpen, setIsChangePassFormOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [updatedInfo, setUpdatedInfo] = useState({
        full_name: '',
        email: '',
        mobile_number: '',
        telephone_number: '',
        address: '',
        gender: '',
    });

    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
                    navigate('./admin')
                    throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                setUserData(userData);

                setUpdatedInfo({
                    full_name: userData.full_name,
                    email: userData.email,
                    mobile_number: userData.mobile_number,
                    telephone_number: '',
                    address: userData.address,
                    gender: userData.gender,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location.pathname]);

    const handleEditClick = () => {
        setIsEditFormOpen(true);
    };

    const handleCancelEdit = () => {
        setIsEditFormOpen(false);
    };

    const handleUpdateInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/auth/update_user/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
                body: JSON.stringify(updatedInfo),
            });

            if (response.ok) {
                const updatedUserData = { ...userData, ...updatedInfo };
                setUserData(updatedUserData);
                localStorage.setItem('authUser', JSON.stringify(updatedUserData));
                setIsEditFormOpen(false);
            } else {
                console.error('Failed to update user information:', response.status);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };

    // Password change handlers
    const handlePassChangeClick = () => {
        setIsChangePassFormOpen(true);
    };

    const handleCancelPassChange = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsChangePassFormOpen(false);
    };

    const handlePasswordChange = async () => {
        try {
            if (new_password !== confirmNewPassword) {
                console.error('New passwords do not match.');
                return;
            }

            const user_id = userData.id;

            const changePassResponse = await fetch('http://localhost:8000/api/auth/update_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
                },
                body: JSON.stringify({
                    user_id,
                    current_password,
                    new_password,
                }),
            });

            if (changePassResponse.ok) {
                console.log('Password changed successfully.');
                handleCancelPassChange(); 
            } else {
                console.error('Failed to change password:', changePassResponse.status);
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className="AdminManageAccount">
                <div className="UserInfo">
                    <h2>المعلومات الشخصية</h2>
                    <div className='Info_Button'>
                        <div className='Info'>
                            <label>الاسم:
                                <p>{userData.full_name}</p>
                            </label>
                            <label>البريد الإلكتروني:
                                <p>{userData.email}</p>
                            </label>
                            <label>رقم الهاتف:
                                <p>{userData.mobile_number}</p>
                            </label>
                            <label>الجنس:
                                <p>{userData.gender}</p>
                            </label>
                            <label>العنوان:
                                <p>{userData.address}</p>
                            </label>
                        </div>
                        <button className="EditButton" onClick={handleEditClick}>
                            تعديل المعلومات
                        </button>
                        <button className="ChangePassButton" onClick={handlePassChangeClick}>
                            تغيير كلمة المرور
                        </button>
                    </div>
                </div>
                <AdminSidebar />
            </section>

            {/* Edit Information Modal */}
            <Modal
                isOpen={isEditFormOpen}
                className='ModalAccount'
                onRequestClose={handleCancelEdit}
                contentLabel="Edit Information Modal"
            >
                <div className="ModalContent">
                    <h2>تعديل المعلومات</h2>
                    <label>الاسم:</label>
                    <input
                        type="text"
                        value={updatedInfo.full_name}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, full_name: e.target.value })}
                    />
                    <label>الحساب:</label>
                    <input
                        type="text"
                        value={updatedInfo.email}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, email: e.target.value })}
                    />
                    <label>رقم الهاتف:</label>
                    <input
                        type="text"
                        value={updatedInfo.mobile_number}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, mobile_number: e.target.value })}
                    />
                    <label>الجنس:</label>
                    <input
                        type="text"
                        value={updatedInfo.gender}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, gender: e.target.value })}
                    />
                    <label>العنوان:</label>
                    <input
                        type="text"
                        value={updatedInfo.address}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, address: e.target.value })}
                    />
                    <div className='TwoButtons'>
                        <button className='create' onClick={handleUpdateInfo}>تعديل</button>
                        <button className='cancel' onClick={handleCancelEdit}>إلغاء</button>
                    </div>
                    <button className='Change-Pass'></button>
                </div>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={isChangePassFormOpen}
                className='ModalAccount'
                onRequestClose={handleCancelPassChange}
                contentLabel="Change Password Modal"
            >
                <div className="ModalContent">
                    <h2>تغيير كلمة المرور</h2>
                    <label>كلمة المرور الحالية:</label>
                    <input
                        type="password"
                        value={current_password}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <label>كلمة المرور الجديدة:</label>
                    <input
                        type="password"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label>تأكيد كلمة المرور الجديدة:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <div className='TwoButtons'>
                        <button className='createPass' onClick={handlePasswordChange}>تغيير كلمة المرور</button>
                        <button className='cancelPass' onClick={handleCancelPassChange}>إلغاء</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};


export default AdminManageAccount
