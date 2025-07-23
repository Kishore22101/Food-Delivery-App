import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = 'eatzup_secret';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: 'User Registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
