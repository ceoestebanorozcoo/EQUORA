/* ═══════════════════════════════════════════════
   EQUORA — Middleware (Route Protection)
   Protects /dashboard routes, allows /dashboard/login
   ═══════════════════════════════════════════════ */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('equora_token')?.value;

    // Allow /dashboard/login always
    if (pathname === '/dashboard/login') {
        // If already authenticated, redirect to dashboard
        if (token) {
            const payload = await verifyToken(token);
            if (payload) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
        return NextResponse.next();
    }

    // Protect all /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/dashboard/login', request.url));
        }

        const payload = await verifyToken(token);
        if (!payload) {
            const response = NextResponse.redirect(new URL('/dashboard/login', request.url));
            response.cookies.set('equora_token', '', { expires: new Date(0), path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
