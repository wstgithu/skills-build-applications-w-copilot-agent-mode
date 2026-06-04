import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

const Team = model<ITeam>('Team', teamSchema);
export default Team;
