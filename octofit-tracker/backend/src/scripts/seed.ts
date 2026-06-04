import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 * This script initializes the database with sample users, activities, and teams
 */
export const seedDatabase = async () => {
  try {
    await connectDatabase();
    
    console.log('Starting to seed the octofit_db database with test data...');
    
    // TODO: Add seed data for users, activities, teams, etc.
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
