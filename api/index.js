// This file is used by Vercel as an API route
// It simply imports and exports the Express app from the backend

// Root API handler for Vercel serverless functions
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
async function connectToDatabase() {
  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Get MongoDB URI from environment variables or use default
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('MongoDB Connected in root API handler');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

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
    timestamp: new Date().toISOString(),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
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
module.exports = async (req, res) => {
  try {
    // Connect to the database before handling the request
    await connectToDatabase();
    
    // Handle the request with the Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ 
      error: 'Server Error', 
      message: 'Could not connect to database'
    });
  }
}; 