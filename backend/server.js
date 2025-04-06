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

// Middleware
app.use(cors());
app.use(express.json());

// Log environment status
console.log('Environment variables loaded:', process.env.MONGODB_URI ? 'MongoDB URI found' : 'MongoDB URI missing');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/todos', todoRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app; 