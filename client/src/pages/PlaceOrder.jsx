import React, { useState } from 'react';
import { placeOrder } from '../api/orderApi';

const PlaceOrder = () => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handlePlaceOrder = async () => {
    try {
      const result = await placeOrder(
        [{ foodId: '662fa2e5822f0b8322adf0cc', quantity: 2 }],
        400,
        token
      );
      setMessage('✅ Order Placed Successfully!');
      console.log(result);
    } catch (err) {
      setMessage('❌ Error: ${err}');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default PlaceOrder;