const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST Route for User Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Export router — THIS WAS MISSING
module.exports = router;