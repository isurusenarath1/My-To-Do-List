// Health check endpoint for Vercel serverless function
const mongoose = require('mongoose');

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
    console.log('MongoDB Connected in health check function');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return null; // Return null instead of throwing to allow health check to report DB status
  }
}

module.exports = async (req, res) => {
  // Try to connect to the database
  let dbConnection = null;
  try {
    dbConnection = await connectToDatabase();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }

  // Send a response with the current health status
  res.status(200).json({ 
    status: 'ok', 
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
      connection_attempt: dbConnection ? 'success' : 'failed'
    }
  });
}; 