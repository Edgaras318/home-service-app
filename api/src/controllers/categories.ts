import { Category } from '../models/category';
import { Request, Response } from 'express';

// GET /categories
export const getAllCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories); // Explicitly return the response
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// POST /categories
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name, backgroundColor, iconUrl } = req.body;

  // Optionally, you can add validation here for the request body
  if (!name || !backgroundColor || !iconUrl) {
    return res.status(400).json({ message: 'All fields are required.' }); // Explicitly return the response
  }

  const category = new Category({ name, backgroundColor, iconUrl });

  try {
    const savedCategory = await category.save();
    return res.status(201).json(savedCategory); // Explicitly return the response
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
  }
};
