const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.user = decoded; // Save user info in the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
