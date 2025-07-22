import axios from 'axios';

export const placeOrder = async (items, totalAmount, token) => {
  try {
    const response = await axios.post(
      '/api/order',
      { items, totalAmount },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getMyOrders = async (token) => {
  try {
    const response = await axios.get('/api/order', {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteOrder = async (orderId, token) => {
  try {
    const response = await axios.delete('/api/order/${orderId}', {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};