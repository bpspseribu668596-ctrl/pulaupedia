import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { writeFasihActivityLog } from "@/lib/fasih-db";
import pool from "@/lib/db";

// ─── PUT: update status angka + total_region ─────────────────────────────────
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

    const {
      total_region,
      approved,
      draft,
      open,
      submitted,
      rejected,
      edited_admin,
      revoked,
      submitted_respondent,
      edited_supervisor,
    } = body;

    // Validate all are non-negative integers
    const intFields = {
      total_region, approved, draft, open, submitted,
      rejected, edited_admin, revoked, submitted_respondent, edited_supervisor,
    };
    for (const [key, val] of Object.entries(intFields)) {
      if (!Number.isInteger(val) || val < 0) {
        return NextResponse.json(
          { error: `${key} harus berupa angka bulat >= 0` },
          { status: 400 }
        );
      }
    }

    // Verify assignment exists
    const check = await pool.query(
      `SELECT a.id, s.id AS status_id
       FROM public.fasih_assignments a
       LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
       WHERE a.id = $1`,
      [id]
    );
    if (check.rows.length === 0) {
      return NextResponse.json({ error: "Assignment tidak ditemukan" }, { status: 404 });
    }

    const { status_id } = check.rows[0];

    await pool.query("BEGIN");
    try {
      // Update total_region di fasih_regions
      await pool.query(
        `UPDATE public.fasih_regions
         SET total_region = $1
         WHERE id = (
           SELECT region_id FROM public.fasih_assignments WHERE id = $2
         )`,
        [total_region, id]
      );

      if (status_id) {
        // Update existing status
        await pool.query(
          `UPDATE public.fasih_region_status
           SET approved             = $1,
               draft                = $2,
               open                 = $3,
               submitted            = $4,
               rejected             = $5,
               edited_admin         = $6,
               revoked              = $7,
               submitted_respondent = $8,
               edited_supervisor    = $9,
               updated_at           = now()
           WHERE assignment_id = $10`,
          [approved, draft, open, submitted, rejected,
           edited_admin, revoked, submitted_respondent, edited_supervisor, id]
        );
      } else {
        // Insert status if not exists
        await pool.query(
          `INSERT INTO public.fasih_region_status
             (assignment_id, approved, draft, open, submitted, rejected,
              edited_admin, revoked, submitted_respondent, edited_supervisor)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
          [id, approved, draft, open, submitted, rejected,
           edited_admin, revoked, submitted_respondent, edited_supervisor]
        );
      }

      await pool.query("COMMIT");
    } catch (err) {
      await pool.query("ROLLBACK");
      throw err;
    }

    await writeFasihActivityLog({
      userId: user.id,
      action: "UPDATE",
      tableName: "fasih_region_status",
      recordId: id,
      newData: intFields,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FASIH] wilayah PUT error:", err);
    return NextResponse.json({ error: "Gagal memperbarui data" }, { status: 500 });
  }
}

// ─── DELETE: hapus assignment (cascade ke status) ─────────────────────────────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await validateFasihSession();
    if (!user) return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    if (user.role !== "admin") return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });

    const { id } = await params;

    // Fetch for activity log before deleting
    const existing = await pool.query(
      `SELECT a.id, pc.name AS pencacah_name, r.region_code, r.region_name
       FROM public.fasih_assignments a
       JOIN public.fasih_regions r  ON r.id = a.region_id
       JOIN public.fasih_officers pc ON pc.id = a.pencacah_id
       WHERE a.id = $1`,
      [id]
    );
    if (existing.rows.length === 0) {
      return NextResponse.json({ error: "Assignment tidak ditemukan" }, { status: 404 });
    }

    // fasih_region_status has ON DELETE CASCADE, so deleting assignment removes status too
    await pool.query(
      `DELETE FROM public.fasih_assignments WHERE id = $1`,
      [id]
    );

    await writeFasihActivityLog({
      userId: user.id,
      action: "DELETE",
      tableName: "fasih_assignments",
      recordId: id,
      oldData: existing.rows[0],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[FASIH] wilayah DELETE error:", err);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
