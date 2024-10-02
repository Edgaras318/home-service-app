const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/user/:email', bookingsController.getBookingsByUserEmail);

router.post('/', authMiddleware, bookingsController.createBooking);

router.delete('/:id', authMiddleware, bookingsController.deleteBooking);

module.exports = router;
