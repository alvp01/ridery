import mongoose from 'mongoose';

const rideryDB = mongoose.connect('mongodb://localhost:27017/ridery');

export default rideryDB;
