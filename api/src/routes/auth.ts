import express, { Request, Response } from "express";
import { login, register } from "../controllers/auth";

const router = express.Router();

// POST /auth/login
router.post('/login', login);

// POST /auth/register
router.post('/register', register);

export default router;
