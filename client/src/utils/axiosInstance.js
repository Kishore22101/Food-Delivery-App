import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

// ✅ Interceptor to add token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ✅ Gets token from localStorage
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;