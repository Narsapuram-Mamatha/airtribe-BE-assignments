const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;


async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = { connectDB };