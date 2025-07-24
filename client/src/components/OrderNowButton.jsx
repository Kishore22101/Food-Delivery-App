import React from 'react';
import './OrderNowButton.css';

function OrderNowButton({ label }) {
  return (
    <button className="order-now-btn">
      {label}
    </button>
  );
}

export default OrderNowButton;
