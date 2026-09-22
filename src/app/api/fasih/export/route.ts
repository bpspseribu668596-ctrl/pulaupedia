import { NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import pool from "@/lib/db";
import { Workbook } from "exceljs";

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
      total_assignments: number;
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
         pc.username                               AS pencacah_username,
         pc.name                                   AS pencacah_name,
         r.region_code,
         r.island_name,
         r.region_name,
         COALESCE(s.total_assignments, 0)          AS total_assignments,
         COALESCE(s.approved, 0)                   AS approved,
         COALESCE(s.draft, 0)                      AS draft,
         COALESCE(s.open, 0)                       AS open,
         COALESCE(s.submitted, 0)                  AS submitted,
         COALESCE(s.rejected, 0)                   AS rejected,
         COALESCE(s.edited_admin, 0)               AS edited_admin,
         COALESCE(s.revoked, 0)                    AS revoked,
         COALESCE(s.submitted_respondent, 0)       AS submitted_respondent,
         COALESCE(s.edited_supervisor, 0)          AS edited_supervisor
       FROM public.fasih_assignments a
       JOIN public.fasih_regions r          ON r.id = a.region_id
       JOIN public.fasih_officers pc        ON pc.id = a.pencacah_id
       LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
       ORDER BY r.island_name ASC, r.region_name ASC`
    );

    // Create workbook
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Header row
    const headers = [
      "username",
      "name",
      "regionCode",
      "islandName",
      "regionName",
      "totalRegion",
      "approved",
      "draft",
      "open",
      "submitted",
      "rejected",
      "editedAdmin",
      "revoked",
      "submittedRespondent",
      "editedSupervisor",
    ];
    worksheet.addRow(headers);

    // Set header style
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 11 };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };

    // Add data rows
    rows.forEach((row) => {
      worksheet.addRow([
        row.pencacah_username || "",
        row.pencacah_name,
        row.region_code,
        row.island_name,
        row.region_name,
        row.total_assignments,
        row.approved,
        row.draft,
        row.open,
        row.submitted,
        row.rejected,
        row.edited_admin,
        row.revoked,
        row.submitted_respondent,
        row.edited_supervisor,
      ]);
    });

    // Jika DB kosong, tambahkan 1 baris contoh
    if (rows.length === 0) {
      worksheet.addRow([
        "petugas@example.com",
        "Nama Petugas",
        "3101020001000600",
        "PULAU PANGGANG",
        "RT 006 RW 01",
        179,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]);
    }

    // Set column formatting
    // Column C (regionCode) — TEXT format (@)
    worksheet.getColumn(3).numFmt = "@"; // Text format
    worksheet.getColumn(3).width = 18;

    // Columns F-O (numbers) — number format 0 (no decimals)
    for (let col = 6; col <= 15; col++) {
      worksheet.getColumn(col).numFmt = "0";
      worksheet.getColumn(col).alignment = { horizontal: "center" };
      worksheet.getColumn(col).width = 12;
    }

    // Set text columns width
    worksheet.getColumn(1).width = 22; // username
    worksheet.getColumn(2).width = 20; // name
    worksheet.getColumn(4).width = 16; // islandName
    worksheet.getColumn(5).width = 18; // regionName

    // Freeze header row
    worksheet.views = [
      {
        state: "frozen",
        ypSplit: 1,
      } as any,
    ];

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    const now = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .slice(0, 16);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="template_fasih_${now}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[FASIH] export error:", err);
    return NextResponse.json({ error: "Gagal generate template" }, { status: 500 });
  }
}
