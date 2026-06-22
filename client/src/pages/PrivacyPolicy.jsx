// src/pages/PrivacyPolicy.jsx
import React from 'react';
import './PolicyPages.css';

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const sections = [
  { id: 'information', label: 'Information We Collect' },
  { id: 'usage', label: 'How We Use It' },
  { id: 'sharing', label: 'Sharing & Disclosure' },
  { id: 'security', label: 'Data Security' },
  { id: 'rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'contact', label: 'Contact' },
];

function PrivacyPolicy() {
  return (
    <div className="policy-page">
      {/* Hero */}
      <div className="policy-hero">
        <div className="policy-hero-content">
          <div className="policy-hero-badge"><IconShield /><span>Legal</span></div>
          <h1 className="policy-hero-title">Privacy Policy</h1>
          <p className="policy-hero-meta"><IconCalendar />Last updated: June 22, 2026</p>
        </div>
      </div>

      {/* Body */}
      <div className="policy-body">
        {/* ToC */}
        <nav className="policy-toc" aria-label="Table of contents">
          <h4>Contents</h4>
          <ul className="policy-toc-list">
            {sections.map(s => (
              <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="policy-content">
          <div className="policy-highlight">
            EatzUp is a student-built food delivery platform. We are committed to protecting your privacy and handling your personal data with care and transparency.
          </div>

          <div className="policy-section" id="information">
            <p className="policy-section-number">Section 01</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, place an order, or contact us for support:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, and password.</li>
              <li><strong>Order Information:</strong> Delivery address, order history, and payment method details.</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device identifiers, and operating system.</li>
              <li><strong>Usage Data:</strong> Pages visited, items viewed, and interactions with the platform.</li>
            </ul>
          </div>

          <div className="policy-section" id="usage">
            <p className="policy-section-number">Section 02</p>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and deliver your food orders accurately and promptly.</li>
              <li>Send order confirmations, updates, and support messages.</li>
              <li>Personalize your experience and recommend dishes you may enjoy.</li>
              <li>Improve and develop our platform features and services.</li>
              <li>Detect fraud and ensure the security of your account.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </div>

          <div className="policy-section" id="sharing">
            <p className="policy-section-number">Section 03</p>
            <h2>Sharing &amp; Disclosure</h2>
            <p>We do not sell your personal information to third parties. We may share information with:</p>
            <ul>
              <li><strong>Restaurant Partners:</strong> To fulfil and prepare your orders.</li>
              <li><strong>Payment Processors:</strong> Securely handle transactions on your behalf.</li>
              <li><strong>Service Providers:</strong> Cloud hosting, analytics, and support tools — all bound by confidentiality agreements.</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights.</li>
            </ul>
          </div>

          <div className="policy-section" id="security">
            <p className="policy-section-number">Section 04</p>
            <h2>Data Security</h2>
            <p>We implement industry-standard security measures including SSL/TLS encryption, secure password hashing, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your EatzUp account.</p>
          </div>

          <div className="policy-section" id="rights">
            <p className="policy-section-number">Section 05</p>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and download a copy of your personal data.</li>
              <li>Request correction of inaccurate or outdated information.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Opt out of marketing emails at any time via the unsubscribe link.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:support@eatzup.com">support@eatzup.com</a>.</p>
          </div>

          <div className="policy-section" id="cookies">
            <p className="policy-section-number">Section 06</p>
            <h2>Cookies</h2>
            <p>We use cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and personalise content. You can control cookie settings through your browser preferences. For details, please read our <a href="/cookie-policy">Cookie Policy</a>.</p>
          </div>

          <div className="policy-section" id="contact">
            <p className="policy-section-number">Section 07</p>
            <h2>Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
            <ul>
              <li>Email: <a href="mailto:support@eatzup.com">support@eatzup.com</a></li>
              <li>Team: EatzUp — JNN Institute of Engineering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="policy-cta">
        <h2>Questions About Your Privacy?</h2>
        <p>We're happy to help. Reach out to our team anytime.</p>
        <a href="mailto:support@eatzup.com" className="policy-cta-btn press-active">
          <IconMail />Contact Us
        </a>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
