import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './ServicesSearchBar.css';

const ServicesSearchbar = ({ handleSearch }) => {
  
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <form className="search-container">
      <input
        type="text"
        onChange={handleChange}
        placeholder="ابحث عن الخدمة"
        className="search-input"
      />
      <div className="search-button">
        <button type="submit">
          <FaSearch className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default ServicesSearchbar;
