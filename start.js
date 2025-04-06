const { execSync } = require('child_process');
const fs = require('fs');

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
  console.log('  Starting My Todo List App...');
  console.log('========================================');
  console.log('');
  
  // Start the application
  execSync('npm run dev:all', { stdio: 'inherit' });
} catch (error) {
  console.log('');
  console.log('Error occurred while starting the application');
  console.log('Please check the error message above');
  console.log('');
  process.exit(1);
} 