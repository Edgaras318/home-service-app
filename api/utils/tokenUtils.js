const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for the given user.
 * @param {Object} user - The user object (typically contains id and email).
 * @returns {String} - Signed JWT token.
 */
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  return token;
};

module.exports = {
  generateToken,
};
