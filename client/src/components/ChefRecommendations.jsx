import React from "react";
import "../styles/ChefRecommendations.css";

const chefs = [
  {
    name: "Chef Arjun",
    dish: "Spicy Paneer Tikka",
    image: "/src/assets/chef-1.jpg",
  },
  {
    name: "Chef Laila",
    dish: "Creamy Butter Chicken",
    image: "/src/assets/chef-2.jpg",
  },
  {
    name: "Chef Hiroshi",
    dish: "Sushi Platter",
    image: "/src/assets/chef-3.jpg",
  },
];

function ChefRecommendations() {
  return (
    <section className="chef-section">
      <h2>👨‍🍳 Chef’s Special Picks</h2>
      <p className="chef-subtitle">Curated delights from top chefs around the globe</p>
      <div className="chef-list">
        {chefs.map((chef, index) => (
          <div className="chef-card" key={index}>
            <img src={chef.image} alt={chef.name} className="chef-img" />
            <h3>{chef.dish}</h3>
            <p>by <strong>{chef.name}</strong></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChefRecommendations;
