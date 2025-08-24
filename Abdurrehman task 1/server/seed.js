import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-management');
    console.log('Connected to MongoDB');

    // Check if sample user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('Sample user already exists:');
      console.log('Email: demo@example.com');
      console.log('Password: password123');
      await mongoose.connection.close();
      return;
    }

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const sampleUser = new User({
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword
    });

    await sampleUser.save();
    console.log('Sample user created successfully:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
