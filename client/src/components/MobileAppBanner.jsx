// src/components/MobileAppBanner.jsx
import React from 'react';
import '../styles/MobileAppBanner.css';
import appImage from '../assets/app-download.jpg';

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const IconAndroid = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.523 15.341a1.063 1.063 0 01-1.063 1.063 1.063 1.063 0 01-1.062-1.063 1.063 1.063 0 011.062-1.063 1.063 1.063 0 011.063 1.063zM8.6 15.341a1.063 1.063 0 01-1.062 1.063 1.063 1.063 0 01-1.063-1.063 1.063 1.063 0 011.063-1.063A1.063 1.063 0 018.6 15.341zM17.67 7.5l1.53-2.65a.32.32 0 00-.12-.44.32.32 0 00-.44.12L17.1 7.13C15.92 6.6 14.55 6.3 13 6.3s-2.92.3-4.1.83L7.37 4.53a.32.32 0 00-.44-.12.32.32 0 00-.12.44L8.34 7.5C5.86 8.92 4.17 11.38 4 14.25h16c-.17-2.87-1.86-5.33-4.33-6.75z" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function MobileAppBanner() {
  return (
    <section className="app-banner reveal">
      <div className="app-banner-inner">
        {/* Left Text */}
        <div className="app-text stagger-children">
          <div className="app-label">
            <IconDownload />
            <span>Mobile App</span>
          </div>
          <h2 className="app-title">
            Download the<br />
            <span className="gradient-text">EatzUp App</span>
          </h2>
          <p className="app-desc">
            Get exclusive deals, lightning-fast delivery, and personalized food
            recommendations — right in your pocket.
          </p>

          <div className="app-rating">
            <div className="app-stars">
              {[1,2,3,4,5].map(n => <IconStar key={n} />)}
            </div>
            <span>4.8 · 12,000+ reviews</span>
          </div>

          <div className="app-buttons">
            <button className="app-btn">
              <IconApple />
              <div>
                <div className="app-btn-sub">Download on the</div>
                <div className="app-btn-name">App Store</div>
              </div>
            </button>
            <button className="app-btn">
              <IconAndroid />
              <div>
                <div className="app-btn-sub">Get it on</div>
                <div className="app-btn-name">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="app-image-wrap">
          <div className="app-image-glow" />
          <img src={appImage} alt="EatzUp App Preview" className="app-image" />
        </div>
      </div>
    </section>
  );
}

export default MobileAppBanner;
