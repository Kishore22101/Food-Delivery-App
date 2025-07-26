import React, { useEffect, useState, useRef } from 'react';
import './Orders.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const invoiceRef = useRef();
  const [orderId] = useState(uuidv4().slice(0, 8).toUpperCase());
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const foodSubtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  const foodGST = foodSubtotal * 0.12;
  const deliveryCharge = 70;
  const deliveryGST = deliveryCharge * 0.05;
  const grandTotal = foodSubtotal + foodGST + deliveryCharge + deliveryGST;

  const handlePayNow = () => {
    navigate('/payment', {
      state: {
        cartItems,
        orderId,
        date: formatDate(new Date()),
        grandTotal,
        foodSubtotal,
        foodGST,
        deliveryCharge,
        deliveryGST
      }
    });
  };

  return (
    <div className="orders-page">
      <div className="logo-brand-section">
        <img src="/src/assets/logo.png" alt="EatzUp Logo" />
        <h1 className="brand-name">EatzUp</h1>
      </div>

      <h2>🧾 Confirm Your Order</h2>

      {cartItems.length === 0 ? (
        <p className="empty-order">🛒 You have no items to order.</p>
      ) : (
        <>
          <div ref={invoiceRef} className="invoice-box">
            <div className="invoice-header">
              <div>
                <p><strong>Invoice ID:</strong> #{orderId}</p>
                <p><strong>Date:</strong> {formatDate(new Date())}</p>
                <p><strong>GST ID:</strong> 33ABCDE1234F1Z5</p>
              </div>
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
              <div className="bill-line grand-total">
                <strong>Grand Total:</strong><strong>₹{grandTotal.toFixed(2)}</strong>
              </div>
            </div>

            <div className="stamp-row">
              {[1, 2, 3, 4].map((n) => (
                <img key={n} src={`/src/assets/stamp${n}.png`} alt={`Stamp ${n}`} />
              ))}
            </div>
          </div>

          <div className="payment-buttons">
            <button className="pay-btn" onClick={handlePayNow}>💳 Pay Now</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
