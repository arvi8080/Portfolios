import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeDoc extends Document {
  fileUrl: string;
  version: string;
  downloadCount: number;
}

const ResumeSchema: Schema = new Schema(
  {
    fileUrl: { type: String, required: true },
    version: { type: String, required: true },
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model<IResumeDoc>('Resume', ResumeSchema);
