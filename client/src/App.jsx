import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryCards from './components/CategoryCards';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';
import OrderNowButton from './components/OrderNowButton';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCards />
       <OrderNowButton />
      <InfoPanel />
      <Footer />
    </>
  );
}

export default App;
