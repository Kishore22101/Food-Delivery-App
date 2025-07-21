const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/fooddeliveryapp?retryWrites=true&w=majority&appName=EatzUpCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch((err) => console.log('MongoDB Connection Failed:', err));

app.use(express.json());

const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/food', foodRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend Working Fine with MongoDB!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});