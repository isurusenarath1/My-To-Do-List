import { spawn } from 'child_process';

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
    // Build the frontend
    await createProcess('npm', ['run', 'build:frontend'], 'FRONTEND', colors.magenta);
    
    console.log(`${colors.green}${colors.bright}========================================${colors.reset}`);
    console.log(`${colors.green}${colors.bright}  Build Completed Successfully!${colors.reset}`);
    console.log(`${colors.green}${colors.bright}========================================${colors.reset}`);
    console.log('');
    console.log(`To run the application in development mode:`);
    console.log(`${colors.cyan}npm start${colors.reset}`);
    console.log('');
    
  } catch (error) {
    console.error(`${colors.red}Build failed: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run the build process
buildApplication(); 