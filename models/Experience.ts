import mongoose, { Schema, Document } from 'mongoose';

export interface IExperienceDoc extends Document {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements?: string[];
  techStack?: string[];
  isCurrent?: boolean;
}

const ExperienceSchema: Schema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    period: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    techStack: [{ type: String }],
    isCurrent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperienceDoc>('Experience', ExperienceSchema);
