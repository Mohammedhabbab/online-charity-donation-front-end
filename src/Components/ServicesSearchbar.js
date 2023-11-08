// ServicesSearchbar.js

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './ServicesSearchBar.css';

const ServicesSearchbar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="ابحث عن الخدمة"
        className="search-input"
      />
      <div className="search-button">
        <FaSearch className="search-icon" />
        <button type="submit">ابحث</button>
      </div>
    </form>
  );
}

export default ServicesSearchbar;
