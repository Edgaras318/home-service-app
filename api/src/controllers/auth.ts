// src/controllers/auth.ts
import { Request, Response } from 'express';
import User from "../models/user";
import { generateToken } from '../utils/tokenUtils';

// POST /auth/login
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
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
    // Generate JWT token
    const token = generateToken(user._id);

    const userDetails = await User.findById(user._id).select(
        "-password"
    );

    // Send the token as response
    return res
        .status(200)
        .json({ status: "success", token, user: userDetails });
  } catch (error: any) {

    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /auth/register
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, age, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: 'Please provide all required fields (name, age, email, password).' });
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
    const token = generateToken(user._id);

    // Convert user to plain object and exclude password
    const { password: _, ...userWithoutPassword } = user.toObject(); // Use destructuring to exclude the password

    // Send the token as response
    return res
        .status(201)
        .json({ status: "success", token, user: userWithoutPassword });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
