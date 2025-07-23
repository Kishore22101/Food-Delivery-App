import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundSlider from '../components/BackgroundSlider';
import BonusTips from '../components/BonusTips';

const Home = () => {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">

      {/* 🔥 Background Image Slider */}
      <BackgroundSlider />

      {/* 🔥 Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* 🔥 Main Foreground Content */}
      <div className="relative z-10 px-4 pt-24 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          EatzUp - Order Delicious Food Anytime 🍽️
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto drop-shadow-sm">
          Hungry? We deliver hot, fresh, and delicious meals from your favorite restaurants right to your doorstep. Tap. Eat. Smile!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/menu"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition"
          >
            Order Now
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-6 rounded-lg transition"
          >
            Login
          </Link>
        </div>

        {/* ✅ Bonus Tips Section */}
        <div className="mt-10">
          <BonusTips />
        </div>
      </div>
    </div>
  );
};

export default Home;
