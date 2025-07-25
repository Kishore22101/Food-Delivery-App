import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';
import { SiVisa, SiGooglepay, SiApplepay, SiMastercard } from 'react-icons/si';

function Footer() {
  const userLocation = "Chennai"; // later you can fetch this dynamically

  return (
    <footer className="footer">
      <div className="footer-section footer-left">
        <h2>EatzUp</h2>
        <p>Delicious food delivered to your doorstep in minutes.</p>
        <p>© 2025 EatzUp. All rights reserved.</p>
        <p className="location-info">
          <FaMapMarkerAlt className="location-icon" /> Delivering to <strong>{userLocation}</strong>
        </p>
      </div>

      <div className="footer-section footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li>Home</li>
          <li>Restaurants</li>
          <li>Categories</li>
          <li>Orders</li>
          <li>About</li>
        </ul>
      </div>

      <div className="footer-section footer-contact">
        <h4>Contact Us</h4>
        <p>Email: support@eatzup.com</p>
        <p>Phone: +91 98765 43210</p>

        <div className="footer-socials">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>

        <div className="payment-icons">
          <SiVisa />
          <SiGooglepay />
          <SiApplepay />
          <SiMastercard />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
