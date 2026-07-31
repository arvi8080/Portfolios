import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogDoc extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  views: number;
  readingTime: number;
  publishedAt?: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    coverImage: { type: String, required: true },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    readingTime: { type: Number, default: 5 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlogDoc>('Blog', BlogSchema);
