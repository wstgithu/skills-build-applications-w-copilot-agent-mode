import { Router } from 'express';
import Team from '../models/Team';
import User from '../models/User';

const router = Router();

router.get('/', async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }

  const members = await User.find({ team: team._id }).select('name email role totalPoints');
  res.json({ team, members });
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const team = new Team({ name, description });
  await team.save();
  res.status(201).json(team);
});

export default router;
