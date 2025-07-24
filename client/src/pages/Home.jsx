import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import CategoryCards from '../components/CategoryCards';
import foodData from '../data/foodData.json';
import '../styles/Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setItems(foodData);
  }, []);

  // Get unique categories from data, and manually add "All" at the beginning
  const uniqueCategories = [...new Set(foodData.map(item => item.category))];
  const categories = ['All', ...uniqueCategories];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter(item => item.category === selectedCategory);

  return (
    <div className="home-page">
      <div className="filters-section">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <CategoryCards items={filteredItems} />
    </div>
  );
}

export default Home;
