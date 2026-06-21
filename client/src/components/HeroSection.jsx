import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import heroFood from '../hero-food.jpg';
import pizzaImg from '../assets/pizza.jpg';
import tomatoImg from '../assets/ingredients/tomato.png';

/* ─── SVG Icons ─── */
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconPercent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

/* ── Fake reviewer avatars as colored initials ── */
const reviewers = [
  { initials: 'AR', bg: '#E8303A' },
  { initials: 'MK', bg: '#4A90D9' },
  { initials: 'SP', bg: '#27AE60' },
];

function HeroSection() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [count, setCount] = useState(0);

  // Counter animation
  useEffect(() => {
    let start = 0;
    const end = 50;
    const duration = 1800; // 1.8s count up
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Parallax mouse movements
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    heroRef.current.style.setProperty('--mx', x);
    heroRef.current.style.setProperty('--my', y);
  };

  const handleMouseLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--mx', 0);
    heroRef.current.style.setProperty('--my', 0);
  };

  return (
    <section 
      ref={heroRef}
      className="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero section"
    >
      {/* Decorative blobs */}
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />

      <div className="hero-inner">
        {/* ── Left Content ── */}
        <div className="hero-content">
          <h1 className="hero-title animate-fade-up">
            it's not just<br />
            Food,{' '}
            <span className="hero-title-italic">It's an</span><br />
            <span className="hero-experience-wrap">
              Experience.
              <svg className="hero-underline-svg" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                <path d="M5 15 C 50 16, 150 19, 195 11 C 120 18, 60 13, 10 15" stroke="var(--brand-primary)" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="hero-cta animate-fade-up anim-d2">
            <button
              id="hero-view-menu-btn"
              className="hero-btn-primary"
              onClick={() => navigate('/categories')}
              aria-label="View our menu"
            >
              View Menu
              <IconArrowRight />
            </button>
            <button
              id="hero-book-table-btn"
              className="hero-btn-outline"
              onClick={() => navigate('/restaurants')}
              aria-label="Book a table"
            >
              Book A Table
            </button>
          </div>

          {/* Reviews row */}
          <div className="hero-reviews animate-fade-up anim-d3">
            <div className="hero-review-avatars" aria-hidden="true">
              {reviewers.map((r) => (
                <div key={r.initials} className="hero-avatar" style={{ background: r.bg }}>
                  {r.initials}
                </div>
              ))}
            </div>
            <div className="hero-review-text">
              <div className="hero-stars" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => <IconStar key={i} />)}
              </div>
              <span className="hero-review-label">{count}k+ happy customers</span>
            </div>
          </div>
        </div>

        {/* ── Right Image ── */}
        <div className="hero-image-wrap animate-fade-right anim-d1">
          {/* Discount pill — top left of image */}
          <div className="hero-parallax-wrap-discount">
            <div className="hero-discount-pill" aria-label="5% discount for 2 orders">
              <div className="hero-discount-icon">
                <IconPercent />
              </div>
              <div>
                <div className="hero-discount-value">5%</div>
                <div className="hero-discount-sub">off</div>
              </div>
            </div>
          </div>

          {/* Rotating ring */}
          <div className="hero-image-ring" aria-hidden="true" />

          {/* Floating circular Pizza (Bottom-Left) */}
          <div className="hero-parallax-wrap-pizza" aria-hidden="true">
            <img src={pizzaImg} alt="Fresh Pizza" className="hero-floating-pizza" />
          </div>

          {/* Floating transparent Tomato ingredient (Top-Right) */}
          <div className="hero-parallax-wrap-tomato" aria-hidden="true">
            <img src={tomatoImg} alt="Fresh Tomato" className="hero-floating-tomato" />
          </div>

          <img 
            src={heroFood} 
            alt="Delicious pasta bowl"
            className="hero-image"
            width="480"
            height="480"
          />

          {/* Delivery time pill */}
          <div className="hero-parallax-wrap-delivery">
            <div className="hero-pill hero-pill-bottom" aria-label="25 minute delivery">
              <div className="hero-pill-icon">
                <IconClock />
              </div>
              <div>
                <div className="hero-pill-value">25 min</div>
                <div className="hero-pill-sub">delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;


