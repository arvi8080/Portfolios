import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsDoc extends Document {
  path: string;
  views: number;
  uniqueVisitors: number;
}

const AnalyticsSchema: Schema = new Schema(
  {
    path: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Analytics || mongoose.model<IAnalyticsDoc>('Analytics', AnalyticsSchema);
