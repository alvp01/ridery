"use strict";

import express from 'express';
import rideryDB from './database/database.js';
import userRoutes from './api/v1/routes/userRoutes.js';
import vehicleRouter from './api/v1/routes/vehicleRoutes.js';

const app = express();

rideryDB.then(() => {
  console.log('Database connection successful');
}).catch((error) => {
  console.error('Database connection error:', error);
});

app.use(express.json());
app.use('/api/v1/', userRoutes);
app.use('/api/v1/vehicles', vehicleRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});