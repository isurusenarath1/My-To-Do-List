import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('========================================');
console.log('  MongoDB Atlas Setup');
console.log('========================================');
console.log('');
console.log('This script will help you set up your MongoDB Atlas connection.');
console.log('You\'ll need your MongoDB Atlas connection string.');
console.log('');

// Prompt the user for their MongoDB password
rl.question('Enter your MongoDB Atlas password: ', (password) => {
  // Create the MongoDB URI with the provided password
  const mongoUri = `mongodb+srv://isurusenarath:${password}@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB`;
  
  // Create the .env file content
  const envContent = `MONGODB_URI=${mongoUri}\nPORT=5000\nVITE_API_URL=http://localhost:5000/api/todos`;
  
  // Write the .env file
  fs.writeFileSync('.env', envContent);
  
  console.log('');
  console.log('.env file created successfully!');
  console.log('');
  
  console.log('Testing MongoDB connection...');
  
  try {
    // Test the MongoDB connection
    execSync('node backend/test-db-connection.js', { stdio: 'inherit' });
    
    console.log('');
    console.log('MongoDB connection successful!');
    console.log('');
    console.log('Setup complete. You can now run the application with:');
    console.log('1. npm run server (in one terminal)');
    console.log('2. npm run dev (in another terminal)');
  } catch (error) {
    console.log('');
    console.log('MongoDB connection failed. Please check your password and try again.');
    console.log('');
  }
  
  rl.close();
}); 