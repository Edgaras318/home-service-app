import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  iat: number; // Issued at
  exp: number; // Expiration date
}

// Extend the Express Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is missing or malformed
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and cast it to UserPayload
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    console.log(payload);

    // Attach the payload to the request object
    req.currentUser = payload;

  } catch (err) {
    // Send an appropriate response if verification fails
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  // Proceed to the next middleware if the token is valid
  next();
};

export default authMiddleware;
