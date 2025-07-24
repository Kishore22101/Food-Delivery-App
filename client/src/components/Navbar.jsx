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
        <h1 className="logo">🍴 EatzUp</h1>
      </div>

      <ul className="navbar-menu">
        <li><NavLink to="/menu" activeclassname="active-link">Find Food</NavLink></li>
        <li><NavLink to="/categories" activeclassname="active-link">Categories</NavLink></li>
        <li><NavLink to="/restaurant" activeclassname="active-link">Restaurant</NavLink></li>
        <li><NavLink to="/about" activeclassname="active-link">About Us</NavLink></li>
        <li><NavLink to="/account" activeclassname="active-link">Account</NavLink></li>
        <li><NavLink to="/orders" activeclassname="active-link">Orders</NavLink></li>
        <li><NavLink to="/cart" activeclassname="active-link">Cart</NavLink></li>
      </ul>

      <div className="navbar-right">
        <span className="contact-number">📞 +91 9876543210</span>

        <div className="account-dropdown">
          <NavLink to="/account" activeclassname="active-link">Account</NavLink>
        </div>

        <div className="cart-icon-wrapper">
          <NavLink to="/cart">
            <FiShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </NavLink>
        </div>

        <button className="confirm-btn">
          <NavLink to="/orders">Confirm Order</NavLink>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
