// controllers/foods.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

// INDEX - View all pantry items
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('foods/index', { user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW - Show form to add a new item
router.get('/new', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('foods/new', { userId: req.params.userId, user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// CREATE - Add new item to pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// EDIT - Show form to edit item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit', { user, food });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// ✅ UPDATE - Update a pantry item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// DELETE - Remove a pantry item
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
