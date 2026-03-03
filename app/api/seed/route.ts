/* ═══════════════════════════════════════════════
   EQUORA — POST /api/seed
   Creates the initial admin user (run once)
   ═══════════════════════════════════════════════ */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({ email: 'admin@equora.com' });
        if (existingAdmin) {
            return NextResponse.json({ message: 'El usuario admin ya existe' });
        }

        const hashedPassword = await bcrypt.hash('Equora2026!', 12);

        await User.create({
            email: 'admin@equora.com',
            password: hashedPassword,
            role: 'admin',
        });

        return NextResponse.json({
            message: 'Admin creado exitosamente',
            credentials: {
                email: 'admin@equora.com',
                password: 'Equora2026!',
            },
        });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: 'Error al crear admin' },
            { status: 500 }
        );
    }
}
