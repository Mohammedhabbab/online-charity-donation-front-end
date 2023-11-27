import React, { useState } from 'react';

const Adding = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    // Handle image selection from file input
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('url', url);
      formData.append('description', description);
      formData.append('image', image);

      const response = await fetch('http://localhost:8000/api/insert_service', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Data added successfully!');
        // Optionally, you can reset the form fields here
        setTitle('');
        setUrl('');
        setDescription('');
        setImage(null);
      } else {
        console.error('Failed to add data to the database.');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  return (
    <div>
      <h2>Adding Service</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Add Data</button>
      </form>

     
    </div>
  );
};

export default Adding;
