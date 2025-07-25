// src/components/CategoryCards.jsx
import React, { useState, useEffect } from 'react';
import './CategoryCards.css';

function CategoryCards({ items = [], onCartUpdate }) {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
    handleCartCount(storedCart);
  }, []);

  // Update cart count to parent (badge in navbar)
  const handleCartCount = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (onCartUpdate) {
      onCartUpdate(total);
    }
  };

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    handleCartCount(newCart);
  };

  const handleAddToCart = (item) => {
    const updated = [...cartItems];
    const existing = updated.find(cartItem => cartItem.name === item.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      updated.push({ ...item, quantity: 1 });
    }

    updateCart(updated);
  };

  const handleDecrease = (item) => {
    const updated = [...cartItems];
    const existing = updated.find(cartItem => cartItem.name === item.name);

    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity <= 0) {
        const filtered = updated.filter(cartItem => cartItem.name !== item.name);
        updateCart(filtered);
        return;
      }
    }

    updateCart(updated);
  };

  const getQuantity = (itemName) => {
    const found = cartItems.find(cartItem => cartItem.name === itemName);
    return found ? found.quantity : 0;
  };

  // Apply search filter
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-container">
      <h2 className="category-title">Explore Delicious Dishes 🍽️</h2>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🍱 Food Cards or No Results */}
      {filteredItems.length === 0 ? (
        <p className="no-items">No food items found.</p>
      ) : (
        <div className="category-cards">
          {filteredItems.map((item) => {
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
      )}
    </div>
  );
}

export default CategoryCards;
