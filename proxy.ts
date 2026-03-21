import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /dashboard routes (except /dashboard/login)
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token || !verifyToken(token)) {
      const loginUrl = new URL('/dashboard/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/dashboard/login') {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token && verifyToken(token)) {
      const dashboardUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
