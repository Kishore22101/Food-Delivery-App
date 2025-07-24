import React from 'react';
import './HeroSection.css';
import { FiMapPin } from 'react-icons/fi';

function HeroSection() {
  return (
    <div className="hero-container">
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
          <input type="text" placeholder="Enter your location..." />
          <button className="order-btn">Find Restaurant</button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hero-right">
        {/* ✅ Fix: public image usage – don't import, use full path */}
        <img src="/assets/hero-food.jpg" alt="Delicious Meal" />
      </div>

      {/* Background Orange Arc */}
      <div className="background-wave" />
    </div>
  );
}

export default HeroSection;
