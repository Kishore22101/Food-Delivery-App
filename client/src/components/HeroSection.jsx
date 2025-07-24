import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import CategoryCards from '../components/CategoryCards';
import foodData from '../data/foodData.json'; // assume you have this or static array

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setItems(foodData); // or fetch from API later
  }, []);

  const categories = [...new Set(foodData.map(item => item.category))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CategoryCards items={filteredItems} />
    </div>
  );
}

export default Home;
