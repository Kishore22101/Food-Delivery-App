// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import foodData from '../data/foodData';
import CategoryCards from '../components/CategoryCards';
import './Categories.css';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CATEGORIES = ['All', 'North Indian', 'South Indian', 'Italian'];

const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CATEGORY_ICONS = {
  'All': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ),
  'North Indian': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12c1.1 0 2-.9 2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"/></svg>
  ),
  'South Indian': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
  ),
  'Italian': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
  ),
};

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();

  useEffect(() => {
    const catParam = query.get('category');
    if (catParam) {
      const formatted = catParam.toLowerCase().split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (CATEGORIES.includes(formatted)) setSelectedCategory(formatted);
    }
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsLoading(false), 480);
  };

  const filtered = selectedCategory === 'All'
    ? foodData
    : foodData.filter(item => item.category === selectedCategory);

  return (
    <div className="categories-page">
      {/* Hero Banner */}
      <div className="categories-hero-banner reveal animate-fade-up">
        <div className="categories-header">
          <nav className="categories-breadcrumb" aria-label="breadcrumb">
            <span>Home</span>
            <IconChevron />
            <span className="breadcrumb-current">Categories</span>
          </nav>
          <h1 className="categories-title">
            Explore <span className="gradient-text">Authentic</span> Cuisines
          </h1>
          <p className="categories-subtitle">
            Browse {foodData.length} handcrafted dishes across {CATEGORIES.length - 1} world cuisines
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="categories-filter-bar stagger-children visible">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-tab press-active${selectedCategory === cat ? ' active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
            aria-pressed={selectedCategory === cat}
          >
            <span style={{ width: 16, height: 16, display: 'inline-flex', flexShrink: 0 }}>
              {CATEGORY_ICONS[cat]}
            </span>
            {cat}
            {selectedCategory === cat && (
              <span className="filter-tab-count">
                {cat === 'All' ? foodData.length : foodData.filter(f => f.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="categories-body">
        <CategoryCards items={filtered} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Categories;
