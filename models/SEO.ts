import mongoose, { Schema, Document } from 'mongoose';

export interface ISEODoc extends Document {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  canonicalUrl: string;
}

const SEOSchema: Schema = new Schema(
  {
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: { type: String, required: true },
    twitterHandle: { type: String, default: '@octocat' },
    canonicalUrl: { type: String, default: 'https://portfolio-sde.dev' },
  },
  { timestamps: true }
);

export default mongoose.models.SEO || mongoose.model<ISEODoc>('SEO', SEOSchema);
