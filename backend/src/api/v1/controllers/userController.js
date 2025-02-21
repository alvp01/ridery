import { createUser, loginUser } from '../services/userService.js';
import { validationResult } from 'express-validator'

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await createUser({ email, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const token = await loginUser({ email, password });
    res.json({ jwt: token, message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
};