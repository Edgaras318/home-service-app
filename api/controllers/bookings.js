const Bookings = require('../models/booking');

// GET /bookings/user/:email
exports.getBookingsByUserEmail = async (req, res) => {
  try {
    const bookings = await Bookings.find({ userEmail: req.params.email });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /bookings
exports.createBooking = async (req, res) => {
  const booking = new Bookings(req.body);
  try {
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /bookings/:id
exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Bookings.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(204).send(); // Added 'return' here
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Added 'return' here
  }
};
