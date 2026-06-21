// src/utils/api.js – EatzUp API helper
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Foods ──
export const getAllFoods        = (category) => API.get('/foods', { params: category ? { category } : {} });
export const getFoodByName      = (name)     => API.get(`/foods/${encodeURIComponent(name)}`);

// ── Users ──
export const loginUser          = (data)     => API.post('/users/login', data);
export const registerUser       = (data)     => API.post('/users/register', data);

// ── Orders ──
export const placeOrder         = (data)     => API.post('/orders', data);
export const getOrders          = (userId)   => API.get('/orders', { params: userId ? { userId } : {} });
export const getOrderById       = (orderId)  => API.get(`/orders/${orderId}`);

// ── Newsletter ──
export const subscribeNewsletter = (email)   => API.post('/newsletter', { email });

export default API;