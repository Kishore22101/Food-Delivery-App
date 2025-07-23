// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Import routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); // if exists

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB URI with working username/password
const MONGO_URI = 'mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/food-app?retryWrites=true&w=majority&appName=EatzUpCluster';

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ Routes
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
