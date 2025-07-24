// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import foodData from '../data/foodData'; // or './data/foodData' if same level
import CategoryCards from '../components/CategoryCards';
import './Categories.css'; // make sure this file exists!

function Categories() {
  const [allFoods, setAllFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setAllFoods(foodData); // load all food initially
  }, []);

  const categories = ['All', 'North Indian', 'South Indian', 'Italian'];

  const filteredFoods =
    selectedCategory === 'All'
      ? allFoods
      : allFoods.filter((item) => item.category === selectedCategory);

  return (
    <div className="categories-page">
      <h2 className="section-title">Explore Foods by Category</h2>

      {/* Filter Buttons */}
      <div className="category-filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <CategoryCards items={filteredFoods} />
    </div>
  );
}

export default Categories;
