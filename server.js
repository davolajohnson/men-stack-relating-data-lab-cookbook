// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

// Load middleware
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB menstackcookbook.`);
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Custom Middleware
app.use(passUserToView);

// Controllers
const authController = require('./controllers/auth');
const foodsController = require('./controllers/foods');

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);

// Root Route
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Start server
app.listen(3000, () => {
  console.log('The express app is ready on port 3000!');
});
