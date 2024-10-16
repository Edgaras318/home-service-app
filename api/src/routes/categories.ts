import express from 'express';
import { getAllCategories, createCategory } from '../controllers/categories';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// GET /categories
router.get('/', getAllCategories);

// POST /categories
router.post('/', authMiddleware, createCategory);

export default router;
