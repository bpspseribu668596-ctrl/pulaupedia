import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih/auth";
import pool from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const { id } = await params;

    const { rows } = await pool.query(
      `SELECT total_rows, success_rows, failed_rows, status, error_message
       FROM public.fasih_imports
       WHERE id = $1`,
      [id]
    );

    if (!rows[0]) {
      return NextResponse.json({ error: "Import tidak ditemukan" }, { status: 404 });
    }

    const row = rows[0];
    const processed = (row.success_rows ?? 0) + (row.failed_rows ?? 0);

    return NextResponse.json({
      importId:    id,
      total:       row.total_rows    ?? 0,
      processed,
      success:     row.success_rows  ?? 0,
      failed:      row.failed_rows   ?? 0,
      status:      row.status,
      errorMessage: row.error_message ?? null,
      done: ["completed", "completed_with_errors", "failed"].includes(row.status),
    });
  } catch (err) {
    console.error("[FASIH] import progress error:", err);
    return NextResponse.json({ error: "Gagal memuat progress" }, { status: 500 });
  }
}
