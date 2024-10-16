import jwt from 'jsonwebtoken';
import { Types } from "mongoose";

const expiresIn = "1h";
export const generateToken = (userId: Types.ObjectId) => {
  const payload = { id: userId.toString() }; // Wrap ObjectId into a string
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
  return token;
};
