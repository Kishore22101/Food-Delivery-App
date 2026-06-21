// src/components/NewsletterSignup.jsx
import React, { useState } from 'react';
import '../styles/NewsletterSignup.css';

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-icon-wrap">
          <IconMail />
        </div>

        <h2 className="newsletter-title">Stay Updated with Offers</h2>
        <p className="newsletter-subtitle">
          Subscribe to our newsletter and never miss out on tasty deals, new restaurants, and seasonal specials.
        </p>

        {subscribed ? (
          <div className="newsletter-success">
            <span className="newsletter-success-icon"><IconCheck /></span>
            <p>You're subscribed! Check your inbox for a welcome treat.</p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter-input-wrap">
              <span className="newsletter-input-icon"><IconMail /></span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                aria-label="Email address"
                required
              />
            </div>
            {error && <p className="newsletter-error">{error}</p>}
            <button type="submit" className="newsletter-btn">
              Subscribe Now
              <IconArrowRight />
            </button>
          </form>
        )}

        <p className="newsletter-note">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

export default NewsletterSignup;
