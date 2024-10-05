import express, { Request, Response } from "express";
import { login, register } from "../controllers/auth";

const router = express.Router();

// POST /auth/login
router.get('/login', async (req: Request, res: Response) => {
    await login(req, res);
});

// POST /auth/register
router.get('/register', async (req: Request, res: Response) => {
    await register(req, res);
});

export default router;
