// src/api/index.js
import axios from 'axios';

const productionUrl = import.meta.env.VITE_API_URL || 'https://backend-lumii.vercel.app/api';

// Create axios instance with SSL error handling
const api = axios.create({
  baseURL: "https://backend-lumii-production.up.railway.app/api", // Railway backend
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  // Note: In production, SSL should be properly configured
  // This is for development/testing only
  httpsAgent: undefined, // Let axios handle SSL normally
});

// Use real API in both development and production
// Remove mock API to test real backend connection
console.log('🔗 Using real API connection:', productionUrl);

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);

    // Enhanced error handling for different scenarios
    if (!error.response) {
      // Network error - server not reachable
      if (error.code === 'ECONNABORTED') {
        error.customMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        error.customMessage = 'Unable to connect to payment server. The server may be down or there may be a network issue.';
      } else if (error.message.includes('SSL') || error.message.includes('TLS') || error.message.includes('certificate')) {
        error.customMessage = 'SSL certificate error. The payment server has security certificate issues. Please contact support.';
      } else {
        error.customMessage = 'Network error. Please check your internet connection and try again.';
      }
    } else if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      if (status === 500) {
        error.customMessage = 'Server error. Please try again later or contact support.';
      } else if (status === 404) {
        error.customMessage = 'Payment service not found. Please contact support.';
      } else if (status === 403) {
        error.customMessage = 'Access denied. Please check your credentials.';
      } else if (status >= 400 && status < 500) {
        error.customMessage = error.response.data?.message || 'Request error. Please check your information and try again.';
      } else {
        error.customMessage = 'Server error. Please try again later.';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
