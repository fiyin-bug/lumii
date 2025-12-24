import axios from 'axios';

// ------------------------
// Backend URLs
// ------------------------
const isDev = import.meta.env.DEV;

// Use your permanent Vercel domain instead of the temporary deployment ID
const productionUrl = 'https://backend-lumii.vercel.app'; 
const localUrl = 'http://localhost:5000'; // Standard local backend port

// ------------------------
// Axios instance
// ------------------------
const api = axios.create({
  // Automatically switch between local and production based on where you are running
  baseURL: isDev ? productionUrl : productionUrl, 
  timeout: 30000, 
  headers: { 'Content-Type': 'application/json' },
});

// ------------------------
// Development logging
// ------------------------
if (isDev) {
  console.log('🚀 Running in development mode - API calls will go to:', api.defaults.baseURL);
}

// ------------------------
// Request interceptor
// ------------------------
api.interceptors.request.use(
  (config) => {
    // Ensure the URL starts with /api if your backend routes require it
    // If your backend endpoints already start with /api (like /api/payment/initialize), this is perfect
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
        'Network error. Please check your connection or verify the backend is active at ' + productionUrl;
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