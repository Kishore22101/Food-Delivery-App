// src/components/ChefRecommendations.jsx
import React from 'react';
import '../styles/ChefRecommendations.css';
import chef1 from '../assets/chef-1.jpg';
import chef2 from '../assets/chef-2.jpg';
import chef3 from '../assets/chef-3.jpg';

const IconChef = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 0111.18 0A4 4 0 0118 13.87V21H6z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconFire = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-3.5-.956" />
  </svg>
);

const chefs = [
  { name: 'Chef Arjun',   dish: 'Spicy Paneer Tikka',    image: chef1, specialty: 'North Indian', stars: 5, tag: 'Bestseller' },
  { name: 'Chef Laila',   dish: 'Creamy Butter Chicken', image: chef2, specialty: 'Mughlai',      stars: 5, tag: 'Chef Pick' },
  { name: 'Chef Hiroshi', dish: 'Sushi Platter Deluxe',  image: chef3, specialty: 'Japanese',     stars: 4, tag: 'Trending' },
];

function ChefRecommendations() {
  return (
    <section className="chef-section reveal">
      <div className="chef-header">
        <div className="chef-label">
          <IconChef />
          <span>Expert Picks</span>
        </div>
        <h2 className="chef-title">Chef's Special Picks</h2>
        <p className="chef-subtitle">Curated delights from top chefs — crafted with passion</p>
      </div>

      <div className="chef-grid stagger-children">
        {chefs.map((chef) => (
          <div className="chef-card" key={chef.name}>
            <div className="chef-img-wrap">
              <img src={chef.image} alt={chef.name} className="chef-img" />
              <div className="chef-card-tag">
                <IconFire />
                {chef.tag}
              </div>
            </div>
            <div className="chef-card-body">
              <p className="chef-specialty">{chef.specialty}</p>
              <h3 className="chef-dish">{chef.dish}</h3>
              <div className="chef-meta">
                <div className="chef-stars">
                  {Array.from({ length: chef.stars }).map((_, i) => (
                    <IconStar key={i} />
                  ))}
                </div>
                <span className="chef-by">by <strong>{chef.name}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChefRecommendations;
