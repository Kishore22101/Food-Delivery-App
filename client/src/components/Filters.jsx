// Filters.jsx
import React from 'react';
import './Filters.css';

function Filters({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="filters">
      <button
        className={selectedCategory === 'All' ? 'active' : ''}
        onClick={() => setSelectedCategory('All')}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filters;
