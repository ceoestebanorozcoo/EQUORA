import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  price: number;
  images: string[];
  description: string;
  productCode: string;
  stockStatus: 'available' | 'soldout';
  isFeatured: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
    productCode: { type: String, unique: true },
    stockStatus: {
      type: String,
      enum: ['available', 'soldout'],
      default: 'available',
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>('Product', ProductSchema);

export default Product;
