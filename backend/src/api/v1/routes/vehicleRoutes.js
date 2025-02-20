import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const vehicleRouter = express.Router();

vehicleRouter.get('/', authMiddleware, getAllVehicles);
vehicleRouter.get('/:id', authMiddleware, getVehicleById);
vehicleRouter.post('/', authMiddleware, createVehicle);
vehicleRouter.put('/:id', authMiddleware, updateVehicle);
vehicleRouter.delete('/:id', authMiddleware, deleteVehicle);

export default vehicleRouter;
