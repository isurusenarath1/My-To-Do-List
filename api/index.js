// This file is used by Vercel as an API route
// It simply imports and exports the Express app from the backend

// Import the Express app
const app = require('../backend/server');

// Root API handler for Vercel serverless functions
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'API root endpoint is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Serverless function handler
module.exports = (req, res) => {
  return app(req, res);
}; 