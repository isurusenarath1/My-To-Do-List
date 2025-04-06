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
  console.log(`${colors.red}No .env file found. Create a .env file with the following content:${colors.reset}`);
  console.log(`MONGODB_URI=mongodb+srv://<username>:<password>@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB`);
  console.log(`PORT=5000`);
  console.log(`VITE_API_URL=http://localhost:5000/api/todos`);
  process.exit(1);
} else {
  startApplication();
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
  console.log(`${colors.yellow}Starting backend and frontend servers...${colors.reset}`);
  
  // Start the backend server
  const backendProcess = createProcess('npm', ['run', 'server'], 'BACKEND', colors.cyan);
  
  // Give the backend a moment to start up before starting the frontend
  setTimeout(() => {
    // Start the frontend development server using dev:frontend to avoid infinite loop
    const frontendProcess = createProcess('npm', ['run', 'dev:frontend'], 'FRONTEND', colors.magenta);
    
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
} 