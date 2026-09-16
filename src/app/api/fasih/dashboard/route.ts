import { NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import {
  getFasihDashboardStats,
  getFasihPencacahSummary,
} from "@/lib/fasih-db";

export async function GET() {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const [stats, pencacahSummary] = await Promise.all([
      getFasihDashboardStats(),
      getFasihPencacahSummary(),
    ]);

    return NextResponse.json({ stats, pencacahSummary });
  } catch (err) {
    console.error("[FASIH] dashboard error:", err);
    return NextResponse.json(
      { error: "Gagal memuat data dashboard" },
      { status: 500 }
    );
  }
}
