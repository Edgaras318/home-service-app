import { Booking } from '../models/booking'; // Correct the import to match your model export
import { Request, Response } from 'express';
import { sendResponse } from '../utils/responseUtil'; // Import the utility function

// GET /bookings/user/:email
export const getBookingsByUserEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email });
    return sendResponse(res, bookings); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, (err as Error).message, 500); // Use the standardized response function
  }
};

// POST /bookings
export const createBooking = async (req: Request, res: Response): Promise<Response> => {
  const bookingData = req.body; // You may define an interface for the booking data if needed
  const booking = new Booking(bookingData);

  try {
    const savedBooking = await booking.save();
    return sendResponse(res, savedBooking, 'Booking created successfully.', 201); // Use the standardized response function
  } catch (err) {
    return sendResponse(res, undefined, (err as Error).message, 400); // Use the standardized response function
  }
};

// DELETE /bookings/:id
export const deleteBooking = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return sendResponse(res, undefined, 'Booking not found', 404); // Use the standardized response function
    }
    return sendResponse(res, undefined, 'Booking deleted successfully.', 204); // No content response
  } catch (err) {
    return sendResponse(res, undefined, (err as Error).message, 500); // Use the standardized response function
  }
};
