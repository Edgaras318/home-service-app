import { Request, Response } from 'express';
import { Business } from '../models/business';
import { Booking } from '../models/booking';
import { Category } from '../models/category';
import mongoose from 'mongoose';
import { sendResponse } from '../utils/responseUtil'; // Import the utility function

// GET /businesses
export const getAllBusinesses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const businesses = await Business.find().populate('category');

    return sendResponse(res, businesses); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
};

// GET /businesses/category/:category
export const getBusinessesByCategory = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.params;
  try {
    const businesses = await Business.find({ category }).populate('category');
    return sendResponse(res, businesses); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
};

// GET /businesses/:id
export const getBusinessById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const business = await Business.findById(req.params.id).populate('category');
    if (!business) {
      return sendResponse(res, undefined, 'Business not found', 404); // Use the standardized response function
    }
    return sendResponse(res, business); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500);
  }
};

// POST /businesses
export const createBusiness = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.body;

  // Check if the category exists
  if (!mongoose.Types.ObjectId.isValid(category)) {
    return sendResponse(res, undefined, 'Invalid category ID', 400); // Use the standardized response function
  }

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    return sendResponse(res, undefined, 'Category does not exist', 400); // Use the standardized response function
  }

  const business = new Business(req.body);

  try {
    const savedBusiness = await business.save();
    return sendResponse(res, savedBusiness, 'Business created successfully.', 201); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Bad Request', 400); // Use the standardized response function
  }
};

// PUT /businesses/:id
export const updateBusiness = async (req: Request, res: Response): Promise<Response> => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return sendResponse(res, undefined, 'Business not found', 404); // Use the standardized response function
    }

    // Update the business properties
    Object.assign(business, req.body);
    const updatedBusiness = await business.save();
    return sendResponse(res, updatedBusiness, 'Business updated successfully.'); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Bad Request', 400); // Use the standardized response function
  }
};

// GET /businesses/:businessId/bookings/date/:date
export const getBookingsByBusinessAndDate = async (req: Request, res: Response): Promise<Response> => {
  const { businessId, date } = req.params;
  try {
    const bookings = await Booking.find({ businessId, date });
    return sendResponse(res, bookings); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, err instanceof Error ? err.message : 'Internal Server Error', 500); // Use the standardized response function
  }
};
