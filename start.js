import { execSync } from 'child_process';
import fs from 'fs';

console.log('========================================');
console.log('  Testing MongoDB Connection...');
console.log('========================================');

try {
  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.log('Error: .env file not found');
    console.log('Please run "node setup.js" first to configure your MongoDB connection');
    process.exit(1);
  }

  // Test MongoDB connection
  execSync('node backend/test-db-connection.js', { stdio: 'inherit' });
  
  console.log('');
  console.log('========================================');
  console.log('  My Todo List App - Startup Guide');
  console.log('========================================');
  console.log('');
  console.log('The application needs to be started in two separate terminals:');
  console.log('');
  console.log('1. Start the backend server:');
  console.log('   Open a terminal and run:');
  console.log('   npm run server');
  console.log('');
  console.log('2. Start the frontend development server:');
  console.log('   Open another terminal and run:');
  console.log('   npm run dev');
  console.log('');
  console.log('Once both are running, the Todo List app will be available at:');
  console.log('http://localhost:5173');
  console.log('');
  console.log('Press Ctrl+C in each terminal to stop the servers when done.');
  console.log('');
} catch (error) {
  console.log('');
  console.log('Error occurred during MongoDB connection test');
  console.log('Please check the error message above');
  console.log('');
  process.exit(1);
} 