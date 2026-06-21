// src/components/Navbar.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

/* ─── Icons ─── */
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconMenu2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </svg>
);
const IconRestaurant = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8h1a4 4 0 010 8h-1" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);
const IconAbout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconOrders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── Animated Hamburger ─── */
const HamburgerBtn = ({ open, onClick }) => (
  <button
    className={`hamburger-btn${open ? ' open' : ''}`}
    onClick={onClick}
    aria-label="Toggle navigation menu"
    aria-expanded={open}
    id="nav-menu-toggle"
  >
    <span className="ham-bar ham-bar-top" />
    <span className="ham-bar ham-bar-mid" />
    <span className="ham-bar ham-bar-bot" />
  </button>
);

/* ─── Nav link definitions ─── */
const NAV_LINKS = [
  { to: '/',            label: 'Home',        icon: <IconHome /> },
  { to: '/categories',  label: 'Menu',        icon: <IconMenu2 /> },
  { to: '/restaurants', label: 'Restaurants', icon: <IconRestaurant /> },
  { to: '/about',       label: 'About Us',    icon: <IconAbout /> },
  { to: '/orders',      label: 'Orders',      icon: <IconOrders /> },
];

function Navbar() {
  const [cartCount, setCartCount]   = useState(0);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate   = useNavigate();
  const location   = useLocation();

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const readCart = useCallback(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const readUser = useCallback(() => {
    const cached = localStorage.getItem('eatzup_user');
    setCurrentUser(cached ? JSON.parse(cached) : null);
  }, []);

  useEffect(() => {
    readCart();
    readUser();
    window.addEventListener('storage', readCart);
    window.addEventListener('cartUpdated', readCart);
    window.addEventListener('userLoggedIn', readUser);
    window.addEventListener('userLoggedOut', readUser);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('storage', readCart);
      window.removeEventListener('cartUpdated', readCart);
      window.removeEventListener('userLoggedIn', readUser);
      window.removeEventListener('userLoggedOut', readUser);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [readCart, readUser]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu  = () => setMenuOpen(false);

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Left: Hamburger + Logo */}
        <div className="navbar-left">
          <HamburgerBtn open={menuOpen} onClick={toggleMenu} />
          <NavLink to="/" className="navbar-brand" onClick={closeMenu} aria-label="EatzUp Home">
            <img src={logo} alt="EatzUp" className="navbar-logo" />
            <span className="navbar-brand-text">
              <span className="brand-e">E</span>atz<span className="brand-up">Up</span>
            </span>
          </NavLink>
        </div>

        {/* Center: Desktop Nav Links */}
        <ul className="navbar-menu-desktop" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} role="listitem">
              <NavLink
                to={to}
                id={`nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Cart + Account */}
        <div className="navbar-right">
          <NavLink to="/cart" className="navbar-cart" id="nav-cart-btn" aria-label={`Cart (${cartCount} items)`}>
            <IconCart />
            {cartCount > 0 && (
              <span key={cartCount} className="cart-badge badge-pop">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </NavLink>

          {currentUser ? (
            <NavLink to="/account" className="navbar-user-avatar" id="nav-account-btn" title="View Account">
              {getInitials(currentUser.name)}
            </NavLink>
          ) : (
            <NavLink to="/account" className="navbar-signup-btn" id="nav-signup-btn">
              Sign Up
            </NavLink>
          )}
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        className={`mobile-drawer-backdrop${menuOpen ? ' visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ── */}
      <aside className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <img src={logo} alt="EatzUp" className="drawer-logo" />
            <span className="drawer-brand-text">
              <span className="brand-e">E</span>atz<span className="brand-up">Up</span>
            </span>
          </div>
          {currentUser && (
            <div className="drawer-user-chip">
              <div className="drawer-user-avatar">{getInitials(currentUser.name)}</div>
              <div className="drawer-user-info">
                <span className="drawer-user-name">{currentUser.name}</span>
                <span className="drawer-user-email">{currentUser.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Nav Links */}
        <nav className="drawer-nav" aria-label="Mobile navigation links">
          <p className="drawer-section-label">Navigation</p>
          <ul className="drawer-links" role="list">
            {NAV_LINKS.map(({ to, label, icon }, idx) => (
              <li key={to} role="listitem" style={{ animationDelay: `${idx * 60}ms` }} className={menuOpen ? 'drawer-item-enter' : ''}>
                <NavLink
                  to={to}
                  id={`mobile-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) => `drawer-link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="drawer-link-icon">{icon}</span>
                  <span className="drawer-link-label">{label}</span>
                  <span className="drawer-link-arrow">›</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          {currentUser ? (
            <NavLink to="/account" className="drawer-account-btn" onClick={closeMenu}>
              <IconUser />
              My Account
            </NavLink>
          ) : (
            <NavLink to="/account" className="drawer-signin-btn" onClick={closeMenu}>
              <IconUser />
              Sign In / Sign Up
            </NavLink>
          )}
          <NavLink to="/cart" className="drawer-cart-btn" onClick={closeMenu}>
            <IconCart />
            My Cart
            {cartCount > 0 && <span className="drawer-cart-count">{cartCount}</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
