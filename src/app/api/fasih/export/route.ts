import { NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import pool from "@/lib/db";

const CSV_HEADER =
  "username,name,regionCode,islandName,regionName,totalRegion,approved,draft,open,submitted,rejected,editedAdmin,revoked,submittedRespondent,editedSupervisor";

function escapeCSVField(value: string | number | null | undefined): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    const user = await validateFasihSession();
    if (!user) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const { rows } = await pool.query<{
      pencacah_username: string | null;
      pencacah_name: string;
      region_code: string;
      island_name: string;
      region_name: string;
      total_region: number;
      approved: number;
      draft: number;
      open: number;
      submitted: number;
      rejected: number;
      edited_admin: number;
      revoked: number;
      submitted_respondent: number;
      edited_supervisor: number;
    }>(
      `SELECT
         pc.username                          AS pencacah_username,
         pc.name                              AS pencacah_name,
         r.region_code,
         r.island_name,
         r.region_name,
         r.total_region,
         COALESCE(s.approved, 0)              AS approved,
         COALESCE(s.draft, 0)                 AS draft,
         COALESCE(s.open, 0)                  AS open,
         COALESCE(s.submitted, 0)             AS submitted,
         COALESCE(s.rejected, 0)              AS rejected,
         COALESCE(s.edited_admin, 0)          AS edited_admin,
         COALESCE(s.revoked, 0)               AS revoked,
         COALESCE(s.submitted_respondent, 0)  AS submitted_respondent,
         COALESCE(s.edited_supervisor, 0)     AS edited_supervisor
       FROM public.fasih_assignments a
       JOIN public.fasih_regions r          ON r.id = a.region_id
       JOIN public.fasih_officers pc        ON pc.id = a.pencacah_id
       LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
       ORDER BY r.island_name ASC, r.region_name ASC`
    );

    const lines: string[] = [CSV_HEADER];

    for (const row of rows) {
      const fields = [
        escapeCSVField(row.pencacah_username ?? ""),
        escapeCSVField(row.pencacah_name),
        escapeCSVField(row.region_code),
        escapeCSVField(row.island_name),
        escapeCSVField(row.region_name),
        row.total_region,
        row.approved,
        row.draft,
        row.open,
        row.submitted,
        row.rejected,
        row.edited_admin,
        row.revoked,
        row.submitted_respondent,
        row.edited_supervisor,
      ];
      lines.push(fields.join(","));
    }

    // Jika DB kosong, kembalikan template dengan 1 baris contoh
    if (rows.length === 0) {
      lines.push(
        "petugas@example.com,Nama Petugas,3101020001000600,PULAU PANGGANG,RT 006 RW 01,179,0,0,0,0,0,0,0,0,0"
      );
    }

    const csv = lines.join("\n");
    const now = new Date()
      .toISOString()
      .replace("T", "_")
      .replace(/:/g, "-")
      .slice(0, 16);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="template_fasih_${now}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[FASIH] export error:", err);
    return NextResponse.json({ error: "Gagal generate template" }, { status: 500 });
  }
}
