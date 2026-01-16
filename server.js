require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route middleware - Using /api prefix for better API structure
app.use('/api/contacts', contactRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contacts API - MVC Structure',
    version: '1.0.0',
    endpoints: {
      getContacts: 'GET /api/contacts',
      getContact: 'GET /api/contacts/:id',
      createContact: 'POST /api/contacts',
      updateContact: 'PUT /api/contacts/:id',
      deleteContact: 'DELETE /api/contacts/:id',
      health: 'GET /health'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  const mongoStatus = mongoose.connection.readyState;
  const statusMessages = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: statusMessages[mongoStatus] || 'unknown'
  });
});

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(` Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(` Base URL: http://localhost:${PORT}`);
  console.log(` Contacts API: http://localhost:${PORT}/api/contacts`);
  console.log(`  Health Check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(` Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
