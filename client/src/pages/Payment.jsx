// src/pages/Payment.jsx
import React, { useEffect, useState, useRef } from 'react';
import './Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import AuthModal from '../components/AuthModal';
import gpayImg    from '../assets/payment/gpay.png';
import phonepeImg from '../assets/payment/phonepe.png';
import upiImg     from '../assets/payment/upi.png';
import visaImg    from '../assets/payment/visa.png';
import netbankImg from '../assets/payment/netbanking.png';
import codImg     from '../assets/payment/cod.png';
import stamp1     from '../assets/stamp1.png';
import stamp2     from '../assets/stamp2.png';
import stamp3     from '../assets/stamp3.png';
import stamp4     from '../assets/stamp4.png';

/* ─── SVG Icons ─── */
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PAYMENT_METHODS = [
  { name: 'GPay',            img: gpayImg },
  { name: 'PhonePe',        img: phonepeImg },
  { name: 'UPI',             img: upiImg },
  { name: 'Visa/Mastercard', img: visaImg },
  { name: 'Net Banking',     img: netbankImg },
  { name: 'Cash on Delivery',img: codImg },
];

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const state = location.state || {};
  const {
    cartItems = [], orderId = 'N/A', date = '', grandTotal = 0,
    foodSubtotal = 0, foodGST = 0, deliveryCharge = 0,
    couponDiscount = 0, couponLabel = null,
  } = state;

  const [timer, setTimer]         = useState(300);
  const [selectedMethod, setMethod] = useState(null);
  const [paid, setPaid]           = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser]     = useState(null);

  // Redirect if no state
  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
      return;
    }
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      setCurrentUser(JSON.parse(cached));
    } else {
      setShowAuthModal(true);
    }
  }, []);

  useEffect(() => {
    if (paid) return;
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paid, navigate]);

  const fmtTime = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const downloadPDF = async () => {
    await html2pdf().set({
      margin: [10,10,10,10],
      filename: `EatzUp_Invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(invoiceRef.current).save();
  };

  const handleConfirm = async () => {
    if (!selectedMethod) return;
    await downloadPDF();
    localStorage.removeItem('cartItems');
    window.dispatchEvent(new Event('cartUpdated'));
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="payment-success-screen">
        <div className="payment-success-icon"><IconCheck /></div>
        <h1>Payment Successful!</h1>
        <p>Your order <strong>#{orderId}</strong> has been placed.</p>
        <p className="payment-success-sub">Invoice PDF downloaded. Bon appétit!</p>
        <button className="payment-home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* Timer */}
      <div className={`payment-timer${timer < 60 ? ' urgent' : ''}`}>
        <IconClock />
        Session expires in: <strong>{fmtTime(timer)}</strong>
      </div>

      <div className="payment-layout">
        {/* Left: Invoice (used for PDF) */}
        <div className="payment-invoice-col" ref={invoiceRef}>
          <div className="payment-brand">
            <img src={logo} alt="EatzUp" className="payment-logo" />
            <span className="payment-brand-name">EatzUp</span>
          </div>

          <div className="payment-invoice-card">
            <div className="payment-invoice-meta">
              <div><span>Order ID</span><strong>#{orderId}</strong></div>
              <div><span>Date</span><strong>{date}</strong></div>
              <div><span>GST ID</span><strong>33ABCDE1234F1Z5</strong></div>
            </div>

            {currentUser && (
              <div className="payment-delivery-info">
                <div className="payment-delivery-title">
                  <IconShield /> Delivering To:
                </div>
                <div className="payment-delivery-name">{currentUser.name}</div>
                <div className="payment-delivery-text">
                  {currentUser.address} {currentUser.pincode ? `- ${currentUser.pincode}` : ''}
                </div>
                <div className="payment-delivery-text" style={{ fontWeight: 600, marginTop: '2px' }}>
                  Mobile: {currentUser.mobile}
                </div>
              </div>
            )}

            <div className="payment-items-list">
              {cartItems.map((item, idx) => (
                <div className="payment-order-item" key={idx}>
                  <img
                    src={item.image} alt={item.name}
                    className="payment-item-img"
                    onError={e => { e.target.src = '/placeholder.jpg'; }}
                  />
                  <div className="payment-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} &times; &#8377;{item.price}</p>
                  </div>
                  <span className="payment-item-total">&#8377;{item.quantity * item.price}</span>
                </div>
              ))}
            </div>

            <div className="payment-bill-summary">
              <h3>Bill Summary</h3>
              <div className="payment-bill-row"><span>Food Subtotal</span><span>&#8377;{Number(foodSubtotal).toFixed(2)}</span></div>
              <div className="payment-bill-row"><span>GST (12%)</span><span>&#8377;{Number(foodGST).toFixed(2)}</span></div>
              <div className="payment-bill-row">
                <span>Delivery</span>
                <span>{Number(deliveryCharge) === 0 ? 'FREE' : `₹${Number(deliveryCharge).toFixed(2)}`}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="payment-bill-row" style={{ color: '#059669' }}>
                  <span>Coupon Discount</span>
                  <span>− &#8377;{Number(couponDiscount).toFixed(2)}</span>
                </div>
              )}
              {couponLabel && (
                <div className="payment-bill-row" style={{ fontSize: '0.75rem', color: '#6b7280', fontStyle: 'italic' }}>
                  <span>{couponLabel}</span>
                </div>
              )}
              <div className="payment-bill-row payment-grand-total">
                <span>Grand Total</span>
                <span>&#8377;{Number(grandTotal).toFixed(2)}</span>
              </div>
            </div>

            {/* ─── Founders' Stamps ─── */}
            <div className="payment-stamps-row">
              <p className="payment-stamps-label">Authorised by Founders</p>
              <div className="payment-stamps-grid">
                <img src={stamp1} alt="Founder stamp 1" className="payment-stamp" />
                <img src={stamp2} alt="Founder stamp 2" className="payment-stamp" />
                <img src={stamp3} alt="Founder stamp 3" className="payment-stamp" />
                <img src={stamp4} alt="Founder stamp 4" className="payment-stamp" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment */}
        <div className="payment-methods-col">
          <div className="payment-secure-badge">
            <IconShield />
            <span>100% Secure Payment</span>
          </div>

          <h2 className="payment-methods-title">Select Payment Method</h2>
          <div className="payment-methods-grid">
            {PAYMENT_METHODS.map(({ name, img }) => (
              <button
                key={name}
                className={`payment-method-btn${selectedMethod === name ? ' selected' : ''}`}
                onClick={() => setMethod(name)}
              >
                <img src={img} alt={name} className="payment-method-img" />
                <span>{name}</span>
                {selectedMethod === name && (
                  <span className="payment-method-check"><IconCheck /></span>
                )}
              </button>
            ))}
          </div>

          <button
            className={`payment-confirm-btn${!selectedMethod ? ' disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!selectedMethod}
          >
            <IconDownload />
            Confirm &amp; Download Invoice
          </button>

          {!selectedMethod && (
            <p className="payment-select-hint">Please select a payment method to continue.</p>
          )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          reason="to complete payment"
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

export default Payment;
