import { Category } from '../models/category';
import { RequestHandler } from 'express';
import { sendResponse } from '../utils/responseUtil'; // Import the utility function

// GET /categories
export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await Category.find();
    sendResponse(res, categories); // Use the standardized response function
  } catch (err) {
    sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
};

// POST /categories
export const createCategory: RequestHandler = async (req, res) => {
  const { name, backgroundColor, iconUrl } = req.body;

  // Validation for the request body
  if (!name || !backgroundColor || !iconUrl) {
    sendResponse(res, undefined, 'All fields are required.', 400); // Use the standardized response function
    return;
  }

  const category = new Category({ name, backgroundColor, iconUrl });

  try {
    const savedCategory = await category.save();
    sendResponse(res, savedCategory, 'Category created successfully.', 201); // Use the standardized response function
  } catch (err) {
    sendResponse(res, undefined, err instanceof Error ? err.message : 'Bad Request', 400);
  }
};
