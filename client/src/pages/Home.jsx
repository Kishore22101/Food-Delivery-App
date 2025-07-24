// src/pages/Home.jsx

import React from 'react';
import HeroSection from '../components/HeroSection';
import MobileAppBanner from '../components/MobileAppBanner';
import TodayOffers from '../components/TodayOffers';
import NewsletterSignup from '../components/NewsletterSignup';
import ChefRecommendations from '../components/ChefRecommendations';
import NearbyRestaurants from "../components/NearbyRestaurants";
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* 🍝 Rich Banner with Call to Action */}
      <HeroSection />
      <NearbyRestaurants />
      <TodayOffers />
      <ChefRecommendations />
      <MobileAppBanner />
      <NewsletterSignup />
    </div>
  );
}

export default Home;
