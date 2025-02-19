import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { body } from 'express-validator'

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

export default userRoutes;
