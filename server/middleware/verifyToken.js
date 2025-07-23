const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, 'jwtSecretKey'); // ✅ Same as login key
    req.user = verified;
    next();
  } catch (err) {
    console.log("❌ JWT Error:", err.message);
    return res.status(401).json({ message: 'Invalid or Expired Token.' });
  }
};

module.exports = verifyToken;
