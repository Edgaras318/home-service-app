import { Booking } from '../models/booking'; // Correct the import to match your model export
import { Request, Response } from 'express';

// GET /bookings/user/:email
export const getBookingsByUserEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email }); // Use Booking instead of Bookings
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

// POST /bookings
export const createBooking = async (req: Request, res: Response): Promise<Response> => {
  const bookingData = req.body; // You may define an interface for the booking data if needed
  const booking = new Booking(bookingData); // Use Booking instead of Bookings

  try {
    const savedBooking = await booking.save();
    return res.status(201).json(savedBooking);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

// DELETE /bookings/:id
export const deleteBooking = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId); // Use Booking instead of Bookings
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(204).send(); // No content, successful deletion
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};
