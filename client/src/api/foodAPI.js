import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/food'
});

export const fetchFoodItems = () => API.get('/');