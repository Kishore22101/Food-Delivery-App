const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB Atlas
mongoose.connect(
  'mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/food-app?retryWrites=true&w=majority&appName=EatzUpCluster',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Create user
async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10); // your password
    const newUser = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword
    });

    await newUser.save();
    console.log('✅ Test user created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating user:', err.message);
  }
}

createUser();
