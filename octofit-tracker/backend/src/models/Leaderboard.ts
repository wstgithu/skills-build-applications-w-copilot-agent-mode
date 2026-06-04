import { Schema, model, Types } from 'mongoose';

export interface ILeaderboard {
  user: Types.ObjectId;
  rank: number;
  totalPoints: number;
  totalCalories: number;
  totalDuration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true, min: 1 },
    totalPoints: { type: Number, required: true, min: 0 },
    totalCalories: { type: Number, required: true, min: 0 },
    totalDuration: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
export default Leaderboard;
