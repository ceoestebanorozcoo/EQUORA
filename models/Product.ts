/* ═══════════════════════════════════════════════
   EQUORA — Product Model (MongoDB/Mongoose)
   ═══════════════════════════════════════════════ */

import mongoose, { Schema, type Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    productCode: string;
    stockStatus: 'available' | 'soldout';
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['Percheros', 'Soportes', 'Riendas', 'Canasta', 'Accesorios'],
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    imageUrl: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    productCode: {
        type: String,
        required: true,
        unique: true,
    },
    stockStatus: {
        type: String,
        enum: ['available', 'soldout'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
