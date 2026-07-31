import mongoose, { Schema, Document } from 'mongoose';

export interface ISkillDoc extends Document {
  name: string;
  category: string;
  proficiency: number;
  iconName?: string;
  featured: boolean;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    iconName: { type: String },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkillDoc>('Skill', SkillSchema);
