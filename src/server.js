const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Import routes
const microserviceRoutes = require('./routes/microservice');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mount microservice routes
app.use('/api/microservice', microserviceRoutes);

// Example proxy route to a service
// app.use('/api/service1', createProxyMiddleware({
//   target: 'http://service1:8080',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api/service1': '/',
//   },
// }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Gateway server running on port ${PORT}`);
});
