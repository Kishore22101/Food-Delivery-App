const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/fooddeliveryapp?retryWrites=true&w=majority&appName=EatzUpCluster')
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Import Routes
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ✅ Use Routes
app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('✅ Backend Server is Running with MongoDB!');
});

// ✅ Start the Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});