import axiosInstance from '../utils/axiosInstance';

export const placeOrder = async (orderData) => {
  try {
    const res = await axiosInstance.post('/order', orderData);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
