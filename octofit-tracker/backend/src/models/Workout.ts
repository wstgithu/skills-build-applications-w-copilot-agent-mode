import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  user: Types.ObjectId;
  activityType: string;
  duration: number;
  calories: number;
  distance?: number;
  notes?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    distance: { type: Number, required: false, min: 0 },
    notes: { type: String, required: false, trim: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Workout = model<IWorkout>('Workout', workoutSchema);
export default Workout;
