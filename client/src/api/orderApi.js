import axiosInstance from '../utils/axiosInstance';

// ✅ Place Order — POST /api/order
export const placeOrder = async (orderData) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

// ✅ Get My Orders — GET /api/order
export const getMyOrders = async () => {
  try {
    const res = await axiosInstance.get('/order');
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

// ✅ Delete Order — DELETE /api/order/:orderId
export const deleteOrder = async (orderId) => {
  try {
    const res = await axiosInstance.delete('/order/${orderId}');
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};