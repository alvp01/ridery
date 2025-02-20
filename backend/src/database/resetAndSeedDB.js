import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../api/v1/models/User.js';
import Vehicle from '../api/v1/models/Vehicle.js';
import rideryDB from './database.js';
import mongoose from 'mongoose';

dotenv.config();

const seedDatabase = async () => {
  try {
    await rideryDB;

    await mongoose.connection.dropDatabase();

    const users = [
      { email: 'user1@example.com', password: await bcrypt.hash('password1', 10) },
      { email: 'user2@example.com', password: await bcrypt.hash('password2', 10) }
    ];

    const createdUsers = await User.insertMany(users);

    const vehicles = [];
    const makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'];
    const models = ['Corolla', 'Civic', 'Mustang', 'Camaro', '3 Series'];
    const statusOptions = ['available', 'maintenance', 'on service'];

    for (let i = 0; i < 100; i++) {
      const vehicle = {
        make: makes[Math.floor(Math.random() * makes.length)],
        model: models[Math.floor(Math.random() * models.length)],
        year: Math.floor(Math.random() * 30) + 1990, // Random year between 1990 and 2020
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        created_by: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
        updated_by: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      };
      vehicles.push(vehicle);
    }

    await Vehicle.insertMany(vehicles);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
