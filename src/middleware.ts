import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FASIH_SESSION_COOKIE } from '@/lib/fasih-constants';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ── Admin CMS routes ──────────────────────────────────────────────────────
  if (path.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin-session');

    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      JSON.parse(sessionCookie.value);
    } catch {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing /login while admin session is active, redirect to admin
  if (path === '/login') {
    const sessionCookie = request.cookies.get('admin-session');
    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie.value);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        // invalid session — allow login page
      }
    }
  }

  // ── FASIH protected routes ────────────────────────────────────────────────
  // /fasih itself is the login page — allow it through
  // /fasih/dashboard, /fasih/petugas, /fasih/wilayah, /fasih/import require auth
  const fasihProtected =
    path.startsWith('/fasih/dashboard') ||
    path.startsWith('/fasih/petugas') ||
    path.startsWith('/fasih/wilayah') ||
    path.startsWith('/fasih/import');

  if (fasihProtected) {
    const token = request.cookies.get(FASIH_SESSION_COOKIE)?.value;
    if (!token) {
      const loginUrl = new URL('/fasih', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }
    // Full session DB validation happens in each Route Handler / Server Component.
    // Middleware only checks cookie presence to avoid DB calls on every request.
  }

  // If accessing /fasih (login) while FASIH session cookie exists, redirect to dashboard
  if (path === '/fasih') {
    const token = request.cookies.get(FASIH_SESSION_COOKIE)?.value;
    if (token) {
      return NextResponse.redirect(new URL('/fasih/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/fasih',
    '/fasih/:path*',
  ],
};
