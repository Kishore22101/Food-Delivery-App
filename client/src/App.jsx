// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoPanel from './components/InfoPanel';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <InfoPanel />
              <Home />
            </>
          } 
        />
        <Route path="/menu" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
