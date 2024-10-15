import { Category } from '../models/category';
import { Request, Response } from 'express';
import { sendResponse } from '../utils/responseUtil'; // Import the utility function

// GET /categories
export const getAllCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.find();
    return sendResponse(res, categories); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
};

// POST /categories
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name, backgroundColor, iconUrl } = req.body;

  // Validation for the request body
  if (!name || !backgroundColor || !iconUrl) {
    return sendResponse(res, undefined, 'All fields are required.', 400); // Use the standardized response function
  }

  const category = new Category({ name, backgroundColor, iconUrl });

  try {
    const savedCategory = await category.save();
    return sendResponse(res, savedCategory, 'Category created successfully.', 201); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Bad Request', 400);
  }
};
