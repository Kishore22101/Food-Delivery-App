const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eatzup', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));
})
.catch(err => console.error('❌ MongoDB Connection Error:', err));
