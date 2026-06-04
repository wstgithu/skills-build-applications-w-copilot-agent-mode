import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    distance: { type: Number, required: false, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Activity = model<IActivity>('Activity', activitySchema);
export default Activity;
