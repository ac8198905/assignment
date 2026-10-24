const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const connectDB       = require('./config/db');
const seedDatabase    = require('./config/seed');
const authRoutes      = require('./routes/authRoutes');
const incidentRoutes  = require('./routes/incidentRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then seed initial data
connectDB().then(() => {
  seedDatabase();
});

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// ── API Routes ──────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/incidents', incidentRoutes);

// Root / Health-check
app.get('/', (req, res) => {
  res.json({
    status:  'online',
    message: 'Disaster Management System API is running',
    version: '2.0.0',
    endpoints: {
      auth:      '/api/auth',
      incidents: '/api/incidents'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚨 DMS Server running on http://localhost:${PORT}`);
  console.log(`📦 MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/dms'}`);
});
