import express, { Request, Response } from 'express';
import {
    getAllBusinesses,
    getBusinessesByCategory,
    getBusinessById,
    createBusiness,
    updateBusiness,
    getBookingsByBusinessAndDate,
} from '../controllers/businesses';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// GET /businesses
router.get('/', async (req: Request, res: Response) => {
    await getAllBusinesses(req, res);
});

// GET /businesses/category/:category
router.get('/category/:category', async (req: Request, res: Response) => {
    await getBusinessesByCategory(req, res);
});

// GET /businesses/:id
router.get('/:id', async (req: Request, res: Response) => {
    await getBusinessById(req, res);
});

// POST /businesses
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await createBusiness(req, res);
});

// PUT /businesses/:id
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    await updateBusiness(req, res);
});

// GET /businesses/:businessId/bookings/date/:date
router.get('/:businessId/bookings/date/:date', async (req: Request, res: Response) => {
    await getBookingsByBusinessAndDate(req, res);
});

// Export the router
export default router;
