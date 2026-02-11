import axios from 'axios';

// ------------------------
// API URL Strategy
// ------------------------
/**
 * Always use relative /api routes from the browser:
 * - Development: Vite proxy handles /api -> localhost backend
 * - Production: Vercel rewrite handles /api -> backend-lumii.vercel.app
 *
 * This avoids direct browser TLS calls to backend domains that can trigger
 * ERR_SSL_PROTOCOL_ERROR in some networks/devices.
 */
const API_BASE_URL = '';

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
} else {
  console.log('🚀 API mode: PRODUCTION (Using Vercel rewrite /api -> backend)');
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
        'Network error. Please retry. If it persists, the API gateway or backend may be temporarily unreachable.';
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