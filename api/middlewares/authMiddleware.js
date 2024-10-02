/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;