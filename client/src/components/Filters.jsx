import React from 'react';
import './Filters.css';

function Filters({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="filters-container">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filters;
