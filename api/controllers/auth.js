const User = require('../models/user').User;
const { generateToken } = require('../utils/tokenUtils');
const { validateUser } = require('../models/user');

// POST /auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  const { error } = validateUser({ email, password, name: 'dummy' }); // Name is a dummy since it's required in schema
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the password using instance method
    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token using the utility
    const token = generateToken(user);

    // Send the token as response
    return res.json({ token }); // Added 'return' here
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message }); // Added 'return' here
  }
};

// POST /auth/register
exports.register = async (req, res) => {
  const { name, age, email, password } = req.body;

  // Validate request body
  const { error } = validateUser({ email, password, name });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    user = new User({ name, age, email, password });

    // Save the new user
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Send the token as response
    return res.status(201).json({ token }); // Added 'return' here
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message }); // Added 'return' here
  }
};
