import { useState } from 'react';
import { placeOrder } from '../api/orderAPI';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const [foodId, setFoodId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeOrder({
        items: [{ foodId, quantity }],
        totalAmount
      });
      alert('Order Placed Successfully!');
      navigate('/myorders');
    } catch (err) {
      alert('Order Failed: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={foodId} onChange={(e) => setFoodId(e.target.value)} placeholder="Food ID" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" required />
        <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(Number(e.target.value))} placeholder="Total Amount" required />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;