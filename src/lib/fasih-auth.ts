import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import {
  getFasihSessionWithUser,
  createFasihSession,
  deleteFasihSession,
  type FasihUser,
} from '@/lib/fasih-db';
import {
  FASIH_SESSION_COOKIE,
  SESSION_DURATION_HOURS,
} from '@/lib/fasih-constants';

// ─── Token generation ─────────────────────────────────────────────────────────

export function generateSessionToken(): string {
  return crypto.randomBytes(48).toString('hex');
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export async function setFasihSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(FASIH_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
    path: '/',
  });
}

export async function clearFasihSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(FASIH_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// ─── Session creation ─────────────────────────────────────────────────────────

export async function createAndStoreFasihSession(
  userId: string
): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000
  );
  await createFasihSession(userId, token, expiresAt);
  await setFasihSessionCookie(token);
  return token;
}

// ─── Session validation — server components / API routes ─────────────────────

/**
 * Validate session from Next.js cookie store (Server Components / Route Handlers).
 * Returns the FasihUser if valid, null otherwise.
 */
export async function validateFasihSession(): Promise<FasihUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(FASIH_SESSION_COOKIE)?.value;
    if (!token) return null;

    const session = await getFasihSessionWithUser(token);
    if (!session) return null;

    return session.user;
  } catch {
    return null;
  }
}

/**
 * Validate session from a NextRequest object (middleware-compatible).
 * Returns the token string if cookie exists, null otherwise.
 * Full DB validation is done in Route Handlers — middleware only checks cookie presence.
 */
export function getFasihTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(FASIH_SESSION_COOKIE)?.value ?? null;
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logoutFasih(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(FASIH_SESSION_COOKIE)?.value;
    if (token) {
      await deleteFasihSession(token);
    }
  } catch {
    // best effort
  }
  await clearFasihSessionCookie();
}
