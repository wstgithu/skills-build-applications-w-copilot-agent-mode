import { connectDatabase, disconnectDatabase } from '../config/database';
import Activity from '../models/Activity';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

/**
 * Seed the octofit_db database with test data
 * This script initializes the database with sample users, activities, teams, workouts, and leaderboard entries
 */
export const seedDatabase = async () => {
  try {
    await connectDatabase();

    console.log('Starting to seed the octofit_db database with test data...');

    await Promise.all([
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
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

    await Workout.create([
      { user: aiko._id, activityType: 'Treadmill Run', duration: 40, calories: 460, distance: 6.5, notes: 'Morning interval session', date: new Date() },
      { user: mia._id, activityType: 'Outdoor Ride', duration: 70, calories: 760, distance: 23.1, notes: 'Coastal route', date: new Date() },
      { user: alex._id, activityType: 'CrossFit', duration: 55, calories: 550, notes: 'Strength and conditioning', date: new Date() },
    ]);

    await Leaderboard.create([
      { user: alex._id, rank: 1, totalPoints: 120, totalCalories: 670, totalDuration: 105 },
      { user: mia._id, rank: 2, totalPoints: 95, totalCalories: 1040, totalDuration: 120 },
      { user: aiko._id, rank: 3, totalPoints: 80, totalCalories: 880, totalDuration: 75 },
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
