import express, { Request, Response } from 'express';
import {
    getBookingsByUserEmail,
    createBooking,
    deleteBooking,
} from '../controllers/bookings';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// GET /bookings/user/:email
router.get('/user/:email', async (req: Request, res: Response) => {
    await getBookingsByUserEmail(req, res);
});

// POST /bookings
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await createBooking(req, res);
});

// DELETE /bookings/:id
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    await deleteBooking(req, res);
});

// Export the router
export default router;
