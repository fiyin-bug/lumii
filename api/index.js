const express = require('express');
const cors = require('cors');
// Import your existing routes - adjust the path if your routes folder is elsewhere
const paymentRoutes = require('../routes/index.js');

const app = express();

// Essential Middleware
app.use(cors({
    origin: ["http://localhost:5175", "https://your-frontend-domain.vercel.app"],
    credentials: true
}));
app.use(express.json());

// This is the "Base" route for the serverless function
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is Live' });
});

// Mount your existing routes
// Since Vercel routes /api/* to this file, we handle the sub-routes here
app.use('/api', paymentRoutes);

// Export the app for Vercel
module.exports = app;
