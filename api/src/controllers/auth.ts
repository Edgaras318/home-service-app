// src/controllers/auth.ts
import { Request, Response } from 'express';
import User from "../models/user";
import { generateToken } from '../utils/tokenUtils';
import { sendResponse } from '../utils/responseUtil'; // Import the utility function

// POST /auth/login
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return sendResponse(res, undefined, "Please provide both email and password.", 400); // Use the standardized response function
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, undefined, 'Invalid email or password', 400); // Use the standardized response function
    }

    // Verify the password using instance method
    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      return sendResponse(res, undefined, 'Invalid email or password', 400); // Use the standardized response function
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Exclude password from the user details
    const userDetails = await User.findById(user._id).select("-password");

    // Send the token and user details as response
    return sendResponse(res, { token, user: userDetails }, 'Login successful'); // Use the standardized response function
  } catch (error: any) {
    return sendResponse(res, undefined, 'Server error', 500); // Use the standardized response function
  }
};

// POST /auth/register
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, age, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password || !age) {
    return sendResponse(res, undefined, 'Please provide all required fields (name, age, email, password).', 400); // Use the standardized response function
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return sendResponse(res, undefined, 'User already exists', 400); // Use the standardized response function
    }

    // Create a new user instance
    user = new User({ name, age, email, password });

    // Save the new user
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Exclude password from the user object
    const { password: _, ...userWithoutPassword } = user.toObject(); // Use destructuring to exclude the password

    // Send the token and user details as response
    return sendResponse(res, { token, user: userWithoutPassword }, 'Registration successful', 201); // Use the standardized response function
  } catch (error: any) {
    return sendResponse(res, undefined, 'Server error', 500); // Use the standardized response function
  }
};
