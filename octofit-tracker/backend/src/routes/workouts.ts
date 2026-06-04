import { Router } from 'express';
import Workout from '../models/Workout';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find().populate('user', 'name email');
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const { userId, activityType, duration, calories, distance, notes, date } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const workout = new Workout({
    user: user._id,
    activityType,
    duration,
    calories,
    distance,
    notes,
    date: date ? new Date(date) : new Date(),
  });

  await workout.save();
  res.status(201).json(workout);
});

export default router;
