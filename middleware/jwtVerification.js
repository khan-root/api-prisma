import jwt from 'jsonwebtoken';
import { CustomErrorHandler } from '../services/customErrorHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return next(CustomErrorHandler.unAuthorized('Access Denied. No token provided.'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized('Invalid Token.'));
  }
};
