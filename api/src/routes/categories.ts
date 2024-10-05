// src/routes/categories.ts
import express, {Request, Response} from 'express';
import { getAllCategories, createCategory } from '../controllers/categories';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    await getAllCategories(req, res);
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await createCategory(req, res);
});

export default router; // Use ES module export syntax
