// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import AuthModal from '../components/AuthModal';

/* ─── SVG Icons ─── */
const IconReceipt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
    <polyline points="9 9 10 9 11 9" />
  </svg>
);
const IconCreditCard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-8.42H6" />
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ─── Coupon Codes ─── */
const COUPONS = {
  FEAST50: { type: 'percent', value: 50, max: 150, label: '50% off (max ₹150)' },
  FREEDEL: { type: 'freedel', value: 0,  max: 0,   label: 'Free Delivery' },
  FLAT100: { type: 'flat',    value: 100, max: 100, label: 'Flat ₹100 off' },
  EATZUP20:{ type: 'percent', value: 20, max: 200, label: '20% off (max ₹200)' },
};

function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [orderId] = useState(uuidv4().slice(0, 8).toUpperCase());
  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(saved);
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      setCurrentUser(JSON.parse(cached));
    } else {
      setShowAuthModal(true);
    }
  }, []);

  const formatDate = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  };

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const foodGST  = subtotal * 0.12;

  // Free delivery if subtotal > 499
  const isFreeDelivery = subtotal > 499 || (appliedCoupon?.type === 'freedel');
  const delivery = isFreeDelivery ? 0 : 70;

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      couponDiscount = Math.min(subtotal * (appliedCoupon.value / 100), appliedCoupon.max);
    } else if (appliedCoupon.type === 'flat') {
      couponDiscount = Math.min(appliedCoupon.value, subtotal);
    }
    // freedel: discount is on delivery, not subtotal
  }

  const grandTotal = subtotal + foodGST + delivery - couponDiscount;

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const found = COUPONS[code];
    if (!found) {
      setCouponError('Invalid coupon code. Try FEAST50, FREEDEL, FLAT100, or EATZUP20.');
      return;
    }
    setAppliedCoupon({ ...found, code });
    setCouponSuccess(`Coupon applied! ${found.label}`);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  const handlePayNow = () => {
    const user = localStorage.getItem('eatzup_user');
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    navigate('/payment', {
      state: {
        cartItems,
        orderId,
        date: formatDate(),
        grandTotal,
        foodSubtotal: subtotal,
        foodGST,
        deliveryCharge: delivery,
        deliveryGST: 0,
        couponDiscount,
        couponLabel: appliedCoupon ? `${appliedCoupon.code} – ${appliedCoupon.label}` : null,
      }
    });
  };

  return (
    <div className="orders-page">
      {/* Brand Header */}
      <div className="orders-brand">
        <img src={logo} alt="EatzUp" className="orders-logo" />
        <span className="orders-brand-name">EatzUp</span>
      </div>

      <div className="orders-title-row">
        <div className="orders-title-icon"><IconReceipt /></div>
        <div>
          <h1 className="orders-title">Confirm Your Order</h1>
          <p className="orders-subtitle">Review your items and proceed to payment</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon"><IconCart /></div>
          <h2>No items in your cart</h2>
          <p>Add items from the menu before placing an order.</p>
          <button className="orders-empty-btn" onClick={() => navigate('/categories')}>
            Browse Menu <IconArrowRight />
          </button>
        </div>
      ) : (
        <div className="orders-layout">
          {/* Invoice Card */}
          <div className="invoice-card">
            <div className="invoice-meta">
              <div className="invoice-meta-item">
                <span className="invoice-meta-label">Invoice ID</span>
                <span className="invoice-meta-value">#{orderId}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="invoice-meta-label">Date</span>
                <span className="invoice-meta-value">{formatDate()}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="invoice-meta-label">GST ID</span>
                <span className="invoice-meta-value">33ABCDE1234F1Z5</span>
              </div>
            </div>

            <div className="invoice-items">
              {cartItems.map((item, idx) => (
                <div className="invoice-item" key={idx}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="invoice-item-img"
                    onError={e => { e.target.src = '/placeholder.jpg'; }}
                  />
                  <div className="invoice-item-details">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <div className="invoice-item-qty">×{item.quantity}</div>
                  <div className="invoice-item-price">&#8377;{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="orders-summary-card">
            <h2 className="orders-summary-title">Bill Summary</h2>

            {/* Free Delivery Banner */}
            {isFreeDelivery && appliedCoupon?.type !== 'freedel' && (
              <div className="free-delivery-badge">
                <IconTruck />
                <span>Free delivery on orders above ₹499!</span>
              </div>
            )}

            <div className="bill-rows">
              <div className="bill-row"><span>Food Subtotal</span><span>&#8377;{subtotal.toFixed(2)}</span></div>
              <div className="bill-row"><span>Food GST (12%)</span><span>&#8377;{foodGST.toFixed(2)}</span></div>
              <div className="bill-row">
                <span>Delivery Charge</span>
                <span>
                  {isFreeDelivery
                    ? <span className="free-tag">FREE</span>
                    : `₹${delivery.toFixed(2)}`
                  }
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="bill-row discount-row">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="discount-amount">− &#8377;{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="bill-row bill-total">
                <span>Grand Total</span>
                <span>&#8377;{Math.max(grandTotal, 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <div className="coupon-section-title">
                <IconTag />
                <span>Have a coupon?</span>
              </div>

              {appliedCoupon ? (
                <div className="coupon-applied-row">
                  <div className="coupon-applied-info">
                    <IconCheck />
                    <span><strong>{appliedCoupon.code}</strong> – {appliedCoupon.label}</span>
                  </div>
                  <button className="coupon-remove-btn" onClick={handleRemoveCoupon} aria-label="Remove coupon">
                    <IconX />
                  </button>
                </div>
              ) : (
                <div className="coupon-input-row">
                  <input
                    id="coupon-input"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    className="coupon-input"
                    maxLength={12}
                  />
                  <button className="coupon-apply-btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
              )}

              {couponError   && <p className="coupon-msg coupon-msg-error">{couponError}</p>}
              {couponSuccess && <p className="coupon-msg coupon-msg-success">{couponSuccess}</p>}

              <div className="coupon-hints">
                <span>Try: FEAST50 · FREEDEL · FLAT100 · EATZUP20</span>
              </div>
            </div>

            <button className="orders-pay-btn" onClick={handlePayNow}>
              <IconCreditCard />
              Pay Now – &#8377;{Math.max(grandTotal, 0).toFixed(2)}
              <IconArrowRight />
            </button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal
          reason="to view and place your order"
          onSuccess={(user) => {
            setCurrentUser(user);
            setShowAuthModal(false);
          }}
          onClose={() => navigate('/cart')}
        />
      )}
    </div>
  );
}

export default Orders;
