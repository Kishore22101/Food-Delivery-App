// src/components/CategoryCards.jsx
import React from 'react';
import './CategoryCards.css';

function CategoryCards({ items = [] }) {
  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    alert(`${item.name} added to cart!`);
  };

  // Optional: Show message when no items
  if (!items.length) {
    return <p style={{ textAlign: 'center' }}>No food items to show.</p>;
  }

  return (
    <div className="category-cards">
      {items.map(item => (
        <div key={item.id} className="category-card">
          <img
            src={`/assets/${item.name.toLowerCase().replace(/\s+/g, '')}.jpg`}
            alt={item.name}
            className="food-img"
          />
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button className="order-now" onClick={() => addToCart(item)}>
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;
