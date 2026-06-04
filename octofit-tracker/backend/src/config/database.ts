import mongoose from 'mongoose';

// MongoDB connection configuration for octofit_db
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to octofit_db database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (error) {
    console.error('Failed to disconnect from database:', error);
    throw error;
  }
};
