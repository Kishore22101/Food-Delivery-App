// src/pages/CookiePolicy.jsx
import React from 'react';
import './PolicyPages.css';

const IconCookie = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="8" cy="9" r="1" fill="currentColor"/>
    <circle cx="15" cy="8" r="1" fill="currentColor"/>
    <circle cx="14" cy="15" r="1" fill="currentColor"/>
    <circle cx="9" cy="14" r="1" fill="currentColor"/>
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
  { id: 'what', label: 'What Are Cookies' },
  { id: 'types', label: 'Types We Use' },
  { id: 'purpose', label: 'Why We Use Them' },
  { id: 'control', label: 'Your Choices' },
  { id: 'third-party', label: 'Third-Party Cookies' },
  { id: 'contact', label: 'Contact' },
];

function CookiePolicy() {
  return (
    <div className="policy-page">
      {/* Hero */}
      <div className="policy-hero">
        <div className="policy-hero-content">
          <div className="policy-hero-badge"><IconCookie /><span>Legal</span></div>
          <h1 className="policy-hero-title">Cookie Policy</h1>
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
            This Cookie Policy explains how EatzUp uses cookies and similar tracking technologies when you visit our platform, and how you can manage your preferences.
          </div>

          <div className="policy-section" id="what">
            <p className="policy-section-number">Section 01</p>
            <h2>What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device (computer, phone, or tablet) when you visit a website. They help websites remember information about your visit — like your preferences, login session, or items in your cart — making your experience faster and more personalised on your next visit.</p>
            <p>Cookies cannot run programs or deliver viruses to your computer. They are uniquely assigned to your browser and can only be read by the web server that issued them.</p>
          </div>

          <div className="policy-section" id="types">
            <p className="policy-section-number">Section 02</p>
            <h2>Types of Cookies We Use</h2>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for the platform to function correctly. These include session management and authentication cookies. Without them, you cannot log in or place orders.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences, such as saved addresses, language settings, and cart contents between visits.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors use our site — pages visited, time spent, and errors encountered — so we can improve our platform.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Measure and improve the performance and load time of our platform.
              </li>
            </ul>
          </div>

          <div className="policy-section" id="purpose">
            <p className="policy-section-number">Section 03</p>
            <h2>Why We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li>To keep you signed in to your EatzUp account across sessions.</li>
              <li>To remember items you have added to your cart.</li>
              <li>To remember your delivery address preferences.</li>
              <li>To analyse platform traffic and improve our features.</li>
              <li>To detect fraud and ensure the security of transactions.</li>
              <li>To display relevant content based on your browsing activity on our platform.</li>
            </ul>
          </div>

          <div className="policy-section" id="control">
            <p className="policy-section-number">Section 04</p>
            <h2>Your Cookie Choices</h2>
            <p>You have full control over non-essential cookies. You can manage or disable cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
            <p>Please note that disabling essential cookies may prevent you from using core features of EatzUp, such as logging in or completing orders.</p>
          </div>

          <div className="policy-section" id="third-party">
            <p className="policy-section-number">Section 05</p>
            <h2>Third-Party Cookies</h2>
            <p>We may use third-party services that set their own cookies, including:</p>
            <ul>
              <li><strong>Analytics providers</strong> (e.g., Google Analytics) to help us measure traffic and usage patterns.</li>
              <li><strong>Payment processors</strong> to securely handle transaction sessions.</li>
            </ul>
            <p>These third parties have their own privacy policies governing the use of their cookies. We recommend reviewing them separately. EatzUp does not control the cookies set by these third-party services.</p>
          </div>

          <div className="policy-section" id="contact">
            <p className="policy-section-number">Section 06</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
            <ul>
              <li>Email: <a href="mailto:support@eatzup.com">support@eatzup.com</a></li>
              <li>Team: EatzUp — JNN Institute of Engineering</li>
            </ul>
            <p>You can also read our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-of-service">Terms of Service</a> for more information about how we handle your data.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="policy-cta">
        <h2>Questions About Cookies?</h2>
        <p>We're always happy to clarify. Reach out to our team.</p>
        <a href="mailto:support@eatzup.com" className="policy-cta-btn press-active">
          <IconMail />Contact Us
        </a>
      </div>
    </div>
  );
}

export default CookiePolicy;
