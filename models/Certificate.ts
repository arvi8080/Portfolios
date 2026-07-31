import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificateDoc extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  badgeUrl?: string;
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    credentialUrl: { type: String },
    credentialId: { type: String },
    badgeUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificateDoc>('Certificate', CertificateSchema);
