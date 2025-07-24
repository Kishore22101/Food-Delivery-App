// src/pages/Home.jsx

import React from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* 🍝 Rich Banner with Call to Action */}
      <HeroSection />
    </div>
  );
}

export default Home;
