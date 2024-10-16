import express from 'express';
import {
    getBookingsByUserEmail,
    createBooking,
    deleteBooking,
} from '../controllers/bookings';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// GET /bookings/user/:email
router.get('/user/:email', getBookingsByUserEmail);

// POST /bookings
router.post('/', authMiddleware, createBooking);

// DELETE /bookings/:id
router.delete('/:id', authMiddleware, deleteBooking);

// Export the router
export default router;
