import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import InfoPanel from '../components/InfoPanel';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryCards />
      <InfoPanel />
      <Footer />
    </div>
  );
}

export default Home;
