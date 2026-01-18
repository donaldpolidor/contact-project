require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const { swaggerSpec, swaggerUi, swaggerUiOptions } = require('./swagger');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Route for raw Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Route middleware - Using /api prefix for better API structure
app.use('/api/contacts', contactRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API information
 *     description: Returns basic information about the Contacts API
 *     tags: [API Info]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contacts API - MVC Structure
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     getContacts:
 *                       type: string
 *                       example: GET /api/contacts
 *                     getContact:
 *                       type: string
 *                       example: GET /api/contacts/:id
 *                     createContact:
 *                       type: string
 *                       example: POST /api/contacts
 *                     updateContact:
 *                       type: string
 *                       example: PUT /api/contacts/:id
 *                     deleteContact:
 *                       type: string
 *                       example: DELETE /api/contacts/:id
 *                     documentation:
 *                       type: string
 *                       example: GET /api-docs
 *                     health:
 *                       type: string
 *                       example: GET /health
 */
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
      documentation: 'GET /api-docs',
      swaggerJson: 'GET /swagger.json',
      health: 'GET /health'
    }
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API and MongoDB connection
 *     tags: [API Info]
 *     responses:
 *       200:
 *         description: Health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *                 mongodb:
 *                   type: string
 *                   example: connected
 */
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
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON: http://localhost:${PORT}/swagger.json`);
  console.log(`Contacts API: http://localhost:${PORT}/api/contacts`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;