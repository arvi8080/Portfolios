import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLinkDoc extends Document {
  platform: string;
  url: string;
  username?: string;
  iconName?: string;
}

const SocialLinkSchema: Schema = new Schema(
  {
    platform: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    username: { type: String },
    iconName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink || mongoose.model<ISocialLinkDoc>('SocialLink', SocialLinkSchema);
