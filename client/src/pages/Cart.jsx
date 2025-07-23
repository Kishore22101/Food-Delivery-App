import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orderApi';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  // ✅ Load cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  // ✅ Update quantity handler
  const handleQuantityChange = (index, newQty) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // ✅ Calculate total
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Place Order Button Click
  const handlePlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        alert('Cart is empty!');
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      setPlacingOrder(true);
      await placeOrder(orderData);
      alert('Order placed successfully!');
      localStorage.removeItem('cartItems');
      setCartItems([]);
      navigate('/myorders');
    } catch (err) {
      alert('Failed to place order: ' + err);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <p><strong>{item.name}</strong></p>
              <p>Price: ₹{item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  style={{ width: '60px', marginLeft: '10px' }}
                />
              </p>
            </div>
          ))}

          <h3>Total: ₹{totalAmount}</h3>
          <button onClick={handlePlaceOrder} disabled={placingOrder}>
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;