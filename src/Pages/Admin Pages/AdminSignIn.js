import '../../Components/Admin/AdminSign.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signError, setSignError] = useState('');

    const navigate = useNavigate();

    const validatePassword = (password) => {
        return password.length >= 7;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        if (!validatePassword(signInPassword)) {
            setPasswordError('Password should have at least 8 characters.');
            return;
        }

        if (!validateEmail(signInEmail)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        if (!signInEmail || !signInPassword) {
            setEmailError('Please fill in both email and password.');
            return;
        }

        const signInBody = {
            email: signInEmail,
            password: signInPassword,
            type_of_user: "admin"
        };

        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signInBody),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    localStorage.setItem('authToken', data.access_token);
                    navigate('/admin/dashboard');
                } else {
                    console.log('Invalid login. Please try again.');
                    setSignError('email or password wrong or both.');

                }
            })
            .catch(() => {
                console.log('An error occurred. Please try again.');
            });
    };

    return (
        <>
            <section className='AdminSign'>
                <div className='AdminBox'>
                    <h2>تسجيل الدخول</h2>
                    <div>
                        <form>
                            <h3>الحساب</h3>
                            <input
                                type='email'
                                placeholder='Email'
                                value={signInEmail}
                                onChange={(e) => setSignInEmail(e.target.value)}
                            />
                            {emailError && <p className="error">{emailError}</p>}
                            <h3>كلمة المرور</h3>
                            <input
                                type='password'
                                placeholder='Password'
                                value={signInPassword}
                                onChange={(e) => setSignInPassword(e.target.value)}
                            />
                            {passwordError && <p className="error">{passwordError}</p>}
                            <button onClick={handleSignIn}>تسجيل الدخول</button>
                            {signError && <p className="Serror">{signError}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminSignIn;
