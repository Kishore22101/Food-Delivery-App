// src/components/NearbyRestaurants.jsx
import React, { useRef, useState, useCallback } from 'react';
import '../styles/NearbyRestaurants.css';
import rest1 from '../assets/rest1.jpg';
import rest2 from '../assets/rest2.jpg';
import rest3 from '../assets/rest3.jpg';
import rest4 from '../assets/rest4.jpg';
import rest5 from '../assets/rest5.jpg';

const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-8.42H6" />
  </svg>
);
const IconChevLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const dispatchCartUpdate = () => window.dispatchEvent(new Event('cartUpdated'));

const dishes = [
  { name: 'Pappardelle',      subtitle: 'With Vegetable',     image: rest1, price: 35 },
  { name: 'Ravioli Stuffed',  subtitle: 'With Pesto Sauce',   image: rest2, price: 42 },
  { name: 'Pappardelle',      subtitle: 'With Vegetable',     image: rest3, price: 35 },
  { name: 'Ravioli Stuffed',  subtitle: 'With Pesto Sauce',   image: rest4, price: 42 },
  { name: 'Sushi Platter',    subtitle: 'Premium Selection',  image: rest5, price: 58 },
  { name: 'Spice Bowl',       subtitle: 'Indian Fusion',      image: rest1, price: 29 },
];

function NearbyRestaurants() {
  const trackRef = useRef(null);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [addedMap, setAddedMap] = useState({});

  const saveCart = useCallback((newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    dispatchCartUpdate();
  }, []);

  const handleAdd = (dish, e) => {
    const updated = [...cartItems];
    const existing = updated.find(c => c.name === dish.name && c.subtitle === dish.subtitle);
    if (existing) {
      existing.quantity += 1;
    } else {
      updated.push({ ...dish, quantity: 1 });
    }
    saveCart(updated);

    // Fly to cart animation
    const cartIcon = document.querySelector('.navbar-cart');
    if (cartIcon && e) {
      const btnRect = e.currentTarget.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      const flyer = document.createElement('div');
      flyer.style.cssText = `position:fixed;left:${btnRect.left+btnRect.width/2-7}px;top:${btnRect.top+btnRect.height/2-7}px;width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#E8303A,#C1272D);box-shadow:0 0 10px #E8303A;transition:all 0.75s cubic-bezier(0.25,1,0.5,1);pointer-events:none;z-index:9999;`;
      document.body.appendChild(flyer);
      requestAnimationFrame(() => {
        flyer.style.transform = `translate(${cartRect.left-btnRect.left}px,${cartRect.top-btnRect.top}px) scale(0.2)`;
        flyer.style.opacity = '0';
      });
      setTimeout(() => flyer.remove(), 800);
    }

    // Button feedback
    const key = dish.name + dish.subtitle;
    setAddedMap(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [key]: false })), 900);
  };

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector('.food-card')?.offsetWidth || 280;
    track.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className="food-slider-section" aria-label="Popular dishes">
      <div className="food-slider-header">
        <div>
          <p className="food-slider-eyebrow">Our Menu</p>
          <h2 className="food-slider-title">Popular <span className="gradient-text">Dishes</span></h2>
        </div>
        <div className="food-slider-arrows">
          <button
            id="food-slider-prev"
            className="slider-arrow slider-arrow-left"
            onClick={() => scroll(-1)}
            aria-label="Previous dishes"
          >
            <IconChevLeft />
          </button>
          <button
            id="food-slider-next"
            className="slider-arrow slider-arrow-right"
            onClick={() => scroll(1)}
            aria-label="Next dishes"
          >
            <IconChevRight />
          </button>
        </div>
      </div>

      <div className="food-slider-track-wrap">
        <div className="food-slider-track" ref={trackRef} role="list">
          {dishes.map((dish, i) => {
            const key = dish.name + dish.subtitle;
            const isAdded = addedMap[key];
            return (
              <div className="food-card" key={i} role="listitem">
                {/* Circular image */}
                <div className="food-card-img-wrap">
                  <img src={dish.image} alt={dish.name} className="food-card-img" />
                  <button
                    id={`food-card-cart-${i}`}
                    className={`food-card-cart-btn${isAdded ? ' added' : ''}`}
                    onClick={(e) => handleAdd(dish, e)}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <IconCart />
                  </button>
                </div>
                {/* Card body */}
                <div className="food-card-body">
                  <h3 className="food-card-name">{dish.name}</h3>
                  <p className="food-card-sub">{dish.subtitle}</p>
                  <div className="food-card-footer">
                    <span className="food-card-price">${dish.price}.00</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NearbyRestaurants;
