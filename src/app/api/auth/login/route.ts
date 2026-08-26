import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcryptjs';

interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password harus diisi' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const [rows] = await connection.query<UserRow[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const user = rows[0];
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Create session data (without password)
    const sessionData = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    // Set session cookie
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login berhasil',
        user: sessionData
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for session
    response.cookies.set('admin-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
