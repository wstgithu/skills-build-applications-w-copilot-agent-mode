import { Router } from 'express';
import User from '../models/User';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().populate('team', 'name description');
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('team', 'name description');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const { name, email, role, teamId } = req.body;
  const team = teamId ? await Team.findById(teamId) : null;

  if (teamId && !team) {
    return res.status(400).json({ message: 'Invalid team ID' });
  }

  const user = new User({
    name,
    email,
    role: role || 'member',
    team: team?._id,
  });

  await user.save();
  res.status(201).json(user);
});

export default router;
