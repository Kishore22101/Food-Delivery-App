// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/" className="logo">
          <h1>🍴 EatzUp</h1>
        </NavLink>
      </div>

      <ul className="navbar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurants" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Restaurant
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Cart
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">
        <span className="contact-number">📞 +91 9876543210</span>

        <div className="account-dropdown">
          <NavLink to="/account" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Account
          </NavLink>
        </div>

        <div className="cart-icon-wrapper">
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FiShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </NavLink>
        </div>

        <button className="confirm-btn">
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'active-link' : ''}>
            Confirm Order
          </NavLink>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
