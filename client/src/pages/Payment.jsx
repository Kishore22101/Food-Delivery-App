import React, { useEffect, useState, useRef } from 'react';
import './Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const {
    cartItems,
    orderId,
    date,
    grandTotal,
    foodSubtotal,
    foodGST,
    deliveryCharge,
    deliveryGST,
  } = location.state || {};

  const [timer, setTimer] = useState(300);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          alert("Session expired! Please order again.");
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const downloadPDF = async () => {
    const element = invoiceRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `EatzUp_Invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }, // ensures automatic breaks
    };

    await html2pdf().set(opt).from(element).save();
  };

  const handleConfirm = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    await downloadPDF();
    alert(`✅ Payment Successful via ${selectedMethod}!\nOrder ID: ${orderId}`);
    localStorage.removeItem('cartItems');
    navigate('/');
  };

  return (
    <div className="payment-page">

      {/* Timer - Not included in PDF */}
      <div className="timer">⏳ Session expires in: {formatTime(timer)}</div>

      {/* Invoice Section */}
      <div ref={invoiceRef}>
        <div className="logo-brand-section">
          <img src="/src/assets/logo.png" alt="EatzUp Logo" className="invoice-logo" />
          <h1 className="invoice-brand-name">EatzUp</h1>
        </div>

        <div className="invoice-box">
          <div className="invoice-header">
            <div>
              <p><strong>Order ID:</strong> #{orderId}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>GST ID:</strong> 33ABCDE1234F1Z5</p>
            </div>
          </div>

          <ul className="order-list">
            {cartItems?.map((item, index) => (
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
            <img src="/src/assets/stamp1.png" alt="Stamp 1" />
            <img src="/src/assets/stamp2.png" alt="Stamp 2" />
            <img src="/src/assets/stamp3.png" alt="Stamp 3" />
            <img src="/src/assets/stamp4.png" alt="Stamp 4" />
          </div>
        </div>
      </div>

      {/* Payment Options - Not in PDF */}
      <div className="payment-methods">
        <h4>Select Payment Method</h4>
        <div className="payment-options">
          {[
            { name: 'GPay', icon: '/src/assets/payment/gpay.png' },
            { name: 'PhonePe', icon: '/src/assets/payment/phonepe.png' },
            { name: 'UPI', icon: '/src/assets/payment/upi.png' },
            { name: 'Visa / Mastercard', icon: '/src/assets/payment/visa.png' },
            { name: 'Net Banking', icon: '/src/assets/payment/netbanking.png' },
            { name: 'COD', icon: '/src/assets/payment/cod.png' },
          ].map(({ name, icon }) => (
            <button
              key={name}
              className={selectedMethod === name ? 'active' : ''}
              onClick={() => setSelectedMethod(name)}
            >
              <img src={icon} alt={name} className="method-icon" />
              {name}
            </button>
          ))}
        </div>
      </div>

      <button className="pay-btn" onClick={handleConfirm}>✅ Confirm Payment</button>
    </div>
  );
}

export default Payment;
