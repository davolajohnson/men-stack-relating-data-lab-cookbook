const mongoose = require('mongoose');

// Define the embedded food schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Main user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema] // Embed food schema here
});

module.exports = mongoose.model('User', userSchema);


