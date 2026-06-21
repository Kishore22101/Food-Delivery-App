// src/pages/Account.jsx
import React, { useState, useEffect } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getOrderHistory } from '../utils/api';

/* ─── SVG Icons ─── */
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const IconLogOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
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

function Account() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Tab State: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form inputs (Sign Up)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // Sign In inputs
  const [siEmail, setSiEmail]             = useState('');
  const [siPassword, setSiPassword]       = useState('');

  // UI Status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Edit Profile State ──
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      setCurrentUser(JSON.parse(cached));
      setOrderHistory(getOrderHistory());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eatzup_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('userLoggedOut'));
    setSuccessMsg('Logged out successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEditClick = () => {
    setEditName(currentUser.name || '');
    setEditAddress(currentUser.address || '');
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const updated = { ...currentUser, name: editName.trim(), address: editAddress.trim() };
    localStorage.setItem('eatzup_user', JSON.stringify(updated));
    setCurrentUser(updated);
    setIsEditing(false);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!siEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!siPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email: siEmail.trim(), password: siPassword });
      const userData = response.data.user;
      localStorage.setItem('eatzup_user', JSON.stringify(userData));
      setCurrentUser(userData);
      window.dispatchEvent(new Event('userLoggedIn'));
      setSuccessMsg('Login successful! Welcome back.');
      setSiEmail('');
      setSiPassword('');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!name || !email || !password || !confirmPassword || !mobile || !address || !pincode) {
      setErrorMsg('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({ name, email, password, mobile, address, pincode });
      const userData = response.data.user;
      localStorage.setItem('eatzup_user', JSON.stringify(userData));
      setCurrentUser(userData);
      window.dispatchEvent(new Event('userLoggedIn'));
      setSuccessMsg('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setMobile('');
      setAddress('');
      setPincode('');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="account-page page-wrap reveal animate-fade-up">
      {currentUser ? (
        // ─── Profile Dashboard ───
        <>
          <h1 className="account-page-title">My Account</h1>
          <div className="account-layout">
            {/* Profile Card */}
            <div className="account-profile-card">
              <div className="account-avatar animate-float">
                <IconUser />
              </div>
              <h2 className="account-name">{currentUser.name}</h2>
              <p className="account-email-tag">{currentUser.email}</p>

              <div className="account-info-list">
                <div className="account-info-row">
                  <span className="account-info-icon"><IconMail /></span>
                  <div>
                    <p className="account-info-label">Email Address</p>
                    <p className="account-info-value">{currentUser.email}</p>
                  </div>
                </div>
                <div className="account-info-row">
                  <span className="account-info-icon"><IconPhone /></span>
                  <div>
                    <p className="account-info-label">Mobile Number</p>
                    <p className="account-info-value">{currentUser.mobile || '+91 98765 43210'}</p>
                  </div>
                </div>
                <div className="account-info-row">
                  <span className="account-info-icon"><IconMapPin /></span>
                  <div>
                    <p className="account-info-label">Delivery Address</p>
                    <p className="account-info-value">{currentUser.address || '123, Food Street, Chennai'}</p>
                  </div>
                </div>
                <div className="account-info-row">
                  <span className="account-info-icon"><IconCalendar /></span>
                  <div>
                    <p className="account-info-label">Member Since</p>
                    <p className="account-info-value">{currentUser.joined || 'June 2026'}</p>
                  </div>
                </div>
              </div>

              {successMsg && <div className="auth-alert alert-success" style={{marginTop:'8px'}}>{successMsg}</div>}

              {isEditing ? (
                <div className="account-edit-form">
                  <div className="account-edit-field">
                    <label htmlFor="edit-name">Full Name</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      placeholder="Enter your name"
                      className="account-edit-input"
                    />
                  </div>
                  <div className="account-edit-field">
                    <label htmlFor="edit-address">Delivery Address</label>
                    <input
                      id="edit-address"
                      type="text"
                      value={editAddress}
                      onChange={e => setEditAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="account-edit-input"
                    />
                  </div>
                  <div className="account-edit-actions">
                    <button className="account-action-btn ripple-btn press-active" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button className="account-action-btn ripple-btn press-active" onClick={handleCancelEdit} style={{background:'var(--bg-surface)',color:'var(--text-secondary)'}}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="account-actions">
                  <button className="account-action-btn ripple-btn press-active" onClick={handleEditClick}>
                    <IconEdit />
                    Edit Profile
                  </button>
                  <button className="account-action-btn ripple-btn press-active" onClick={() => navigate('/orders')}>
                    <IconClipboard />
                    My Orders
                  </button>
                  <button className="account-action-btn account-logout-btn ripple-btn press-active" onClick={handleLogout}>
                    <IconLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="account-stats-col">
              <div className="account-stats-top-row">
                <div className="account-stat-card glow-card">
                  <span className="account-stat-value count-up">{orderHistory.length}</span>
                  <span className="account-stat-label">Orders Placed</span>
                </div>
                <div className="account-stat-card glow-card">
                  <span className="account-stat-value count-up">
                    {orderHistory.length > 0
                      ? '₹' + orderHistory.reduce((sum, o) => sum + (o.grandTotal || 0), 0).toLocaleString('en-IN')
                      : '₹0'}
                  </span>
                  <span className="account-stat-label">Total Spent</span>
                </div>
              </div>

              {/* Order History List */}
              <div className="account-order-history">
                <h3 className="account-oh-title">Order History</h3>
                {orderHistory.length === 0 ? (
                  <div className="account-oh-empty">
                    <span>🍽️</span>
                    <p>No orders yet. Start ordering!</p>
                    <button className="account-oh-cta" onClick={() => navigate('/menu')}>Browse Menu</button>
                  </div>
                ) : (
                  <div className="account-oh-list">
                    {orderHistory.slice(0, 5).map((order, i) => (
                      <div className="account-oh-item" key={i}>
                        <div className="account-oh-left">
                          <span className="account-oh-badge">#{order.orderId}</span>
                          <div>
                            <p className="account-oh-items">
                              {order.items?.slice(0, 2).map(it => it.name).join(', ')}
                              {order.items?.length > 2 ? ` +${order.items.length - 2} more` : ''}
                            </p>
                            <p className="account-oh-date">{order.date} · {order.paymentMethod}</p>
                          </div>
                        </div>
                        <span className="account-oh-total">₹{order.grandTotal?.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    {orderHistory.length > 5 && (
                      <button className="account-oh-more" onClick={() => navigate('/orders')}>
                        View all {orderHistory.length} orders
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // ─── Sign In / Sign Up Form ───
        <div className="auth-container">
          <div className="auth-card glow-card">
          <div className="auth-card-strip" />
          <div className="auth-card-inner">
            {/* Header Tabs */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSignupStep('details'); }}
              >
                Sign Up
              </button>
            </div>

            <div className="auth-card-header">
              <h2>{activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{activeTab === 'signin' ? 'Sign in to order your favourite dishes' : 'Register now and start enjoying fast delivery'}</p>
            </div>

            {/* Feedbacks */}
            {errorMsg && <div className="auth-alert alert-error">{errorMsg}</div>}
            {successMsg && <div className="auth-alert alert-success">{successMsg}</div>}

            {activeTab === 'signin' ? (
              // Sign In Form
              <form onSubmit={handleSignIn} className="auth-form stagger-children visible">
                <div className="auth-input-group">
                  <label htmlFor="signin-email">Email Address</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <IconMail />
                    </span>
                    <input 
                      id="signin-email"
                      type="email" 
                      placeholder="e.g. you@example.com" 
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signin-password">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconLock /></span>
                    <input 
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter password" 
                      value={siPassword}
                      onChange={(e) => setSiPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="auth-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="auth-submit-btn ripple-btn press-active"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSignUp} className="auth-form stagger-children visible">
                <div className="auth-input-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconUser /></span>
                    <input 
                      id="signup-name"
                      type="text" 
                      placeholder="e.g. Kishore Kumar" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-email">Email Address</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconMail /></span>
                    <input 
                      id="signup-email"
                      type="email" 
                      placeholder="e.g. you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-password">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconLock /></span>
                    <input 
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Create a password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <button 
                      type="button" 
                      className="auth-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-confirmpassword">Confirm Password</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconLock /></span>
                    <input 
                      id="signup-confirmpassword"
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Confirm your password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-mobile">Mobile Number</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconPhone /></span>
                    <input 
                      id="signup-mobile"
                      type="tel" 
                      placeholder="e.g. +91 98765 43210" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-address">Delivery Address</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconMapPin /></span>
                    <input 
                      id="signup-address"
                      type="text" 
                      placeholder="e.g. 123, Food Street, Chennai" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="signup-pincode">Pin Code</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><IconMapPin /></span>
                    <input 
                      id="signup-pincode"
                      type="text" 
                      placeholder="e.g. 600001" 
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn ripple-btn press-active"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Account;
