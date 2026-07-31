import mongoose, { Schema, Document } from 'mongoose';

export interface IMessageDoc extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
}

const MessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessageDoc>('Message', MessageSchema);
