import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { getFasihOfficerById, writeFasihActivityLog } from "@/lib/fasih-db";
import pool from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateFasihSession();
    if (!user) return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    if (user.role !== "admin") return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const { name, username } = body;

    const existing = await getFasihOfficerById(id);
    if (!existing) return NextResponse.json({ error: "Petugas tidak ditemukan" }, { status: 404 });

    const { rows } = await pool.query(
      `UPDATE public.fasih_officers
       SET name = $1, username = $2, updated_at = now()
       WHERE id = $3
       RETURNING id, username, name, officer_role, updated_at`,
      [
        name ?? existing.name,
        username !== undefined ? (username || null) : existing.username,
        id,
      ]
    );

    await writeFasihActivityLog({
      userId: user.id,
      action: "UPDATE",
      tableName: "fasih_officers",
      recordId: id,
      oldData: { name: existing.name, username: existing.username },
      newData: rows[0],
    });

    return NextResponse.json({ success: true, officer: rows[0] });
  } catch (err) {
    console.error("[FASIH] petugas PUT error:", err);
    return NextResponse.json({ error: "Gagal mengubah petugas" }, { status: 500 });
  }
}
