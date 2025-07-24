import React from 'react';
import './HeroSection.css'; // styling

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Welcome to</h2>
        <h1>
          <span className="highlight">EatzUp</span> Food Delivery
        </h1>
        <p>Your favorite meals delivered fast at your door.</p>
        <button className="order-now-btn">Order Now</button>
      </div>

      <div className="hero-image">
        <img src="/assets/hero-food.jpg" alt="Delicious Food" />
      </div>
    </section>
  );
}

export default HeroSection;
