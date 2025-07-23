import jwt from 'jsonwebtoken';

const JWT_SECRET = 'eatzup_secret';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
