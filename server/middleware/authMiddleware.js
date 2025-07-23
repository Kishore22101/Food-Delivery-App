// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ JWT Missing or Malformed Header');
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = decoded;
    next();
  } catch (err) {
    console.log(`❌ JWT Error: ${err.name} → ${err.message}`);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
