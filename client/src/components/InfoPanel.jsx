// src/components/InfoPanel.jsx
import React from 'react';
import './InfoPanel.css';

function InfoPanel() {
  const infoData = [
    {
      emoji: "🍽️",
      title: "500+ Restaurants",
      desc: "Partnered with top-rated restaurants",
    },
    {
      emoji: "🚀",
      title: "Fast Delivery",
      desc: "Your food at your doorstep in 30 mins",
    },
    {
      emoji: "💳",
      title: "Easy Payments",
      desc: "Pay via UPI, card, or cash on delivery",
    },
  ];

  return (
    <div className="info-panel">
      {infoData.map((item, index) => (
        <div key={index} className="info-card">
          <div className="emoji">{item.emoji}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default InfoPanel;
