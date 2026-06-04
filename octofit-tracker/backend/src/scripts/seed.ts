import { connectDatabase, disconnectDatabase } from '../config/database';
import Activity from '../models/Activity';
import Team from '../models/Team';
import User from '../models/User';

/**
 * Seed the octofit_db database with test data
 * This script initializes the database with sample users, activities, and teams
 */
export const seedDatabase = async () => {
  try {
    await connectDatabase();
    
    console.log('Starting to seed the octofit_db database with test data...');

    await Promise.all([
      Activity.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'Team Kraken', description: 'Competitive workout crew' },
      { name: 'Team Coral', description: 'Wellness and recovery focus' },
    ]);

    const [kraken, coral] = teams;

    const users = await User.create([
      { name: 'Aiko Tanaka', email: 'aiko@example.com', role: 'member', team: kraken._id, totalPoints: 80 },
      { name: 'Mia Chen', email: 'mia@example.com', role: 'member', team: coral._id, totalPoints: 95 },
      { name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', team: kraken._id, totalPoints: 120 },
    ]);

    const [aiko, mia, alex] = users;

    await Activity.create([
      { user: aiko._id, type: 'Running', duration: 35, calories: 420, distance: 6.1, date: new Date() },
      { user: mia._id, type: 'Cycling', duration: 50, calories: 520, distance: 18.4, date: new Date() },
      { user: alex._id, type: 'Strength Training', duration: 60, calories: 450, date: new Date() },
      { user: alex._id, type: 'Yoga', duration: 45, calories: 220, date: new Date() },
    ]);

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
