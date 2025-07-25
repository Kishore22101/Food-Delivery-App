// src/components/HeroSection.jsx
import React, { useState } from 'react';
import './HeroSection.css';
import { FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleFindRestaurant = () => {
    if (location.trim()) {
      navigate(`/restaurants?location=${encodeURIComponent(location.trim())}`);
    } else {
      alert('Please enter a location');
    }
  };

  return (
    <div className="hero-container">
      {/* Floating Ingredients */}
      <img src="/src/assets/ingredients/tomato.png" className="floating tomato" alt="tomato" />
      <img src="/src/assets/ingredients/basil.png" className="floating basil" alt="basil" />
      <img src="/src/assets/ingredients/garlic.png" className="floating garlic" alt="garlic" />

      {/* Left Text */}
      <div className="hero-left">
        <h1>
          Enjoy Our <br />
          <span>Delicious Meal</span>
        </h1>
        <p>
          Discover top restaurants & dishes near you. <br />
          Fresh. Tasty. Fast.
        </p>

        <div className="location-bar">
          <FiMapPin className="map-icon" />
          <input
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="order-btn" onClick={handleFindRestaurant}>
            Find Restaurant
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hero-right">
        <img src="/assets/hero-food.jpg" alt="Delicious Meal" />
      </div>

      {/* Background Glow Arc */}
      <div className="background-wave" />
    </div>
  );
}

export default HeroSection;
