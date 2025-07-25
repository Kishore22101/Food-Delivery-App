// Orders.jsx (Updated with full invoice + company info + styling + GST)
import React, { useEffect, useState, useRef } from 'react';
import './Orders.css';
import html2pdf from 'html2pdf.js';
import { v4 as uuidv4 } from 'uuid';

function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes
  const invoiceRef = useRef();
  const [orderId] = useState(uuidv4().slice(0, 8).toUpperCase());

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const formatTime = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const foodSubtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  const foodGST = foodSubtotal * 0.12;
  const deliveryCharge = 70;
  const deliveryGST = deliveryCharge * 0.05;
  const grandTotal = foodSubtotal + foodGST + deliveryCharge + deliveryGST;

  const handlePayNow = () => {
    alert('✅ Payment successful! Your order has been placed.');
    localStorage.removeItem('cartItems');
    window.location.href = '/';
  };

  const downloadInvoice = () => {
    const opt = {
      margin: 0.5,
      filename: `EatzUp_Invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  return (
    <div className="orders-page">
      <h2>🧾 Confirm Your Order</h2>
      {cartItems.length === 0 ? (
        <p className="empty-order">🛒 You have no items to order.</p>
      ) : (
        <>
          <div className="countdown">⏰ Time left to pay: <span>{formatTime()}</span></div>

          <div ref={invoiceRef} className="invoice-box">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>EatzUp</h2>
              <p>Invoice ID: #{orderId}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>

            <ul className="order-list">
              {cartItems.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Unit Price: ₹{item.price}</p>
                    <p>Total: ₹{item.quantity * item.price}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="order-summary">
              <h3>🧾 Bill Summary</h3>
              <div className="bill-line"><span>Food Subtotal:</span><span>₹{foodSubtotal.toFixed(2)}</span></div>
              <div className="bill-line"><span>Food GST (12%):</span><span>₹{foodGST.toFixed(2)}</span></div>
              <div className="bill-line"><span>Delivery Charge:</span><span>₹{deliveryCharge.toFixed(2)}</span></div>
              <div className="bill-line"><span>Delivery GST (5%):</span><span>₹{deliveryGST.toFixed(2)}</span></div>
              <div className="bill-line grand-total"><strong>Grand Total:</strong><strong>₹{grandTotal.toFixed(2)}</strong></div>
            </div>
          </div>

          <div className="payment-buttons">
            <button className="pay-btn" onClick={handlePayNow} disabled={timer === 0}>💳 Pay Now</button>
            <button className="invoice-btn" onClick={downloadInvoice}>📥 Download Invoice</button>
          </div>

          {timer === 0 && <p className="expired-msg">❌ Payment time expired! Please go back to cart.</p>}
        </>
      )}
    </div>
  );
}

export default Orders;
