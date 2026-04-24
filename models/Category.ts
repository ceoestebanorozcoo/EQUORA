import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  image?: string;
  isFeatured: boolean;
  createdAt: Date;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CategorySchema.pre('save', function (this: ICategoryDocument) {
  this.slug = generateSlug(this.name);
});

// Clear cached model in dev so hot-reload picks up schema changes
if (process.env.NODE_ENV !== 'production' && mongoose.models.Category) {
  delete (mongoose.models as Record<string, unknown>).Category;
}

const Category: Model<ICategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<ICategoryDocument>('Category', CategorySchema);

export default Category;
