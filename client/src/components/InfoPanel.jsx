// client/src/components/InfoPanel.jsx
import React from 'react';
import './InfoPanel.css';
import { FaShippingFast, FaStar, FaHeadset } from 'react-icons/fa';

function InfoPanel() {
  return (
    <div className="info-panel">
      <div className="info-card">
        <FaShippingFast className="info-icon" />
        <h3>Fast Delivery</h3>
        <p>Get your food hot and fresh in 30 minutes or less.</p>
      </div>

      <div className="info-card">
        <FaStar className="info-icon" />
        <h3>Top Quality</h3>
        <p>We serve only the best dishes from top-rated chefs.</p>
      </div>

      <div className="info-card">
        <FaHeadset className="info-icon" />
        <h3>24/7 Support</h3>
        <p>We’re here to help you anytime, anywhere.</p>
      </div>
    </div>
  );
}

export default InfoPanel;
