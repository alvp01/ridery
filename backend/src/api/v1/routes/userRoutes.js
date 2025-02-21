import express from 'express';
import { signup, login, logout } from '../controllers/userController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post(
  '/signup',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 })
  ],
  signup
);
userRoutes.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

userRoutes.post('/logout', authMiddleware, logout);

export default userRoutes;
