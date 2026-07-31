import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievementDoc extends Document {
  title: string;
  organization: string;
  date: string;
  description: string;
  link?: string;
}

const AchievementSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model<IAchievementDoc>('Achievement', AchievementSchema);
