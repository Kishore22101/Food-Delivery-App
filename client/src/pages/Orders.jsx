// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  const handlePayNow = () => {
    alert('✅ Payment successful! Your order has been placed.');
    localStorage.removeItem('cartItems');
    window.location.href = '/';
  };

  return (
    <div className="orders-page">
      <h2>🧾 Confirm Your Order</h2>

      {cartItems.length === 0 ? (
        <p className="empty-order">🛒 You have no items to order.</p>
      ) : (
        <>
          <ul className="order-list">
            {cartItems.map((item, index) => (
              <li key={index} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>Unit Price: ₹{item.price}</p>
                  <p>Total: ₹{item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="order-summary">
            <h3>🧾 Bill Summary</h3>
            <div className="bill-line">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="bill-line">
              <span>GST (5%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="bill-line grand-total">
              <strong>Grand Total:</strong>
              <strong>₹{grandTotal.toFixed(2)}</strong>
            </div>

            <div className="timer-box">
              <p>⏳ Payment time left: <strong>{formatTime(countdown)}</strong></p>
            </div>

            <button className="pay-btn" onClick={handlePayNow} disabled={countdown === 0}>
              💳 Pay Now
            </button>

            {countdown === 0 && <p className="expired-msg">❌ Payment time expired! Please go back to cart.</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
