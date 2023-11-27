import React, { useState } from 'react';  
const HeroAdd = () => {
      
    const [image, setImage] = useState(null);
      const [asset, setAsset] = useState(null);

  const handleImageChange = (e) => {
    // Handle image selection from file input
    const file = e.target.files[0];
    setImage(file);
    };
     const handleAssetChange = (e) => {
    // Handle image selection from file input
    const file = e.target.files[0];
    setAsset(file);
  };
 const handleSubmit = async () => {
    try {
      const formData = new FormData();
           formData.append('image', image);

      formData.append('asset', asset);

      const response = await fetch('http://localhost:8000/api/insert_hero', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Data added successfully!');
        // Optionally, you can reset the form fields here
        setImage(null);
        setAsset(null);
      
      } else {
        console.error('Failed to add data to the database.');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };
 
    return (
      <div><h2>Adding HeroSection</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
         <label>
          asset:
          <input type="file" accept="asset/*" onChange={handleAssetChange} />
        </label>
        <br />
         <button type="submit">Add Data</button>
          </form></div>
    )
  }
  
  export default HeroAdd