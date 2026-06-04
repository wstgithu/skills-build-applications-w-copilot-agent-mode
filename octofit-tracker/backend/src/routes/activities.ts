import { Router } from 'express';
import Activity from '../models/Activity';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json(activities);
});

router.get('/recent', async (req, res) => {
  const recent = await Activity.find().sort({ date: -1 }).limit(10).populate('user', 'name email');
  res.json(recent);
});

router.post('/', async (req, res) => {
  const { userId, type, duration, calories, distance, date } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const activity = new Activity({
    user: user._id,
    type,
    duration,
    calories,
    distance,
    date: date ? new Date(date) : new Date(),
  });

  await activity.save();
  res.status(201).json(activity);
});

export default router;
