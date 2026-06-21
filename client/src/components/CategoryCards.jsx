// src/components/CategoryCards.jsx
import React, { useState, useEffect } from 'react';
import './CategoryCards.css';

/* ─── SVG Icons ─── */
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-8.42H6" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" style={{ color: '#ffb300', width: '13px', height: '13px' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '12px', height: '12px' }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* Dispatch custom event to sync Navbar count */
const dispatchCartUpdate = () => {
  window.dispatchEvent(new Event('cartUpdated'));
};

function CategoryCards({ items = [], isLoading = false }) {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(stored);
  }, []);

  const saveCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    dispatchCartUpdate();
  };

  const handleAdd = (item) => {
    const updated = [...cartItems];
    const existing = updated.find(c => c.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      updated.push({ ...item, quantity: 1 });
    }
    saveCart(updated);
  };

  const handleDecrease = (item) => {
    const updated = [...cartItems];
    const idx = updated.findIndex(c => c.name === item.name);
    if (idx === -1) return;
    if (updated[idx].quantity <= 1) {
      updated.splice(idx, 1);
    } else {
      updated[idx].quantity -= 1;
    }
    saveCart(updated);
  };

  const getQty = (name) => {
    const found = cartItems.find(c => c.name === name);
    return found ? found.quantity : 0;
  };

  // Fly to Cart particles animation
  const triggerFlyToCart = (e) => {
    const cartIcon = document.querySelector('.navbar-cart');
    if (!cartIcon) return;

    const btnRect = e.currentTarget.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyer = document.createElement('div');
    flyer.className = 'particle-dot';
    
    // Position flyer at the button center
    flyer.style.position = 'fixed';
    flyer.style.left = `${btnRect.left + btnRect.width / 2 - 7}px`;
    flyer.style.top = `${btnRect.top + btnRect.height / 2 - 7}px`;
    flyer.style.zIndex = '9999';
    flyer.style.width = '14px';
    flyer.style.height = '14px';
    flyer.style.borderRadius = '50%';
    flyer.style.background = 'var(--brand-gradient)';
    flyer.style.boxShadow = '0 0 10px var(--brand-primary)';
    flyer.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    flyer.style.pointerEvents = 'none';

    document.body.appendChild(flyer);

    // Trigger animations in next frame
    requestAnimationFrame(() => {
      flyer.style.transform = `translate(${cartRect.left - btnRect.left}px, ${cartRect.top - btnRect.top}px) scale(0.3)`;
      flyer.style.opacity = '0';
    });

    // Remove flyer from DOM
    setTimeout(() => {
      flyer.remove();
    }, 850);
  };

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper properties
  const isNonVeg = (name) => {
    const keywords = ['chicken', 'fish', 'korma', 'bolognese', 'pepperoni', 'lasagna', 'tandoori', 'mutton'];
    return keywords.some(k => name.toLowerCase().includes(k));
  };

  const getRating = (name) => {
    return (((name.length % 9) / 10) + 4.1).toFixed(1);
  };

  const getPrepTime = (name) => {
    return ((name.length % 4) * 5) + 15;
  };

  const getBadge = (name) => {
    const rating = parseFloat(getRating(name));
    if (rating >= 4.7) return 'Best Seller';
    if (name.length % 7 === 0) return "Chef's Choice";
    if (name.length % 5 === 0) return 'Trending';
    return null;
  };

  return (
    <div className="cat-cards-section">
      {/* Search */}
      <div className="cat-search-wrap">
        <span className="cat-search-icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="cat-search-input"
          aria-label="Search food"
        />
      </div>

      {/* Results summary */}
      <p className="cat-results-count">
        {isLoading ? 'Loading dishes...' : `${filtered.length} ${filtered.length === 1 ? 'dish' : 'dishes'} found`}
        {!isLoading && searchTerm && ` for "${searchTerm}"`}
      </p>

      {/* Loading Skeletal Shimmer Grid */}
      {isLoading ? (
        <div className="cat-cards-grid">
          {[...Array(8)].map((_, idx) => (
            <div className="cat-card skeleton-card" key={idx}>
              <div className="skeleton-image skeleton" />
              <div className="skeleton-body">
                <div className="skeleton-title skeleton" />
                <div className="skeleton-desc skeleton" />
                <div className="skeleton-footer">
                  <div className="skeleton-price skeleton" />
                  <div className="skeleton-btn skeleton" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="cat-empty">
          <IconSearch />
          <p>No dishes found. Try a different search.</p>
        </div>
      ) : (
        <div className="cat-cards-grid stagger-children visible">
          {filtered.map((item) => {
            const qty = getQty(item.name);
            const badge = getBadge(item.name);
            const nonVeg = isNonVeg(item.name);
            
            return (
              <div className="cat-card glow-card" key={item.name}>
                <div className="cat-card-img-wrap">
                  <img src={item.image} alt={item.name} className="cat-card-img" onError={(e) => { e.target.src = '/placeholder.jpg'; }} />
                  <span className="cat-card-category">{item.category}</span>
                  {badge && <span className="cat-card-ribbon">{badge}</span>}
                </div>
                
                <div className="cat-card-body">
                  <div className="cat-card-meta-row">
                    {/* Veg/Non-Veg dot */}
                    <span className={`veg-dot ${nonVeg ? 'non-veg' : 'veg'}`} aria-label={nonVeg ? 'Non Vegetarian' : 'Vegetarian'}>
                      <span className="veg-inner" />
                    </span>
                    
                    {/* Rating badge */}
                    <span className="cat-card-rating">
                      <IconStar />
                      <span>{getRating(item.name)}</span>
                    </span>

                    {/* Prep time */}
                    <span className="cat-card-time">
                      <IconClock />
                      <span>{getPrepTime(item.name)} mins</span>
                    </span>
                  </div>

                  <h3 className="cat-card-name">{item.name}</h3>
                  <p className="cat-card-desc">{item.description}</p>
                  
                  <div className="cat-card-footer">
                    <span className="cat-card-price">&#8377;{item.price}</span>
                    
                    {/* Advanced Morphing Add Action */}
                    <div className={`cat-cart-action-wrap ${qty > 0 ? 'active' : ''}`}>
                      <button 
                        className="cat-add-btn ripple-btn" 
                        onClick={(e) => { 
                          handleAdd(item); 
                          triggerFlyToCart(e); 
                        }}
                      >
                        <IconCart />
                        <span>Add</span>
                      </button>
                      
                      <div className="cat-qty-ctrl">
                        <button className="cat-qty-btn" onClick={() => handleDecrease(item)} aria-label="Decrease">
                          <IconMinus />
                        </button>
                        <span className="cat-qty-value">{qty}</span>
                        <button className="cat-qty-btn" onClick={(e) => {
                          handleAdd(item);
                          triggerFlyToCart(e);
                        }} aria-label="Increase">
                          <IconPlus />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryCards;
