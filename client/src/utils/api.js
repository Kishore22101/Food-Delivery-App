// src/utils/api.js – EatzUp API helper
import axios from 'axios';

// In production (Vercel), VITE_API_URL should point to the deployed server.
// Locally it falls back to localhost:5000
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: BASE_URL,
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

// ── Local Order History helpers (client-side localStorage) ──
export const saveOrderToHistory = (order) => {
  const existing = JSON.parse(localStorage.getItem('eatzup_order_history') || '[]');
  existing.unshift(order); // newest first
  // keep max 50 orders
  localStorage.setItem('eatzup_order_history', JSON.stringify(existing.slice(0, 50)));
};

export const getOrderHistory = () => {
  return JSON.parse(localStorage.getItem('eatzup_order_history') || '[]');
};

export default API;