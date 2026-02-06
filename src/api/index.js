import axios from 'axios';

// ------------------------
// Backend URLs & Environment Logic
// ------------------------

/**
 * Dynamic API URL configuration:
 * - Development: Empty baseURL (requests made to /api/... get proxied by Vite)
 * - Production: Uses VITE_API_URL env var or fallback to production URL
 */
const isDev = import.meta.env.DEV;
const API_BASE_URL = isDev
  ? ''  // Empty baseURL - requests to /api/... get proxied by Vite
  : (import.meta.env.VITE_API_URL || 'https://backend-lumii.vercel.app');

// ------------------------
// Axios instance
// ------------------------
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ------------------------
// Development logging
// ------------------------
if (import.meta.env.DEV) {
  console.log('🚀 API mode: DEVELOPMENT (Using Vite Proxy)');
  console.log('🔗 Base URL set to:', api.defaults.baseURL);
}

// ------------------------
// Request interceptor
// ------------------------
api.interceptors.request.use(
  (config) => {
    // Helpful for debugging in the console
    console.log(`➡️ ${config.method?.toUpperCase()} request to: ${config.url}`);
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
        'Network error. Is the backend running at localhost:5000?';
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