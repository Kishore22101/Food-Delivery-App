// client/src/components/OrderNowButton.jsx
import React from 'react';
import './OrderNowButton.css';

function OrderNowButton() {
  const handleClick = () => {
    alert('Order Now clicked!'); // Replace this later with real navigation or functionality
  };

  return (
    <div className="order-now-container">
      <button className="order-now-btn" onClick={handleClick}>
        Order Now
      </button>
    </div>
  );
}

export default OrderNowButton;
