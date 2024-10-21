import express from 'express';
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
router.get('/', getAllBusinesses);

// GET /businesses/category/:category
router.get('/category/:category', getBusinessesByCategory);

// GET /businesses/:id
router.get('/:id', getBusinessById);

// POST /businesses
router.post('/', authMiddleware, createBusiness);

// PUT /businesses/:id
router.put('/:id', authMiddleware, updateBusiness);

// GET /businesses/:businessId/bookings/date/:date
router.get('/:businessId/bookings/date/:date', getBookingsByBusinessAndDate);

// Export the router
export default router;
