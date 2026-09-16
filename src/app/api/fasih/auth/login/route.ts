import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { createAndStoreFasihSession } from "@/lib/fasih-auth";
import { writeFasihActivityLog } from "@/lib/fasih-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi" },
        { status: 400 }
      );
    }

    // Fetch user with password hash — never expose hash to client
    const { rows } = await pool.query(
      `SELECT id, username, password_hash, name, role, is_active
       FROM public.fasih_users
       WHERE username = $1`,
      [username]
    );

    const user = rows[0];

    // Generic error — don't reveal whether username exists
    const genericError = NextResponse.json(
      { error: "Username atau password salah" },
      { status: 401 }
    );

    if (!user) return genericError;
    if (!user.is_active) return genericError;

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return genericError;

    // Create session and set cookie
    await createAndStoreFasihSession(user.id);

    // Activity log — user_id from DB, never from client
    await writeFasihActivityLog({
      userId: user.id,
      action: "LOGIN",
      tableName: "fasih_users",
      recordId: user.id,
      newData: { username: user.username, role: user.role },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[FASIH] login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
