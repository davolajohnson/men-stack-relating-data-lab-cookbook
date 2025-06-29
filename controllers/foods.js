const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

// INDEX - View pantry
router.get('/', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render('foods/index', { pantry: user.pantry, userId: user._id });
});

// NEW - Form to add item
router.get('/new', (req, res) => {
  res.render('foods/new', { userId: req.params.userId });
});

// CREATE - Add new item
router.post('/', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.push({ name: req.body.name });
  await user.save();
  res.redirect(`/users/${user._id}/foods`);
});

// EDIT - Form to edit item
router.get('/:itemId/edit', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const food = user.pantry.id(req.params.itemId);
  res.render('foods/edit', { food, userId: user._id });
});

// UPDATE - Save edited item
router.put('/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const food = user.pantry.id(req.params.itemId);
  food.set({ name: req.body.name });
  await user.save();
  res.redirect(`/users/${user._id}/foods`);
});

// DELETE - Remove item
router.delete('/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.id(req.params.itemId).deleteOne();
  await user.save();
  res.redirect(`/users/${user._id}/foods`);
});

module.exports = router;
