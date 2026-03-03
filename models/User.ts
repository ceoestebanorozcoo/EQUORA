/* ═══════════════════════════════════════════════
   EQUORA — User Model (MongoDB/Mongoose)
   ═══════════════════════════════════════════════ */

import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin'],
    },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
