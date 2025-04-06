// CommonJS module
// This module uses CommonJS while the frontend uses ESM
require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const path = require('path');
const fs = require('fs');

// Check if .env file exists
if (!fs.existsSync('./.env') && fs.existsSync('../.env')) {
  require('dotenv').config({ path: '../.env' });
  console.log('Loaded .env from parent directory');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from any origin in development
// or from specific origins in production
app.use(cors({
  origin: '*', // Allow all origins for simplicity
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// Log environment status
console.log('Environment variables loaded:', process.env.MONGODB_URI ? 'MongoDB URI found' : 'MongoDB URI missing');

// Get MongoDB URI from environment variables or use default
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

// Connect to MongoDB - only if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));
}

// Routes
app.use('/api/todos', todoRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Todo API Server is running. Use /api/todos to access the API.');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Start the server - always start regardless of environment
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${mongoURI.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:****@')}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export the Express app
module.exports = app; 