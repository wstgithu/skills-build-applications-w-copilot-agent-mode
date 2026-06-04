import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: 'member' | 'admin';
  team?: Types.ObjectId;
  totalPoints: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
