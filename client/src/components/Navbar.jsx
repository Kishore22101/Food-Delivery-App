// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-icon">
          <FiMenu />
        </button>
        <h1 className="logo">🍴 EatzUp</h1>
      </div>

      <ul className="navbar-menu">
        <li>Find Food</li>
        <li>Categories</li>
        <li>Restaurant</li>
        <li>About Us</li>
      </ul>

      <div className="navbar-right">
        <span className="contact-number">📞 +91 9876543210</span>
        <div className="account-dropdown">Account</div>

        {/* 🛒 Cart Icon with Count */}
        <div className="cart-icon-wrapper">
          <FiShoppingCart className="cart-icon" />
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
        </div>

        <button className="confirm-btn">Confirm Order</button>
      </div>
    </nav>
  );
}

export default Navbar;
