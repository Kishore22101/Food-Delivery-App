import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import CategoryCards from '../components/CategoryCards';
import PopularFoods from '../components/PopularFoods'; // ✅ Imported here
import foodData from '../data/foodData'; // Using real data
import '../styles/Home.css';

// ✅ Dummy fallback data (optional; currently not used)
const dummyFoodItems = [
  { name: "Paneer Tikka", price: 160, category: "North Indian", image: "assets/foods/paneer-tikka.jpg", description: "Grilled marinated paneer cubes." },
  { name: "Chicken Chettinad", price: 190, category: "South Indian", image: "assets/foods/chicken-chettinad.jpg", description: "Spicy Chettinad-style chicken curry." },
  { name: "Chicken Korma", price: 180, category: "North Indian", image: "assets/foods/chicken-korma.jpg", description: "Rich and creamy chicken curry." },
  { name: "Margherita Pizza", price: 180, category: "Italian", image: "assets/foods/margherita-pizza.jpg", description: "Classic pizza with tomato, mozzarella, and basil." },
  { name: "Garlic Bread", price: 90, category: "Italian", image: "assets/foods/garlic-bread.jpg", description: "Toasted bread with garlic and butter." },
];

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const fullPlaceholder = 'Search food by name...';

  useEffect(() => {
    setItems(foodData); // load real food data
  }, []);

  // Typing animation for placeholder
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setPlaceholderText(fullPlaceholder.substring(0, typingIndex + 1));
      setTypingIndex((prev) => (prev < fullPlaceholder.length ? prev + 1 : 0));
    }, 120);

    return () => clearTimeout(typingTimeout);
  }, [typingIndex]);

  const categoriesFromData = [...new Set(foodData.map(item => item.category))];
  const categories = ['All', ...categoriesFromData.filter(cat => cat !== 'All')];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularItems = foodData.slice(0, 6); // Top 6 from original data

  return (
    <div className="home-page">
      {/* Filters */}
      <div className="filters-section">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Search Bar */}
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

      {/* 🔥 Popular Foods */}
      <PopularFoods items={popularItems} />

      {/* 🍽️ Filtered Items */}
      <CategoryCards items={filteredItems} />
    </div>
  );
}

export default Home;
