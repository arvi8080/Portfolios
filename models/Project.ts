import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDoc extends Document {
  title: string;
  slug: string;
  description: string;
  fullDetails?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
  caseStudy?: {
    architectureDiagram?: string;
    databaseDesign?: string;
    apiDocs?: string;
    challenges?: string[];
    lessonsLearned?: string[];
    performanceMetrics?: { label: string; value: string }[];
    screenshots?: string[];
    videoDemoUrl?: string;
  };
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fullDetails: { type: String },
    techStack: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'Full-Stack' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    caseStudy: {
      architectureDiagram: { type: String },
      databaseDesign: { type: String },
      apiDocs: { type: String },
      challenges: [{ type: String }],
      lessonsLearned: [{ type: String }],
      performanceMetrics: [{ label: String, value: String }],
      screenshots: [{ type: String }],
      videoDemoUrl: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProjectDoc>('Project', ProjectSchema);
