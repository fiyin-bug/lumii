// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-lumii.vercel.app/api',
});

export default api;
