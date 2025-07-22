import { useState, useEffect } from 'react';
import { fetchFoodItems } from '../api/foodAPI';
import FoodCard from '../components/FoodCard';
import { Link } from 'react-router-dom';  // ✅ Import Link

function Menu() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchFoodItems()
      .then(res => setFoodItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Our Menu</h1>
      <div>
        {foodItems.map(item => (
          <FoodCard
            key={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>

      {/* ✅ Button to go to OrderForm */}
      <Link to="/order">
        <button>Place a New Order</button>
      </Link>
    </div>
  );
}

export default Menu;