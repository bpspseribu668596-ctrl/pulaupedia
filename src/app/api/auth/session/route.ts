import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin-session');

    if (!sessionCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const session = JSON.parse(sessionCookie.value);

    return NextResponse.json(
      { 
        authenticated: true,
        user: session
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking session:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
