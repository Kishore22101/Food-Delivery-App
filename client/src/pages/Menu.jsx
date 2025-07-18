import FoodCard from '../components/FoodCard';

function Menu() {
  const foodItems = [
    { name: 'Burger', price: 150 },
    { name: 'Pizza', price: 300 },
    { name: 'Sandwich', price: 120 },
  ];

  return (
    <div>
      <h1>Our Menu</h1>
      {foodItems.map((item, index) => (
        <FoodCard key={index} name={item.name} price={item.price} />
      ))}
    </div>
  );
}

export default Menu;
