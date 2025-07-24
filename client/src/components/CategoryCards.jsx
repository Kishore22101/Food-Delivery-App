// client/src/components/CategoryCards.jsx
import React from 'react';
import './CategoryCards.css';

// Dynamically import all food images from assets/foods
const images = import.meta.glob('../assets/foods/*.{png,jpg,jpeg,webp}', { eager: true });

function CategoryCards({ items }) {
  if (!items || items.length === 0) {
    return <div className="no-items">No food items found in this category.</div>;
  }

  return (
    <section className="cards-grid">
      {items.map((item, index) => {
        // Match image path with file
        const matchedImage = Object.entries(images).find(([path]) =>
          path.includes(item.image)
        );
        const imageSrc = matchedImage ? matchedImage[1].default : '';

        return (
          <div className="card" key={index}>
            <img src={imageSrc} alt={item.name} className="card-img" />
            <div className="card-content">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-desc">{item.description}</p>
              <div className="card-bottom">
                <span className="price">₹{item.price}</span>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CategoryCards;
