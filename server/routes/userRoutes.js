const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Dummy check
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, 'jwtSecretKey', { expiresIn: '1h' });

  res.json({ token, user: { _id: user._id, name: user.name } });
});

module.exports = router;
