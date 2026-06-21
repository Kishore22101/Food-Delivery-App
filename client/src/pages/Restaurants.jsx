// src/pages/Restaurants.jsx
import React, { useState, useEffect } from 'react';
import './Restaurants.css';
import { useLocation } from 'react-router-dom';
import rest1 from '../assets/restaurants/rest1.jpg';
import rest2 from '../assets/restaurants/rest2.jpg';
import rest3 from '../assets/restaurants/rest3.jpg';
import rest4 from '../assets/restaurants/rest4.jpg';
import rest5 from '../assets/restaurants/rest5.jpg';

/* ─── SVG Icons ─── */
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconFilter = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const dummyRestaurants = [
  { id: 1,  name: 'Tandoori Tadka',   location: 'Chennai',     cuisine: 'North Indian', rating: 4.5, image: rest1, deliveryTime: '25-35 min' },
  { id: 2,  name: 'South Feast',      location: 'Madurai',     cuisine: 'South Indian', rating: 4.2, image: rest2, deliveryTime: '30-40 min' },
  { id: 3,  name: 'Pasta Villa',      location: 'Salem',       cuisine: 'Italian',      rating: 4.1, image: rest3, deliveryTime: '35-45 min' },
  { id: 4,  name: 'Rice & Spice',     location: 'Trichy',      cuisine: 'South Indian', rating: 4.3, image: rest4, deliveryTime: '20-30 min' },
  { id: 5,  name: 'PizzaCraft',       location: 'Hyderabad',   cuisine: 'Italian',      rating: 4.6, image: rest5, deliveryTime: '40-50 min' },
  { id: 6,  name: 'Biryani Express',  location: 'Chennai',     cuisine: 'North Indian', rating: 4.4, image: rest1, deliveryTime: '20-30 min' },
  { id: 7,  name: 'Curry Pot',        location: 'Trivandrum',  cuisine: 'South Indian', rating: 4.2, image: rest2, deliveryTime: '30-40 min' },
  { id: 8,  name: 'Delizioso',        location: 'Coimbatore',  cuisine: 'Italian',      rating: 4.5, image: rest3, deliveryTime: '35-45 min' },
  { id: 9,  name: 'Masala Nation',    location: 'Bangalore',   cuisine: 'North Indian', rating: 4.1, image: rest4, deliveryTime: '25-35 min' },
  { id: 10, name: 'Hot Tawa',         location: 'Madurai',     cuisine: 'South Indian', rating: 4.0, image: rest5, deliveryTime: '20-30 min' },
  { id: 11, name: 'Zesty Italian',    location: 'Trichy',      cuisine: 'Italian',      rating: 4.3, image: rest1, deliveryTime: '40-50 min' },
  { id: 12, name: 'Spice Route',      location: 'Coimbatore',  cuisine: 'North Indian', rating: 4.6, image: rest2, deliveryTime: '25-35 min' },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Restaurants() {
  const query = useQuery();
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');

  useEffect(() => {
    const loc = query.get('location');
    if (loc) setSearch(loc);
  }, []);

  const cuisines = ['All', 'North Indian', 'South Indian', 'Italian'];

  const finalFiltered = dummyRestaurants.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCuisine = cuisine === 'All' || r.cuisine === cuisine;
    return matchSearch && matchCuisine;
  });

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <h1 className="restaurants-title">Restaurants Near You</h1>
        <p className="restaurants-subtitle">{dummyRestaurants.length} restaurants available for delivery</p>
      </div>

      {/* Controls */}
      <div className="restaurants-controls">
        <div className="restaurants-search-wrap">
          <span className="restaurants-search-icon"><IconSearch /></span>
          <input
            type="text"
            placeholder="Search by name, location or cuisine..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="restaurants-search-input"
            aria-label="Search restaurants"
          />
        </div>

        <div className="restaurants-filter">
          <IconFilter />
          {cuisines.map(c => (
            <button
              key={c}
              className={`rest-filter-btn${cuisine === c ? ' active' : ''}`}
              onClick={() => setCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {finalFiltered.length === 0 ? (
        <div className="restaurants-empty">
          <IconSearch />
          <p>No restaurants match your search.</p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {finalFiltered.map(r => (
            <div className="rest-card" key={r.id}>
              <div className="rest-card-img-wrap">
                <img src={r.image} alt={r.name} className="rest-card-img" />
                <div className="rest-card-rating">
                  <IconStar />
                  {r.rating}
                </div>
              </div>
              <div className="rest-card-body">
                <h3 className="rest-card-name">{r.name}</h3>
                <p className="rest-card-cuisine">{r.cuisine}</p>
                <div className="rest-card-meta">
                  <span className="rest-card-location">
                    <IconMapPin />
                    {r.location}
                  </span>
                  <span className="rest-card-time">{r.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Restaurants;
