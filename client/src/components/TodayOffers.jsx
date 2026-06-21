// src/components/TodayOffers.jsx
import React from 'react';
import '../styles/TodayOffers.css';

const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconGift = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const offers = [
  {
    icon: <IconTag />,
    code: 'FEAST50',
    title: 'Flat 50% OFF',
    desc: 'On orders above ₹499',
    color: '#ff6b00',
    bg: 'rgba(255,107,0,0.08)',
    border: 'rgba(255,107,0,0.2)',
  },
  {
    icon: <IconGift />,
    code: 'BOGO',
    title: 'Buy 1 Get 1 Free',
    desc: 'On selected restaurants',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.2)',
  },
  {
    icon: <IconTruck />,
    code: 'FREEDEL',
    title: 'Free Delivery',
    desc: 'On your first 3 orders',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    border: 'rgba(5,150,105,0.2)',
  },
  {
    icon: <IconZap />,
    code: 'FLASH20',
    title: 'Flash Deal – 20% OFF',
    desc: 'Valid today until midnight',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.2)',
  },
];

function TodayOffers() {
  return (
    <section className="offers-section">
      <div className="offers-header">
        <div className="offers-badge">
          <IconZap />
          <span>Limited Time</span>
        </div>
        <h2 className="offers-title">Today's Hot Offers</h2>
        <p className="offers-subtitle">Use promo codes at checkout — offers updated daily</p>
      </div>

      <div className="offers-grid">
        {offers.map((offer) => (
          <div
            className="offer-card"
            key={offer.code}
            style={{ '--offer-color': offer.color, '--offer-bg': offer.bg, '--offer-border': offer.border }}
          >
            <div className="offer-icon-wrap">
              {offer.icon}
            </div>
            <div className="offer-body">
              <p className="offer-title">{offer.title}</p>
              <p className="offer-desc">{offer.desc}</p>
            </div>
            <div className="offer-code-wrap">
              <span className="offer-code-label">Code</span>
              <span className="offer-code">{offer.code}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TodayOffers;
