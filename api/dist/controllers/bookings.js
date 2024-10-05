"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.createBooking = exports.getBookingsByUserEmail = void 0;
const booking_1 = require("../models/booking"); // Correct the import to match your model export
// GET /bookings/user/:email
const getBookingsByUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.Booking.find({ userEmail: req.params.email }); // Use Booking instead of Bookings
        return res.status(200).json(bookings);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getBookingsByUserEmail = getBookingsByUserEmail;
// POST /bookings
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body; // You may define an interface for the booking data if needed
    const booking = new booking_1.Booking(bookingData); // Use Booking instead of Bookings
    try {
        const savedBooking = yield booking.save();
        return res.status(201).json(savedBooking);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
exports.createBooking = createBooking;
// DELETE /bookings/:id
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        const deletedBooking = yield booking_1.Booking.findByIdAndDelete(bookingId); // Use Booking instead of Bookings
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(204).send(); // No content, successful deletion
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.deleteBooking = deleteBooking;
