"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Check if the authorization header is missing or malformed
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        // Verify the token and cast it to UserPayload
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        // Attach the payload to the request object
        req.currentUser = payload;
    }
    catch (err) {
        // Send an appropriate response if verification fails
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
    // Proceed to the next middleware if the token is valid
    next();
};
exports.default = authMiddleware;
