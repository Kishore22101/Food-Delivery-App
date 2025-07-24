// src/components/CategoryCards.jsx
import React from 'react';
import './CategoryCards.css';

function CategoryCards({ items }) {
  if (!items || items.length === 0) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>No food items found.</p>;
  }

  const handleOrderNow = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = existingCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    alert(`${item.name} added to cart ✅`);
  };

  return (
    <div className="category-cards-container">
      {items.map((item) => (
        <div key={item.id} className="category-card">
          <img src={item.image} alt={item.name} className="card-img" />
          <div className="card-content">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-desc">{item.description}</p>
            <p className="card-price">₹{item.price}</p>
            <button className="order-btn" onClick={() => handleOrderNow(item)}>
              Order Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;
