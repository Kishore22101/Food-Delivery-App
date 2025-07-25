import React, { useState, useEffect } from 'react';
import './Restaurants.css';
import { useLocation } from 'react-router-dom';

const dummyRestaurants = [
  { id: 1, name: "Tandoori Tadka", location: "Chennai", cuisine: "North Indian", rating: "4.5", image: "/src/assets/restaurants/rest1.jpg" },
  { id: 2, name: "South Feast", location: "Madurai", cuisine: "South Indian", rating: "4.2", image: "/src/assets/restaurants/rest2.jpg" },
  { id: 3, name: "Pasta Villa", location: "Salem", cuisine: "Italian", rating: "4.1", image: "/src/assets/restaurants/rest3.jpg" },
  { id: 4, name: "Rice & Spice", location: "Trichy", cuisine: "South Indian", rating: "4.3", image: "/src/assets/restaurants/rest4.jpg" },
  { id: 5, name: "PizzaCraft", location: "Hyderabad", cuisine: "Italian", rating: "4.6", image: "/src/assets/restaurants/rest5.jpg" },
  { id: 6, name: "Biryani Express", location: "Chennai", cuisine: "North Indian", rating: "4.4", image: "/src/assets/restaurants/rest1.jpg" },
  { id: 7, name: "Curry Pot", location: "Trivandrum", cuisine: "South Indian", rating: "4.2", image: "/src/assets/restaurants/rest2.jpg" },
  { id: 8, name: "Delizioso", location: "Coimbatore", cuisine: "Italian", rating: "4.5", image: "/src/assets/restaurants/rest3.jpg" },
  { id: 9, name: "Masala Nation", location: "Bangalore", cuisine: "North Indian", rating: "4.1", image: "/src/assets/restaurants/rest4.jpg" },
  { id: 10, name: "Hot Tawa", location: "Madurai", cuisine: "South Indian", rating: "4.0", image: "/src/assets/restaurants/rest5.jpg" },
  { id: 11, name: "Zesty", location: "Trichy", cuisine: "Italian", rating: "4.3", image: "/src/assets/restaurants/rest1.jpg" },
  { id: 12, name: "Spice Route", location: "Coimbatore", cuisine: "North Indian", rating: "4.6", image: "/src/assets/restaurants/rest2.jpg" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Restaurants() {
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const locationParam = query.get('location');
    if (locationParam) {
      setLocationFilter(locationParam);
      setSearchQuery(locationParam);
    }
  }, [query]);

  useEffect(() => {
    if (locationFilter) {
      const filtered = dummyRestaurants.filter(r =>
        r.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
      setRestaurants(filtered);
    } else {
      setRestaurants(dummyRestaurants);
    }
  }, [locationFilter]);

  const finalFiltered = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="restaurant-page">
      <h2 className="page-title">🍽️ Restaurants Near You</h2>

      <div className="restaurant-search">
        <input
          type="text"
          placeholder="Search by name, location or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="restaurant-grid">
        {finalFiltered.length > 0 ? finalFiltered.map((rest) => (
          <div className="restaurant-card" key={rest.id}>
            <img src={rest.image} alt={rest.name} />
            <h3>{rest.name}</h3>
            <p className="cuisine">{rest.cuisine} • {rest.location}</p>
            <p className="rating">⭐ {rest.rating}</p>
          </div>
        )) : (
          <p className="no-results">No matching restaurants found.</p>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
