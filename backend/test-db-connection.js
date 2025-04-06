// CommonJS module
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from the .env file in the parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Testing MongoDB Connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');

if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is not set');
  console.log('Please check your .env file and ensure it contains:');
  console.log('MONGODB_URI=mongodb+srv://isurusenarath:isuru123@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    mongoose.connection.close();
    console.log('Connection closed');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB');
    console.error('Error details:', err.message);
    process.exit(1);
  }); 