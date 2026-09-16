import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { getFasihOfficers } from "@/lib/fasih-db";
import pool from "@/lib/db";
import { writeFasihActivityLog } from "@/lib/fasih-db";

export async function GET() {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const [pencacah, pengawas, fasihUsers] = await Promise.all([
      getFasihOfficers("pencacah"),
      getFasihOfficers("pengawas"),
      // Ambil fasih_users untuk info login
      pool
        .query(
          `SELECT id, officer_id, username, name, role, is_active
           FROM public.fasih_users
           ORDER BY name ASC`
        )
        .then((r) => r.rows),
    ]);

    return NextResponse.json({ pencacah, pengawas, fasihUsers });
  } catch (err) {
    console.error("[FASIH] petugas error:", err);
    return NextResponse.json({ error: "Gagal memuat data petugas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const body = await request.json();
    const { name, username, officer_role } = body;

    if (!name || !officer_role) {
      return NextResponse.json({ error: "Nama dan role wajib diisi" }, { status: 400 });
    }
    if (!["pencacah", "pengawas"].includes(officer_role)) {
      return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
    }

    const { rows } = await pool.query(
      `INSERT INTO public.fasih_officers (username, name, officer_role, is_active)
       VALUES ($1, $2, $3, true)
       RETURNING id, username, name, officer_role, is_active, created_at`,
      [username || null, name, officer_role]
    );

    await writeFasihActivityLog({
      userId: user.id,
      action: "INSERT",
      tableName: "fasih_officers",
      recordId: rows[0].id,
      newData: rows[0],
    });

    return NextResponse.json({ success: true, officer: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("[FASIH] petugas POST error:", err);
    return NextResponse.json({ error: "Gagal menambah petugas" }, { status: 500 });
  }
}
