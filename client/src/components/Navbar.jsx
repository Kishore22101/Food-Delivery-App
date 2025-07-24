// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css'; // We'll create this CSS next
import { FiMenu, FiShoppingCart } from 'react-icons/fi';

function Navbar() {
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
        <span className="contact-number">📞 +88012345678</span>
        <div className="account-dropdown">Account</div>
        <FiShoppingCart className="cart-icon" />
        <button className="confirm-btn">Confirm Order</button>
      </div>
    </nav>
  );
}

export default Navbar;
