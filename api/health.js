// Health check endpoint for Vercel serverless function
const mongoose = require('mongoose');

module.exports = (req, res) => {
  // Send a response with the current health status
  res.status(200).json({ 
    status: 'ok', 
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
  });
}; 