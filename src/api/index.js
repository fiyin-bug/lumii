// src/api/index.js
import axios from 'axios';

// ------------------------
// Backend URLs
// ------------------------
const isDev = import.meta.env.DEV;

const localUrl = 'http://localhost:5000/api'; // Local dev backend (HTTP)
const productionUrl =
  import.meta.env.VITE_API_URL || 'https://backend-lumii-production.up.railway.app/api';

// ------------------------
// Axios instance
// ------------------------
const api = axios.create({
  baseURL: productionUrl, // Use production API in both dev and prod
  timeout: 30000, // 30s timeout
  headers: { 'Content-Type': 'application/json' },
});

// ------------------------
// Mock for dev
// ------------------------
if (isDev) {
  api.interceptors.request.use((config) => {
    if (config.url === '/payment/initialize' && config.method === 'post') {
      // Mock response for payment initialize
      config.adapter = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              authorizationUrl: 'https://example.com/pay', // Mock payment URL
              message: 'Payment initialized successfully (mocked)',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          });
        }, 1000); // Delay to simulate network
      });
    }
    return config;
  });
}

console.log('🔗 Using API Base URL:', api.defaults.baseURL);

// ------------------------
// Request interceptor
// ------------------------
api.interceptors.request.use(
  (config) => {
    console.log('➡️ API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// ------------------------
// Response interceptor
// ------------------------
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error);

    // Network error (no response)
    if (!error.response) {
      error.customMessage =
        'Network error. Check your internet connection or if the backend is running.';
    } else {
      const status = error.response.status;

      if (status >= 400 && status < 500) {
        error.customMessage =
          error.response.data?.message || 'Client error. Check your request.';
      } else {
        error.customMessage = 'Server error. Please try again later.';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
