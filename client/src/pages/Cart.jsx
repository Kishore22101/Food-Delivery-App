// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import AuthModal from '../components/AuthModal';

/* ─── SVG Icons ─── */
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
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

const dispatchCartUpdate = () => window.dispatchEvent(new Event('cartUpdated'));

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(saved);
  }, []);

  const handleCheckout = () => {
    const user = localStorage.getItem('eatzup_user');
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/orders');
    }
  };

  const saveCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    dispatchCartUpdate();
  };

  const handleIncrease = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    saveCart(updated);
  };

  const handleDecrease = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity <= 1) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity -= 1;
    }
    saveCart(updated);
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    saveCart(updated);
  };

  const subtotal = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
  const gst = subtotal * 0.12;
  const delivery = cartItems.length > 0 ? 70 : 0;
  const total = subtotal + gst + delivery;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        {cartItems.length > 0 && (
          <span className="cart-item-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon"><IconCart /></div>
          <h2>Your cart is empty</h2>
          <p>Add items from the menu to get started.</p>
          <button className="cart-empty-btn" onClick={() => navigate('/categories')}>
            Browse Menu
            <IconArrowRight />
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items-col">
            <ul className="cart-list">
              {cartItems.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={e => { e.target.src = '/placeholder.jpg'; }}
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-unit-price">&#8377;{item.price} each</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-ctrl">
                      <button className="cart-qty-btn" onClick={() => handleDecrease(idx)} aria-label="Decrease">
                        <IconMinus />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => handleIncrease(idx)} aria-label="Increase">
                        <IconPlus />
                      </button>
                    </div>
                    <span className="cart-item-total">&#8377;{item.price * item.quantity}</span>
                    <button className="cart-remove-btn" onClick={() => removeItem(idx)} aria-label="Remove item">
                      <IconTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>&#8377;{subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>GST (12%)</span>
                  <span>&#8377;{gst.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Delivery</span>
                  <span>&#8377;{delivery.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>&#8377;{total.toFixed(2)}</span>
                </div>
              </div>

              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal
          reason="to proceed to checkout"
          onSuccess={(user) => {
            setShowAuthModal(false);
            navigate('/orders');
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default Cart;
