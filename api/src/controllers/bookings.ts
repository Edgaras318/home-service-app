import { Booking } from '../models/booking'; // Ensure this matches your model import
import { RequestHandler} from 'express';
import { sendResponse } from '../utils/responseUtil';

// GET /bookings/user/:email
export const getBookingsByUserEmail: RequestHandler = async (req, res): Promise<void> => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email })
        .populate("businessId");
    sendResponse(res, bookings); // Use the standardized response function
  } catch (err) {
    sendResponse(res, undefined, (err as Error).message, 500); // Use the standardized response function
  }
};

// POST /bookings
export const createBooking: RequestHandler = async (req, res): Promise<void> => {
  const bookingData = req.body; // You may define an interface for the booking data if needed
  const booking = new Booking(bookingData);

  try {
    const savedBooking = await booking.save();
    sendResponse(res, savedBooking, 'Booking created successfully.', 201); // Use the standardized response function
  } catch (err) {
    sendResponse(res, undefined, (err as Error).message, 400); // Use the standardized response function
  }
};

// DELETE /bookings/:id
export const deleteBooking: RequestHandler = async (req, res): Promise<void> => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      sendResponse(res, undefined, 'Booking not found', 404); // Use the standardized response function
      return;
    }
    sendResponse(res, undefined, 'Booking deleted successfully.', 204); // No content response
  } catch (err) {
    sendResponse(res, undefined, (err as Error).message, 500); // Use the standardized response function
  }
};
