const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/?retryWrites=true&w=majority&appName=EatzUpCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch((err) => console.log('MongoDB Connection Failed:', err));


app.use(express.json());

// Food Routes
const foodRoutes = require('./routes/foodRoutes');
app.use('/api/food', foodRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend Working Fine with MongoDB!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
