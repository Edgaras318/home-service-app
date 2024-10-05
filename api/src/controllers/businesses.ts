import { Request, Response } from 'express';
import { Business } from '../models/business';
import { Booking } from '../models/booking';

// GET /businesses
export const getAllBusinesses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const businesses = await Business.find().populate('category');
    return res.status(200).json(businesses);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// GET /businesses/category/:category
export const getBusinessesByCategory = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.params;
  try {
    const businesses = await Business.find({ category }).populate('category');
    return res.status(200).json(businesses);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// GET /businesses/:id
export const getBusinessById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const business = await Business.findById(req.params.id).populate('category');
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    return res.status(200).json(business);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};

// POST /businesses
export const createBusiness = async (req: Request, res: Response): Promise<Response> => {
  const business = new Business(req.body);

  try {
    const savedBusiness = await business.save();
    return res.status(201).json(savedBusiness);
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
  }
};

// PUT /businesses/:id
export const updateBusiness = async (req: Request, res: Response): Promise<Response> => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update the business properties
    Object.assign(business, req.body);
    const updatedBusiness = await business.save();
    return res.status(200).json(updatedBusiness);
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'Bad Request' });
  }
};

// GET /businesses/:businessId/bookings/date/:date
export const getBookingsByBusinessAndDate = async (req: Request, res: Response): Promise<Response> => {
  const { businessId, date } = req.params;
  try {
    const bookings = await Booking.find({ businessId, date });
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
  }
};
