// This file is used by Vercel as an API route
// It simply imports and exports the Express app from the backend

// Import the Express app
const app = require('../backend/server');

// Export it for Vercel serverless functions
module.exports = app; 