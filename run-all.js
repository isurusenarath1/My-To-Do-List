import { spawn } from 'child_process';
import fs from 'fs';
import readline from 'readline';

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
console.log(`${colors.bright}${colors.cyan}  Todo List Application${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}========================================${colors.reset}`);

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log(`${colors.yellow}No .env file found. Setting up MongoDB connection...${colors.reset}`);
  setupMongoDB();
} else {
  startApplication();
}

// Function to set up MongoDB connection
function setupMongoDB() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`${colors.bright}This script will set up your MongoDB Atlas connection.${colors.reset}`);
  console.log('You\'ll need your MongoDB Atlas connection string.');
  console.log('');

  rl.question(`${colors.cyan}Enter your MongoDB Atlas password: ${colors.reset}`, (password) => {
    // Create the MongoDB URI with the provided password
    const mongoUri = `mongodb+srv://isurusenarath:${password}@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB`;
    
    // Create the .env file content
    const envContent = `MONGODB_URI=${mongoUri}\nPORT=5000\nVITE_API_URL=http://localhost:5000/api/todos`;
    
    // Write the .env file
    fs.writeFileSync('.env', envContent);
    
    console.log('');
    console.log(`${colors.green}.env file created successfully!${colors.reset}`);
    console.log('');
    
    rl.close();
    
    // Start the application after setup
    startApplication();
  });
}

// Function to create a new process
function createProcess(command, args, name, textColor) {
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
      console.log(`${colors.red}[${name}] Process exited with code ${code}${colors.reset}`);
    } else {
      console.log(`${textColor}[${name}] Process exited normally${colors.reset}`);
    }
  });

  return proc;
}

// Function to start the application
function startApplication() {
  // First test the MongoDB connection
  console.log(`${colors.yellow}Testing MongoDB connection...${colors.reset}`);
  const testDbProcess = spawn('node', ['backend/test-db-connection.js'], { stdio: 'inherit' });

  testDbProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`${colors.red}MongoDB connection test failed. Please check your connection settings.${colors.reset}`);
      process.exit(1);
    }
    
    console.log(`${colors.green}MongoDB connection successful!${colors.reset}`);
    console.log(`${colors.yellow}Starting backend and frontend servers...${colors.reset}`);
    
    // Start the backend server
    const backendProcess = createProcess('npm', ['run', 'server'], 'BACKEND', colors.cyan);
    
    // Give the backend a moment to start up before starting the frontend
    setTimeout(() => {
      // Start the frontend development server
      const frontendProcess = createProcess('npm', ['run', 'dev'], 'FRONTEND', colors.magenta);
      
      // Handle application termination
      const cleanup = () => {
        console.log(`${colors.yellow}Shutting down servers...${colors.reset}`);
        backendProcess.kill();
        frontendProcess.kill();
        process.exit(0);
      };
      
      // Listen for termination signals
      process.on('SIGINT', cleanup);
      process.on('SIGTERM', cleanup);
      
    }, 2000); // 2 second delay before starting frontend
  });
} 