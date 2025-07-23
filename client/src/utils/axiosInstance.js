import axios from 'axios';

// ✅ Create axios instance with Backend API URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',   // ✅ Backend Base URL — Change if deployed
});

// ✅ Interceptor — Attach Token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // ✅ Get token from localStorage
    if (token) {
      config.headers.Authorization = token;       // ✅ Attach token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor — Global Error Handler for 401 Unauthorized (Token Expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Session Expired! Please Login Again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
