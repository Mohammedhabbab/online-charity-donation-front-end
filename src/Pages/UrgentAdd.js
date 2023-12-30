

import React, { useState } from 'react';
import { useAsyncError } from 'react-router-dom';

const UrgentAdd = () => {
    const [name, setName] = useState('');
    const [total_cost, setTotal_cost] = useState('');
    const [amount_paid, setAmount_paid] = useState('');
    const [charity_id, setCharity_id] = useState('');
    const [priority, setPriority] = useState('');
    const [overview, setOverview] = useState('');
    const [expiration_date, setExpiration_date] = useState('');
    const [status, setStatus] = useState(0);

    const handleSubmit = async () => {
        try {
          

            const formData = new FormData();
            formData.append('name', name);
            formData.append('total_cost', total_cost);
            formData.append('amount_paid', amount_paid);
            formData.append('charity_id', charity_id);
            formData.append('priority', priority);
            formData.append('overview', overview);
            formData.append('expiration_date', expiration_date);
            formData.append('status', status);

            const response = await fetch('http://localhost:8000/api/insert_dividable', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Data added successfully!');
                // Optionally, you can reset the form fields here
                setName('');
                setTotal_cost('');
                setAmount_paid('');
                setCharity_id('');
                setPriority('');
                setOverview('');
                setExpiration_date('');
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
                    name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    total cost
                    <input type="text" value={total_cost} onChange={(e) => setTotal_cost(e.target.value)} />
                </label>
                <br />
                <label>
                    amount_paid:
                    <input type="text" value={amount_paid} onChange={(e) => setAmount_paid(e.target.value)} />
                </label>
                <br />
                <label>
                    charity_id:
                    <input type="text" value={charity_id} onChange={(e) => setCharity_id(e.target.value)} />
                </label>
                <br />

                <label>
                    priority:
                    <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
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
                        type="datetime-local"
                        value={expiration_date}
                        onChange={(e) => setExpiration_date(e.target.value) }
                    />
                </label>
                <br />

                <button type="submit">Add Data</button>
            </form>
        </div>
    );
};

export default UrgentAdd;
