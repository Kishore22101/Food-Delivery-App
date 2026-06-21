// src/components/AuthModal.jsx
import React, { useState, useEffect } from 'react';
import './AuthModal.css';
import { loginUser, registerUser } from '../utils/api';

/* ─── Icons ─── */
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.5a19.79 19.79 0 01-3-8.6A2 2 0 012.48 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91A16 16 0 0016.09 17l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0124 18v.08l-2 .84z" />
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/**
 * AuthModal — full-screen overlay asking users to sign in / sign up.
 * Props:
 *  - onSuccess(userData) : called after successful auth
 *  - onClose()           : called when user clicks backdrop/X (optional cancel)
 *  - reason              : string shown as context ("to proceed to payment", etc.)
 */
function AuthModal({ onSuccess, onClose, reason = 'to continue' }) {
  const [tab, setTab]                 = useState('signin');
  const [showPass, setShowPass]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  // Sign-in fields
  const [siEmail, setSiEmail]             = useState('');
  const [siPassword, setSiPassword]       = useState('');

  // Sign-up fields
  const [suName, setSuName]                       = useState('');
  const [suEmail, setSuEmail]                     = useState('');
  const [suPassword, setSuPassword]               = useState('');
  const [suConfirmPassword, setSuConfirmPassword] = useState('');
  const [suMobile, setSuMobile]                   = useState('');
  const [suAddress, setSuAddress]                 = useState('');
  const [suPincode, setSuPincode]                 = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!siEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!siPassword) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser({ email: siEmail.trim(), password: siPassword });
      const user = res.data.user;
      localStorage.setItem('eatzup_user', JSON.stringify(user));
      window.dispatchEvent(new Event('userLoggedIn'));
      onSuccess(user);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!suName || !suEmail || !suPassword || !suConfirmPassword || !suMobile || !suAddress || !suPincode) {
      setError('All fields are required.');
      return;
    }
    if (suPassword !== suConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ name: suName, email: suEmail, password: suPassword, mobile: suMobile, address: suAddress, pincode: suPincode });
      const user = res.data.user;
      localStorage.setItem('eatzup_user', JSON.stringify(user));
      window.dispatchEvent(new Event('userLoggedIn'));
      onSuccess(user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" role="dialog" aria-modal="true" aria-label="Sign in required">
      {/* Backdrop — click to close */}
      <div className="auth-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="auth-modal-card">
        {/* Close button */}
        {onClose && (
          <button className="auth-modal-close" onClick={onClose} aria-label="Close">
            <IconX />
          </button>
        )}

        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-modal-icon">
            <IconShield />
          </div>
          <h2 className="auth-modal-title">Sign In Required</h2>
          <p className="auth-modal-subtitle">
            Please sign in or create an account {reason}
          </p>
        </div>

        {/* Tabs */}
        <div className="auth-modal-tabs">
          <button
            id="auth-modal-signin-tab"
            className={`auth-modal-tab${tab === 'signin' ? ' active' : ''}`}
            onClick={() => { setTab('signin'); setError(''); }}
          >
            Sign In
          </button>
          <button
            id="auth-modal-signup-tab"
            className={`auth-modal-tab${tab === 'signup' ? ' active' : ''}`}
            onClick={() => { setTab('signup'); setError(''); }}
          >
            Sign Up
          </button>
          <div className={`auth-modal-tab-indicator${tab === 'signup' ? ' right' : ''}`} />
        </div>

        {/* Error banner */}
        {error && <div className="auth-modal-error" role="alert">{error}</div>}

        {/* ── Sign In Form ── */}
        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="auth-modal-form" id="auth-modal-signin-form">
            <div className="auth-modal-field">
              <label htmlFor="am-si-email">Email Address</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon">
                  <IconMail />
                </span>
                <input
                  id="am-si-email"
                  type="email"
                  placeholder="you@example.com"
                  value={siEmail}
                  onChange={e => setSiEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="auth-modal-field">
              <label htmlFor="am-si-password">Password</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconLock /></span>
                <input
                  id="am-si-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={siPassword}
                  onChange={e => setSiPassword(e.target.value)}
                  required
                />
                <button type="button" className="auth-modal-eye" onClick={() => setShowPass(p => !p)} aria-label="Toggle password">
                  {showPass ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>
            <button id="auth-modal-signin-btn" type="submit" className="auth-modal-submit" disabled={loading}>
              {loading ? <span className="auth-modal-spinner" /> : 'Sign In & Continue'}
            </button>
          </form>
        ) : (
          /* ── Sign Up Form ── */
          <form onSubmit={handleSignUp} className="auth-modal-form" id="auth-modal-signup-form">
            <div className="auth-modal-field">
              <label htmlFor="am-su-name">Full Name</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconUser /></span>
                <input id="am-su-name" type="text" placeholder="Your full name" value={suName} onChange={e => setSuName(e.target.value)} required autoFocus />
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-email">Email Address</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconMail /></span>
                <input id="am-su-email" type="email" placeholder="you@example.com" value={suEmail} onChange={e => setSuEmail(e.target.value)} required />
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-password">Password</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconLock /></span>
                <input id="am-su-password" type={showPass ? 'text' : 'password'} placeholder="Create password" value={suPassword} onChange={e => setSuPassword(e.target.value)} required />
                <button type="button" className="auth-modal-eye" onClick={() => setShowPass(p => !p)} aria-label="Toggle">
                  {showPass ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-confirmpassword">Confirm Password</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconLock /></span>
                <input id="am-su-confirmpassword" type={showPass ? 'text' : 'password'} placeholder="Confirm your password" value={suConfirmPassword} onChange={e => setSuConfirmPassword(e.target.value)} required />
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-mobile">Mobile Number</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconPhone /></span>
                <input id="am-su-mobile" type="tel" placeholder="+91 98765 43210" value={suMobile} onChange={e => setSuMobile(e.target.value)} required />
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-address">Delivery Address</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconMapPin /></span>
                <input id="am-su-address" type="text" placeholder="123, Street, City" value={suAddress} onChange={e => setSuAddress(e.target.value)} required />
              </div>
            </div>
            <div className="auth-modal-field">
              <label htmlFor="am-su-pincode">Pin Code</label>
              <div className="auth-modal-input-wrap">
                <span className="auth-modal-input-icon"><IconMapPin /></span>
                <input id="am-su-pincode" type="text" placeholder="600001" value={suPincode} onChange={e => setSuPincode(e.target.value)} required />
              </div>
            </div>
            <button id="auth-modal-signup-btn" type="submit" className="auth-modal-submit" disabled={loading}>
              {loading ? <span className="auth-modal-spinner" /> : 'Create Account & Continue'}
            </button>
          </form>
        )}

        <p className="auth-modal-note">
          <IconShield /> Your information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
