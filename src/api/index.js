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
const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();

const normalizeProductionApiUrl = (url) => {
  // Default backend if env var is missing
  if (!url) return 'https://backend-lumii.vercel.app';

  // If someone set backend-lumii.vercel.app (without protocol), force HTTPS
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;

  // Vercel domains should never be called over plain HTTP from production frontends
  if (/^http:\/\/.+\.vercel\.app/i.test(url)) {
    return url.replace(/^http:\/\//i, 'https://');
  }

  return url;
};

const API_BASE_URL = isDev
  ? '' // Empty baseURL - requests to /api/... get proxied by Vite
  : normalizeProductionApiUrl(rawApiUrl);

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
  console.log('🚀 API mode: PRODUCTION');
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
        'Network error. Check that VITE_API_URL is a valid HTTPS backend URL and that your backend deployment is reachable.';
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