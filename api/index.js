import express from 'express';
import cors from 'cors';
import paymentRoutes from '../routes/index.js';

const app = express();

// 1. Proactive CORS (Handles the Preflight 'OPTIONS' request)
app.use(cors({
  origin: ["http://localhost:5175", "https://your-frontend-domain.vercel.app"],
  methods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. The "Safety" Root Route (Stops the 404s in your logs)
app.get('/', (req, res) => {
  res.status(200).send("Lumii Backend is Live");
});

// 3. Mount the routes
// This ensures that /api/payment/initialize works correctly
app.use('/api', paymentRoutes);

export default app;
