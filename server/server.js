import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
// import foodRoutes from './routes/foodRoutes.js'; // Optional for now

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/food-app?retryWrites=true&w=majority&appName=EatzUpCluster';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
// app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
  res.send('🥳 EatzUp Server (Atlas) Running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
