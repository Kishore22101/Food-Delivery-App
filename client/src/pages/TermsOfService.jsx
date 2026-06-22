// src/pages/TermsOfService.jsx
import React from 'react';
import './PolicyPages.css';

const IconScroll = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
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
  { id: 'acceptance', label: 'Acceptance' },
  { id: 'accounts', label: 'User Accounts' },
  { id: 'ordering', label: 'Ordering & Payment' },
  { id: 'cancellation', label: 'Cancellations & Refunds' },
  { id: 'conduct', label: 'User Conduct' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact' },
];

function TermsOfService() {
  return (
    <div className="policy-page">
      {/* Hero */}
      <div className="policy-hero">
        <div className="policy-hero-content">
          <div className="policy-hero-badge"><IconScroll /><span>Legal</span></div>
          <h1 className="policy-hero-title">Terms of Service</h1>
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
            By accessing or using EatzUp, you agree to be bound by these Terms of Service. Please read them carefully before placing any order.
          </div>

          <div className="policy-section" id="acceptance">
            <p className="policy-section-number">Section 01</p>
            <h2>Acceptance of Terms</h2>
            <p>These Terms of Service ("Terms") govern your use of the EatzUp platform, website, and related services (collectively, the "Service"). By creating an account or placing an order, you confirm that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy">Privacy Policy</a>.</p>
            <p>If you do not agree to these Terms, you may not use our Service.</p>
          </div>

          <div className="policy-section" id="accounts">
            <p className="policy-section-number">Section 02</p>
            <h2>User Accounts</h2>
            <p>To place orders, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Keep your login credentials confidential and not share them with others.</li>
              <li>Notify us immediately of any unauthorised access to your account.</li>
              <li>Take responsibility for all activity that occurs under your account.</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </div>

          <div className="policy-section" id="ordering">
            <p className="policy-section-number">Section 03</p>
            <h2>Ordering &amp; Payment</h2>
            <p>When you place an order through EatzUp, you are making an offer to purchase food from our restaurant partners. By confirming an order you agree to:</p>
            <ul>
              <li>Pay the full amount including applicable taxes and delivery fees.</li>
              <li>Provide a valid delivery address within our serviceable areas.</li>
              <li>Be available to receive the delivery at the specified address and time.</li>
            </ul>
            <p>Prices displayed are in Indian Rupees (₹) and are subject to change. Payment is processed securely via our payment gateway partners.</p>
          </div>

          <div className="policy-section" id="cancellation">
            <p className="policy-section-number">Section 04</p>
            <h2>Cancellations &amp; Refunds</h2>
            <p>Orders may be cancelled within <strong>5 minutes</strong> of placing them, before the restaurant accepts the order. Once accepted, cancellations are subject to restaurant discretion.</p>
            <p>Refunds are processed as follows:</p>
            <ul>
              <li><strong>Unaccepted orders:</strong> Full refund within 3–5 business days.</li>
              <li><strong>Incorrect or damaged items:</strong> Full or partial refund after review.</li>
              <li><strong>Delayed deliveries beyond reasonable time:</strong> Assessed case by case.</li>
            </ul>
            <p>To request a refund, contact <a href="mailto:support@eatzup.com">support@eatzup.com</a> with your order reference number.</p>
          </div>

          <div className="policy-section" id="conduct">
            <p className="policy-section-number">Section 05</p>
            <h2>User Conduct</h2>
            <p>You agree not to use EatzUp to:</p>
            <ul>
              <li>Submit false or fraudulent orders.</li>
              <li>Use automated bots or scripts to access the platform.</li>
              <li>Harass, abuse, or harm delivery partners or restaurant staff.</li>
              <li>Attempt to reverse-engineer, hack, or disrupt our platform.</li>
              <li>Violate any applicable local or national laws.</li>
            </ul>
          </div>

          <div className="policy-section" id="liability">
            <p className="policy-section-number">Section 06</p>
            <h2>Limitation of Liability</h2>
            <p>EatzUp is a student-built project and acts as a platform connecting customers with restaurant partners. We are not liable for:</p>
            <ul>
              <li>The quality, safety, or suitability of food prepared by restaurant partners.</li>
              <li>Delays caused by traffic, weather, or other external factors.</li>
              <li>Indirect, incidental, or consequential damages arising from platform use.</li>
            </ul>
            <p>Our total liability for any claim shall not exceed the amount paid for the order in question.</p>
          </div>

          <div className="policy-section" id="changes">
            <p className="policy-section-number">Section 07</p>
            <h2>Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Changes will be effective upon posting to this page. Continued use of EatzUp after changes are posted constitutes your acceptance of the revised Terms. We will notify registered users of material changes via email.</p>
          </div>

          <div className="policy-section" id="contact">
            <p className="policy-section-number">Section 08</p>
            <h2>Contact Us</h2>
            <p>For questions about these Terms of Service, please reach out:</p>
            <ul>
              <li>Email: <a href="mailto:support@eatzup.com">support@eatzup.com</a></li>
              <li>Team: EatzUp — JNN Institute of Engineering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="policy-cta">
        <h2>Have Questions About Our Terms?</h2>
        <p>We're here to help. Don't hesitate to get in touch.</p>
        <a href="mailto:support@eatzup.com" className="policy-cta-btn press-active">
          <IconMail />Contact Us
        </a>
      </div>
    </div>
  );
}

export default TermsOfService;
