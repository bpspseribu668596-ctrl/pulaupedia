import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if accessing admin routes
  if (path.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin-session');

    // If no session, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }

    // Verify session is valid JSON
    try {
      JSON.parse(sessionCookie.value);
    } catch {
      // Invalid session, redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while logged in, redirect to admin
  if (path === '/login') {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie.value);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        // Invalid session, allow access to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
  ],
};
