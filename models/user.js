const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pantry: [foodSchema] // 👈 This embeds food items in the user
});

module.exports = mongoose.model('User', userSchema);


