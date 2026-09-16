import { NextResponse } from "next/server";
import { validateFasihSession, logoutFasih } from "@/lib/fasih-auth";
import { writeFasihActivityLog } from "@/lib/fasih-db";

export async function POST() {
  try {
    // Get user before clearing session (for activity log)
    const user = await validateFasihSession();

    await logoutFasih();

    if (user) {
      await writeFasihActivityLog({
        userId: user.id,
        action: "LOGOUT",
        tableName: "fasih_users",
        recordId: user.id,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FASIH] logout error:", err);
    // Still clear cookie even if DB fails
    return NextResponse.json({ success: true });
  }
}
