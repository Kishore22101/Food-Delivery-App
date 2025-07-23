import axiosInstance from '../utils/axiosInstance';

// ✅ Place Order
export const placeOrder = async (orderData) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

// ✅ Get My Orders
export const getMyOrders = async () => {
  try {
    const res = await axiosInstance.get('/order/myorders');
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

// ✅ Cancel Order
export const deleteOrder = async (orderId) => {
  try {
    const res = await axiosInstance.delete(`/order/${orderId}`);
    return res.data;
  } catch (err) {
    throw err.response.data.message;
  }
};
