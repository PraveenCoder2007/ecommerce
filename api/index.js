const express = require('express');
const cors = require('cors');
const { initDB } = require('../backend/db/turso');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// Routes
app.use('/api/products', require('../backend/routes/products'));
app.use('/api/users', require('../backend/routes/users'));
app.use('/api/cart', require('../backend/routes/cart'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;