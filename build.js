import { spawn } from 'child_process';
import fs from 'fs';

// ANSI color codes for better readability
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}  Building Todo List Application${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log(`${colors.red}Error: .env file not found${colors.reset}`);
  console.log(`Please run "npm start" first to configure your MongoDB connection${colors.reset}`);
  process.exit(1);
}

// Function to create a new process
function createProcess(command, args, name, textColor) {
  return new Promise((resolve, reject) => {
    console.log(`${textColor}Starting ${name} build...${colors.reset}`);
    
    const proc = spawn(command, args, { shell: true });
    
    // Handle standard output
    proc.stdout.on('data', (data) => {
      const lines = data.toString().trim().split('\n');
      lines.forEach(line => {
        console.log(`${textColor}[${name}]${colors.reset} ${line}`);
      });
    });

    // Handle standard error
    proc.stderr.on('data', (data) => {
      const lines = data.toString().trim().split('\n');
      lines.forEach(line => {
        console.log(`${colors.red}[${name} ERROR]${colors.reset} ${line}`);
      });
    });

    // Handle process exit
    proc.on('close', (code) => {
      if (code !== 0) {
        console.log(`${colors.red}[${name}] Build failed with code ${code}${colors.reset}`);
        reject(new Error(`${name} build failed with code ${code}`));
      } else {
        console.log(`${colors.green}[${name}] Build completed successfully${colors.reset}`);
        resolve();
      }
    });
  });
}

async function buildApplication() {
  try {
    // Create the dist directory for the backend if it doesn't exist
    if (!fs.existsSync('./dist/backend')) {
      fs.mkdirSync('./dist/backend', { recursive: true });
    }

    // Build the frontend
    await createProcess('npm', ['run', 'build:frontend'], 'FRONTEND', colors.magenta);
    
    // Build the backend
    console.log(`${colors.cyan}Copying backend files to dist folder...${colors.reset}`);
    
    // Copy backend files to dist/backend
    copyDirectoryRecursive('./backend', './dist/backend');
    
    // Copy .env file
    fs.copyFileSync('./.env', './dist/.env');
    
    // Create a production server.js in the dist folder
    createProductionServerFile();
    
    // Create a package.json for the production build
    createProductionPackageJson();
    
    console.log(`${colors.green}${colors.bright}========================================${colors.reset}`);
    console.log(`${colors.green}${colors.bright}  Build Completed Successfully!${colors.reset}`);
    console.log(`${colors.green}${colors.bright}========================================${colors.reset}`);
    console.log('');
    console.log(`To run the production build:`);
    console.log(`1. Navigate to the dist folder: ${colors.cyan}cd dist${colors.reset}`);
    console.log(`2. Install dependencies: ${colors.cyan}npm install --production${colors.reset}`);
    console.log(`3. Start the server: ${colors.cyan}node server.js${colors.reset}`);
    console.log('');
    console.log(`The application will be available at: ${colors.cyan}http://localhost:5000${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}Build failed: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

function copyDirectoryRecursive(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read source directory contents
  const files = fs.readdirSync(source);

  // Copy each file/directory
  for (const file of files) {
    const sourcePath = `${source}/${file}`;
    const destPath = `${destination}/${file}`;

    // Check if it's a directory or file
    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      // Recursively copy directory
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`${colors.cyan}[BACKEND] Copied: ${sourcePath} -> ${destPath}${colors.reset}`);
    }
  }
}

function createProductionServerFile() {
  const serverContent = `
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import todoRoutes from './backend/routes/todos.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// API routes
app.use('/api/todos', todoRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
  console.log(\`MongoDB URI: \${mongoURI.replace(/mongodb\\+srv:\\/\\/([^:]+):[^@]+@/, 'mongodb+srv://$1:****@')}\`);
});
`;

  fs.writeFileSync('./dist/server.js', serverContent);
  console.log(`${colors.cyan}[BACKEND] Created production server.js${colors.reset}`);
}

function createProductionPackageJson() {
  const packageJson = {
    "name": "my-todo-list-production",
    "version": "1.0.0",
    "type": "module",
    "main": "server.js",
    "scripts": {
      "start": "node server.js"
    },
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^16.4.7",
      "express": "^5.1.0",
      "mongoose": "^8.13.2"
    }
  };

  fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
  console.log(`${colors.cyan}[BACKEND] Created production package.json${colors.reset}`);
}

// Run the build process
buildApplication(); 