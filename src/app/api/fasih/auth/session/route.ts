import { NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";

export async function GET() {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
