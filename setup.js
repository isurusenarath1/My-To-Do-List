const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('========================================');
console.log('  MongoDB Atlas Setup Helper');
console.log('========================================');
console.log('');
console.log('This script will help you set up your MongoDB Atlas connection.');
console.log('');

rl.question('Enter your MongoDB Atlas password: ', (password) => {
  console.log('');
  console.log('Updating .env file with your password...');
  console.log('');
  
  const envContent = `# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://isurusenarath:${password}@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB
PORT=5000
`;

  fs.writeFileSync('.env', envContent);
  
  console.log('.env file has been updated with your MongoDB password.');
  console.log('');
  console.log('========================================');
  console.log('  Testing Connection...');
  console.log('========================================');
  
  try {
    execSync('node backend/test-db-connection.js', { stdio: 'inherit' });
    
    console.log('');
    console.log('========================================');
    console.log('  Setup Complete!');
    console.log('========================================');
    console.log('');
    console.log('You can now run the application using:');
    console.log('  npm run dev:all');
    console.log('');
    console.log('Or by running:');
    console.log('  node start.js');
    console.log('');
  } catch (error) {
    console.log('');
    console.log('Error: Failed to connect to MongoDB');
    console.log('Please check your MongoDB Atlas credentials and try again');
    console.log('');
  }
  
  rl.close();
}); 