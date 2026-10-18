import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin-session');

    if (!sessionCookie) {
      // Selalu return 200 agar fetch di client tidak perlu handle non-2xx
      return NextResponse.json({ authenticated: false });
    }

    const session = JSON.parse(sessionCookie.value);

    return NextResponse.json({
      authenticated: true,
      user: session,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
