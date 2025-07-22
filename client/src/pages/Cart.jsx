import { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px'
            }}>
              <p><strong>{item.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}

          <h3>Total: ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</h3>
          <button>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Cart;