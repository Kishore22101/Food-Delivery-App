import React from 'react';
import './CategoryCards.css';

function CategoryCards({ items }) {
  if (!items || items.length === 0) {
    return <div className="no-items">No food items found in this category.</div>;
  }

  return (
    <section className="cards-grid">
      {items.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.image} alt={item.name} className="card-img" />
          <div className="card-content">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-desc">{item.description}</p>
            <div className="card-bottom">
              <span className="price">₹{item.price}</span>
              <button className="order-btn">Order Now</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CategoryCards;
