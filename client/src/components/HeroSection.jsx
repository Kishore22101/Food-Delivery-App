import React from 'react';
import './HeroSection.css';
import pizzaImage from '../assets/pizza.jpg'; // Replace with your actual image

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Hungry?</h2>
        <h1>Order Fresh Food <span className="highlight">Anytime</span></h1>
        <p>Fast delivery at your doorstep, from your favorite restaurants.</p>
        <button className="order-now-btn">Order Now</button>
      </div>
      <div className="hero-image">
        <img src={pizzaImage} alt="Delicious Food" />
      </div>
    </section>
  );
}

export default HeroSection;
