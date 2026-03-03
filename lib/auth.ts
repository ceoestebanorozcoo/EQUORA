/* ═══════════════════════════════════════════════
   EQUORA — JWT Authentication (jose)
   Works in both Node.js and Edge runtime
   ═══════════════════════════════════════════════ */

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'equora_fallback_secret');

export interface TokenPayload extends JWTPayload {
    userId: string;
    email: string;
}

export async function signToken(payload: { userId: string; email: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as TokenPayload;
    } catch {
        return null;
    }
}
