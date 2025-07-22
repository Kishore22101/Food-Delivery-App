import { useEffect, useState } from 'react';
import { fetchUserOrders } from '../api/orderAPI';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUserOrders()
      .then((data) => setOrders(data))
      .catch((err) => alert('Failed to fetch orders: ' + err.message));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered At:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
              <hr />
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>Food ID: {item.foodId} | Qty: {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
