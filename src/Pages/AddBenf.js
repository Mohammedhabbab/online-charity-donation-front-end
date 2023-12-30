import React, { useState } from 'react';
import { useAsyncError } from 'react-router-dom';

const AddBenf = () => {
    const [full_name, setFullName] = useState('');
    const [mother_name, setMotherName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [charity_id, setCharity_id] = useState('');
    const [needy_type, setNeedytype] = useState('');
    const [address, setAddress] = useState('');
    const [overview, setOverview] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [status, setStatus] = useState(0);

    const handleSubmit = async () => {
        try {


            const formData = new FormData();
            formData.append('full_name', full_name);
            formData.append('mother_name', mother_name);
            formData.append('age', age);
            formData.append('gender', gender);
            formData.append('needy_type', needy_type);
            formData.append('charity_id', charity_id);
            formData.append('address', address);
            formData.append('overview', overview);
            formData.append('phone_number', phone_number);
            formData.append('status', status);

            const response = await fetch('http://localhost:8000/api/insert_beneficiar', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Data added successfully!');
                // Optionally, you can reset the form fields here
                setFullName('');
                setMotherName('');
                setAge('');
                setGender('');
                setNeedytype('');
                setAddress('');
                setCharity_id('');
                setOverview('');
                setPhoneNumber('');
                setStatus('0')
            } else {
                console.error('Failed to add data to the database.');
            }
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };

    return (
        <div>
            <h2>Adding urgent</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label>
                    fullname
                    <input type="text" value={full_name} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <br />
                <label>
                    mother name
                    <input type="text" value={mother_name} onChange={(e) => setMotherName(e.target.value)} />
                </label>
                <br />
                <label>
                    age:
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <br />
                <label>
                    needytype:
                    <input type="text" value={needy_type} onChange={(e) => setNeedytype(e.target.value)} />
                </label>
                <br />
                <label>
                    address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <br />
                <label>
                    charity_id:
                    <input type="text" value={charity_id} onChange={(e) => setCharity_id(e.target.value)} />
                </label>
                <br />

                <label>
                    gender:
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </label>
                <br />

                <label>
                    Description:
                    <textarea value={overview} onChange={(e) => setOverview(e.target.value)} />
                </label>
                <br />
                <label>
                    expiration_date:
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <br />

                <button type="submit">Add Data</button>
            </form>
        </div>
    );
};

export default AddBenf;

