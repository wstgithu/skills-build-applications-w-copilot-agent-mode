import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$user',
        totalDuration: { $sum: '$duration' },
        totalCalories: { $sum: '$calories' },
        activityCount: { $sum: 1 },
      },
    },
    { $sort: { totalDuration: -1, totalCalories: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        user: {
          _id: '$user._id',
          name: '$user.name',
          email: '$user.email',
          team: '$user.team',
        },
        totalDuration: 1,
        totalCalories: 1,
        activityCount: 1,
      },
    },
  ]);

  res.json(leaderboard);
});

export default router;
