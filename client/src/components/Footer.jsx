// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

/* ─── SVG Icons ─── */
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.58C5.12 20.04 12 20.04 12 20.04s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.5a19.79 19.79 0 01-3-8.6A2 2 0 012.48 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91A16 16 0 0016.09 17l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0124 18v.08l-2 .84z" />
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/categories',  label: 'Categories' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/orders',      label: 'Orders' },
  { to: '/about',       label: 'About Us' },
  { to: '/account',     label: 'Account' },
];

const socials = [
  { icon: <IconFacebook />,  href: '#', label: 'Facebook' },
  { icon: <IconInstagram />, href: '#', label: 'Instagram' },
  { icon: <IconTwitter />,   href: '#', label: 'Twitter' },
  { icon: <IconYoutube />,   href: '#', label: 'YouTube' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={logo} alt="EatzUp" className="footer-logo" />
            <span className="footer-brand-name">EatzUp</span>
          </div>
          <p className="footer-tagline">
            Delicious food delivered to your doorstep in minutes. Fresh, fast, and always reliable.
          </p>
          <div className="footer-location">
            <IconMapPin />
            <span>Delivering to <strong>Chennai & across South India</strong></span>
          </div>
          <div className="footer-socials">
            {socials.map(({ icon, href, label }) => (
              <a key={label} href={href} className="footer-social-btn" aria-label={label} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className="footer-link">{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <a href="mailto:support@eatzup.com" className="footer-contact-item">
                <IconMail />
                support@eatzup.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="footer-contact-item">
                <IconPhone />
                +91 98765 43210
              </a>
            </li>
          </ul>
          <div className="footer-hours">
            <h5>Service Hours</h5>
            <p>Monday – Sunday</p>
            <p>8:00 AM – 11:00 PM</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EatzUp. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
