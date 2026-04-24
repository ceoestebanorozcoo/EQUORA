import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonialDocument extends Document {
  name: string;
  role: string;
  text: string;
  rating: number;
  active: boolean;
  order: number;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Cliente' },
    text: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonialDocument> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonialDocument>('Testimonial', TestimonialSchema);

export default Testimonial;
