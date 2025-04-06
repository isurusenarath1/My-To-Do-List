import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your Vercel domain and localhost
app.use(cors({
  origin: ['https://my-to-do-list-vercel.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your backend modules
import Todo from './backend/models/Todo.js';
import todosRouter from './backend/routes/todos.js';

// Mount API routes
app.use('/api/todos', todosRouter);

// Add a health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP', 
    mongo: mongoose.connection.readyState ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Todo API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
          h1, h2 { color: #333; }
          .endpoint { margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1>Todo API</h1>
        <p>API server for the Todo List application</p>
        
        <h2>Available Endpoints:</h2>
        <div class="endpoint">
          <h3>GET /api/todos</h3>
          <p>Get all todos. Can filter by query parameters:</p>
          <pre>?completed=true - Gets completed todos
?completed=false - Gets active todos
?deleted=true - Gets deleted todos</pre>
        </div>
        
        <div class="endpoint">
          <h3>POST /api/todos</h3>
          <p>Create a new todo</p>
        </div>
        
        <div class="endpoint">
          <h3>PATCH /api/todos/:id</h3>
          <p>Update a todo</p>
        </div>
        
        <div class="endpoint">
          <h3>DELETE /api/todos/:id</h3>
          <p>Soft delete a todo</p>
        </div>
        
        <div class="endpoint">
          <h3>PATCH /api/todos/:id/restore</h3>
          <p>Restore a deleted todo</p>
        </div>
        
        <div class="endpoint">
          <h3>GET /health</h3>
          <p>Check API health</p>
        </div>

        <p>Frontend is available at: 
          <a href="https://my-to-do-list-vercel.vercel.app">https://my-to-do-list-vercel.vercel.app</a>
        </p>
      </body>
    </html>
  `);
});

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
    
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`MongoDB URI: ${mongoURI.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:****@')}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 