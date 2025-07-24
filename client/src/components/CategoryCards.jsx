// src/components/CategoryCards.jsx
import React, { useState, useEffect } from 'react';
import './CategoryCards.css';

function CategoryCards({ items, onCartUpdate }) {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
    handleCartCount(storedCart); // Notify parent with existing count
  }, []);

  // Notify parent component with total quantity
  const handleCartCount = (cart) => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (onCartUpdate) {
      onCartUpdate(totalCount); // Call parent function with new count
    }
  };

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    handleCartCount(newCart); // Update count in parent
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    updateCart(updatedCart);
  };

  const handleDecrease = (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity <= 0) {
        const filteredCart = updatedCart.filter((cartItem) => cartItem.name !== item.name);
        updateCart(filteredCart);
        return;
      }
    }

    updateCart(updatedCart);
  };

  const getQuantity = (itemName) => {
    const found = cartItems.find((cartItem) => cartItem.name === itemName);
    return found ? found.quantity : 0;
  };

  if (!items || items.length === 0) {
    return <p style={{ textAlign: 'center' }}>No food items found.</p>;
  }

  return (
    <div className="category-cards">
      {items.map((item) => {
        const quantity = getQuantity(item.name);
        return (
          <div key={item.name} className="card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">₹{item.price}</p>

            <button className="order-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>

            {quantity > 0 && (
              <div className="quantity-badge">
                Quantity: {quantity}
                <button className="decrease-btn" onClick={() => handleDecrease(item)}>➖</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryCards;
