import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const rideryDB = mongoose.connect(process.env.DB_URI);

export default rideryDB;
