import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVerificationCodeDocument extends Document {
  email: string;
  code: string;
  type: 'password-reset' | 'change-email' | 'change-password';
  expiresAt: Date;
  createdAt: Date;
}

const VerificationCodeSchema = new Schema<IVerificationCodeDocument>(
  {
    email: { type: String, required: true, lowercase: true },
    code: { type: String, required: true },
    type: {
      type: String,
      enum: ['password-reset', 'change-email', 'change-password'],
      required: true,
    },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

const VerificationCode: Model<IVerificationCodeDocument> =
  mongoose.models.VerificationCode ||
  mongoose.model<IVerificationCodeDocument>(
    'VerificationCode',
    VerificationCodeSchema
  );

export default VerificationCode;
