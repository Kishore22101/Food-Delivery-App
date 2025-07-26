// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import About from './pages/About';
import Account from './pages/Account';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Footer from './components/Footer'; // ✅ Import Footer
import Payment from './pages/Payment';

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      
      <Footer /> {/* ✅ Add Footer just below Routes */}
    </>
  );
}

export default App;
