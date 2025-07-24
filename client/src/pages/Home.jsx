// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import CategoryCards from '../components/CategoryCards';
import foodData from '../data/foodData';
import '../styles/Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const fullPlaceholder = 'Search food by name...';

  useEffect(() => {
    if (foodData && Array.isArray(foodData)) {
      setItems(foodData);
    } else {
      console.error('⚠️ foodData is not an array or is missing.');
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlaceholderText(fullPlaceholder.substring(0, typingIndex + 1));
      setTypingIndex((prev) => (prev < fullPlaceholder.length ? prev + 1 : 0));
    }, 120);
    return () => clearTimeout(timeout);
  }, [typingIndex]);

  const categoriesFromData = [...new Set(foodData.map(item => item.category))];
  const categories = ['All', ...categoriesFromData.filter(cat => cat !== 'All')];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-page">
      <div className="filters-section">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="search-bar-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={placeholderText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-button" onClick={() => setSearchQuery('')}>
              ✖
            </button>
          )}
        </div>
      </div>

      <CategoryCards items={filteredItems} />
    </div>
  );
}

export default Home;
