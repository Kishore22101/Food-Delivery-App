// server/index.js – EatzUp Express Backend
const express = require('express');
const cors    = require('cors');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

/* ── In-memory store (replace with MongoDB/PostgreSQL in production) ── */
const orders = [];
const users  = [
  { id: 'u1', name: 'EatzUp User', email: 'user@eatzup.com', password: 'eatzup123' }
];

/* ── Food Data ── */
const foods = require('./data/foods.json');

/* ─────────────────────── ROUTES ─────────────────────── */

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EatzUp API is running', timestamp: new Date().toISOString() });
});

// GET /api/foods – All food items (optionally filter by category)
app.get('/api/foods', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(foods.filter(f => f.category.toLowerCase() === category.toLowerCase()));
  }
  res.json(foods);
});

// GET /api/foods/:name – Single food item
app.get('/api/foods/:name', (req, res) => {
  const food = foods.find(f => f.name.toLowerCase() === decodeURIComponent(req.params.name).toLowerCase());
  if (!food) return res.status(404).json({ error: 'Food item not found' });
  res.json(food);
});

// POST /api/users/login – Mock login
app.post('/api/users/login', (req, res) => {
  const emailVal = req.body.email || req.body.emailOrMobile;
  const { password } = req.body;

  if (!emailVal || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Find user case-insensitively by email
  const user = users.find(u => 
    u.email && u.email.toLowerCase() === emailVal.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile || '',
      address: user.address || '',
      pincode: user.pincode || '',
      joined: user.joined || 'July 2023'
    }
  });
});


// POST /api/users/register – Mock registration
app.post('/api/users/register', (req, res) => {
  const { name, email, password, mobile, address, pincode } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered.' });
  }
  const joinedDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    mobile: mobile || '',
    address: address || '',
    pincode: pincode || '',
    joined: joinedDate
  };
  users.push(newUser);
  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: newUser.id,
      name,
      email,
      mobile: newUser.mobile,
      address: newUser.address,
      pincode: newUser.pincode,
      joined: newUser.joined
    }
  });
});

// POST /api/orders – Place an order
app.post('/api/orders', (req, res) => {
  const { cartItems, userId, paymentMethod } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' });
  }
  const subtotal    = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const gst         = subtotal * 0.12;
  const delivery    = 70;
  const deliveryGST = delivery * 0.05;
  const grandTotal  = subtotal + gst + delivery + deliveryGST;

  const order = {
    orderId:        uuidv4().slice(0, 8).toUpperCase(),
    userId:         userId || 'guest',
    items:          cartItems,
    subtotal,
    gst,
    delivery,
    deliveryGST,
    grandTotal,
    paymentMethod:  paymentMethod || 'COD',
    status:         'confirmed',
    placedAt:       new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json({ message: 'Order placed successfully', order });
});

// GET /api/orders – All orders (or by userId)
app.get('/api/orders', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    return res.json(orders.filter(o => o.userId === userId));
  }
  res.json(orders);
});

// GET /api/orders/:orderId – Single order
app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json(order);
});

// POST /api/newsletter – Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  res.json({ message: 'Subscribed successfully!', email });
});

/* ── 404 ── */
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

/* ── Error handler ── */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`\n  EatzUp API Server running at http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health\n`);
});
