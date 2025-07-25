// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import foodData from '../data/foodData';
import CategoryCards from '../components/CategoryCards';
import './Categories.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Categories() {
  const [allFoods, setAllFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const query = useQuery();

  useEffect(() => {
    setAllFoods(foodData);
  }, []);

  useEffect(() => {
    const catParam = query.get('category');
    if (catParam) {
      // Capitalize first letter of each word
      const formatted = catParam
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (['North Indian', 'South Indian', 'Italian'].includes(formatted)) {
        setSelectedCategory(formatted);
      }
    }
  }, [query]);

  const categories = ['All', 'North Indian', 'South Indian', 'Italian'];

  const filteredFoods =
    selectedCategory === 'All'
      ? allFoods
      : allFoods.filter((item) => item.category === selectedCategory);

  return (
    <div className="categories-page">
      <h2 className="section-title">Explore Foods by Category</h2>

      <div className="category-filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${
              selectedCategory === cat ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <CategoryCards items={filteredFoods} />
    </div>
  );
}

export default Categories;
