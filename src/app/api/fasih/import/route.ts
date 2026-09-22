import { NextRequest, NextResponse } from "next/server";
import { validateFasihSession } from "@/lib/fasih-auth";
import { getFasihImports, writeFasihActivityLog } from "@/lib/fasih-db";
import pool from "@/lib/db";
import { Workbook } from "exceljs";

// ─── GET: list import history ─────────────────────────────────────────────────
export async function GET() {
  try {
    const user = await validateFasihSession();
    if (!user) return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });

    const imports = await getFasihImports();
    return NextResponse.json({ imports });
  } catch (err) {
    console.error("[FASIH] import GET error:", err);
    return NextResponse.json({ error: "Gagal memuat riwayat import" }, { status: 500 });
  }
}

// ─── Expected CSV/Excel columns — FORMAT LAMA (order-independent, trimmed) ───
const REQUIRED_HEADERS_OLD = [
  "username",
  "name",
  "regioncode",
  "islandname",
  "regionname",
  "totalregion",
  "approved",
  "draft",
  "open",
  "submitted",
  "rejected",
  "editedadmin",
  "revoked",
  "submittedrespondent",
  "editedsupervisor",
];

// ─── Expected CSV/Excel columns — FORMAT BARU ────────────────────────────────
// userId, username, email, roleName, totalPetugas, regionCode, totalRegion, statusBreakdown
const REQUIRED_HEADERS_NEW = [
  "userid",
  "username",
  "regioncode",
  "totalregion",
  "statusbreakdown",
];

function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[\s_\-\/]/g, "").replace(/[^a-z0-9]/g, "");
}

// Map normalised header → DB field name (format lama)
const HEADER_MAP_OLD: Record<string, string> = {
  username:             "username",
  name:                 "name",
  regioncode:           "regionCode",
  islandname:           "islandName",
  regionname:           "regionName",
  totalregion:          "totalRegion",
  approved:             "approved",
  draft:                "draft",
  open:                 "open",
  submitted:            "submitted",
  rejected:             "rejected",
  editedadmin:          "editedAdmin",
  revoked:              "revoked",
  submittedrespondent:  "submittedRespondent",
  editedsupervisor:     "editedSupervisor",
};

// Map normalised header → DB field name (format baru)
const HEADER_MAP_NEW: Record<string, string> = {
  userid:          "userId",
  username:        "username",
  email:           "email",
  rolename:        "roleName",
  totalpetugas:    "totalPetugas",
  regioncode:      "regionCode",
  totalregion:     "totalRegion",
  statusbreakdown: "statusBreakdown",
};

// ─── Parse statusBreakdown string → status object ────────────────────────────
// Contoh: "SUBMITTED BY Pencacah:11 | DRAFT:6 | APPROVED BY Pengawas:1"
function parseStatusBreakdown(raw: string): {
  approved: number;
  draft: number;
  open: number;
  submitted: number;
  rejected: number;
  editedAdmin: number;
  revoked: number;
  submittedRespondent: number;
  editedSupervisor: number;
} {
  const result = {
    approved: 0, draft: 0, open: 0, submitted: 0,
    rejected: 0, editedAdmin: 0, revoked: 0,
    submittedRespondent: 0, editedSupervisor: 0,
  };

  if (!raw?.trim()) return result;

  // Split by | separator
  const parts = raw.split("|").map((p) => p.trim());

  for (const part of parts) {
    // Extract label and value — format: "LABEL:number"
    const colonIdx = part.lastIndexOf(":");
    if (colonIdx === -1) continue;

    const label = part.substring(0, colonIdx).trim().toLowerCase();
    const val   = parseInt(part.substring(colonIdx + 1).trim(), 10);
    if (isNaN(val)) continue;

    if (label.includes("approved"))                result.approved            = val;
    else if (label.includes("draft"))              result.draft               = val;
    else if (label.includes("open"))               result.open                = val;
    else if (label.includes("submitted respondent") || label.includes("submittedrespondent"))
                                                   result.submittedRespondent = val;
    else if (label.includes("submitted"))          result.submitted           = val;
    else if (label.includes("rejected"))           result.rejected            = val;
    else if (label.includes("edited") && label.includes("admin"))
                                                   result.editedAdmin         = val;
    else if (label.includes("edited") && (label.includes("supervisor") || label.includes("pengawas")))
                                                   result.editedSupervisor    = val;
    else if (label.includes("revoked"))            result.revoked             = val;
  }

  return result;
}

// ─── Detect which format the CSV uses ────────────────────────────────────────
function detectFormat(normHeaders: string[]): "old" | "new" | null {
  const hasOld = REQUIRED_HEADERS_OLD.every((h) => normHeaders.includes(h));
  if (hasOld) return "old";
  const hasNew = REQUIRED_HEADERS_NEW.every((h) => normHeaders.includes(h));
  if (hasNew) return "new";
  return null;
}

interface ParsedRow {
  rowNumber: number;
  username: string;
  name: string;
  regionCode: string;
  islandName: string;
  regionName: string;
  totalRegion: number;
  approved: number;
  draft: number;
  open: number;
  submitted: number;
  rejected: number;
  editedAdmin: number;
  revoked: number;
  submittedRespondent: number;
  editedSupervisor: number;
}

interface RowError {
  rowNumber: number;
  errorType: string;
  errorMessage: string;
  rawData: Record<string, string>;
}

// Parse CSV text — handles quoted fields, CRLF and LF
function parseCSV(text: string): string[][] {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  return lines.map((line) => {
    const cols: string[] = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuote) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') inQuote = false;
        else cur += ch;
      } else {
        if (ch === '"') inQuote = true;
        else if (ch === ",") { cols.push(cur); cur = ""; }
        else cur += ch;
      }
    }
    cols.push(cur);
    return cols.map((c) => c.trim());
  });
}

// Parse XLSX file
async function parseXLSX(data: any): Promise<string[][]> {
  const workbook = new Workbook();
  await workbook.xlsx.load(data);
  const worksheet = workbook.worksheets[0];

  const rows: string[][] = [];
  worksheet.eachRow({ includeEmpty: false }, (row) => {
    const values: string[] = row.values as any[];
    rows.push(
      values.slice(1).map((v) =>
        v === null || v === undefined ? "" : String(v).trim()
      )
    );
  });

  return rows;
}

// ─── POST: process import ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const user = await validateFasihSession();
  if (!user) return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });

  let importId: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "csv" && ext !== "xlsx") {
      return NextResponse.json({ error: "Hanya file CSV (.csv) atau XLSX (.xlsx) yang didukung" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Ukuran file maksimal 10MB" }, { status: 400 });
    }

    let rows: string[][];
    if (ext === "csv") {
      const text = await file.text();
      rows = parseCSV(text).filter((r) => r.some((c) => c !== ""));
    } else {
      // XLSX
      const arrayBuffer = await file.arrayBuffer();
      rows = await parseXLSX(arrayBuffer);
      rows = rows.filter((r) => r.some((c) => c !== ""));
    }

    if (rows.length < 2) {
      return NextResponse.json({ error: "File kosong atau tidak memiliki data" }, { status: 400 });
    }

    // ── Header detection & validation ──────────────────────────────────────
    const rawHeaders = rows[0];
    const normHeaders = rawHeaders.map(normalizeHeader);

    const format = detectFormat(normHeaders);
    if (!format) {
      // Coba tebak format mana yang paling dekat untuk error message yang berguna
      const missingOld = REQUIRED_HEADERS_OLD.filter((h) => !normHeaders.includes(h));
      const missingNew = REQUIRED_HEADERS_NEW.filter((h) => !normHeaders.includes(h));
      const missing = missingOld.length <= missingNew.length ? missingOld : missingNew;
      return NextResponse.json(
        { error: `Header kolom tidak lengkap. Kolom yang kurang: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Build column index map
    const HEADER_MAP = format === "old" ? HEADER_MAP_OLD : HEADER_MAP_NEW;
    const colIdx: Record<string, number> = {};
    normHeaders.forEach((h, i) => {
      if (HEADER_MAP[h]) colIdx[HEADER_MAP[h]] = i;
    });

    const dataRows = rows.slice(1);
    const totalRows = dataRows.length;

    // Create import record (processing)
    const importRes = await pool.query(
      `INSERT INTO public.fasih_imports
         (file_name, imported_by, total_rows, success_rows, failed_rows, status)
       VALUES ($1, $2, $3, 0, 0, 'processing')
       RETURNING id`,
      [file.name, user.id, totalRows]
    );
    importId = importRes.rows[0].id;

    // ── Parse & validate rows ──────────────────────────────────────────────
    const parsed: ParsedRow[] = [];
    const rowErrors: RowError[] = [];

    for (let i = 0; i < dataRows.length; i++) {
      const cols = dataRows[i];
      const rowNum = i + 2;

      const raw: Record<string, string> = {};
      Object.entries(colIdx).forEach(([field, idx]) => {
        raw[field] = cols[idx] ?? "";
      });

      // Skip fully empty rows
      if (Object.values(raw).every((v) => v === "")) continue;

      const errors: string[] = [];

      if (format === "old") {
        // ── Format lama — validasi lengkap ──────────────────────────────
        if (!raw.name?.trim())       errors.push("name tidak boleh kosong");
        if (!raw.regionCode?.trim()) errors.push("regionCode tidak boleh kosong");
        if (!raw.islandName?.trim()) errors.push("islandName tidak boleh kosong");
        if (!raw.regionName?.trim()) errors.push("regionName tidak boleh kosong");

        const intFields = ["totalRegion","approved","draft","open","submitted",
                           "rejected","editedAdmin","revoked","submittedRespondent","editedSupervisor"];
        const intValues: Record<string, number> = {};
        for (const f of intFields) {
          const v = parseInt(raw[f] ?? "0", 10);
          if (isNaN(v) || v < 0) errors.push(`${f} harus berupa angka >= 0`);
          else intValues[f] = v;
        }

        if (errors.length > 0) {
          rowErrors.push({ rowNumber: rowNum, errorType: "VALIDATION_ERROR", errorMessage: errors.join("; "), rawData: raw });
          continue;
        }

        parsed.push({
          rowNumber:           rowNum,
          username:            raw.username?.trim() ?? "",
          name:                raw.name.trim(),
          regionCode:          raw.regionCode.trim(),
          islandName:          raw.islandName.trim(),
          regionName:          raw.regionName.trim(),
          totalRegion:         intValues.totalRegion,
          approved:            intValues.approved,
          draft:               intValues.draft,
          open:                intValues.open,
          submitted:           intValues.submitted,
          rejected:            intValues.rejected,
          editedAdmin:         intValues.editedAdmin,
          revoked:             intValues.revoked,
          submittedRespondent: intValues.submittedRespondent,
          editedSupervisor:    intValues.editedSupervisor,
        });

      } else {
        // ── Format baru — username sebagai name, regionCode wajib ────────
        const username = (raw.username ?? raw.email ?? "").trim();
        if (!username) errors.push("username/email tidak boleh kosong");
        if (!raw.regionCode?.trim()) errors.push("regionCode tidak boleh kosong");

        const totalRegion = parseInt(raw.totalRegion ?? "0", 10);
        if (isNaN(totalRegion) || totalRegion < 0) errors.push("totalRegion harus berupa angka >= 0");

        if (errors.length > 0) {
          rowErrors.push({ rowNumber: rowNum, errorType: "VALIDATION_ERROR", errorMessage: errors.join("; "), rawData: raw });
          continue;
        }

        const statuses = parseStatusBreakdown(raw.statusBreakdown ?? "");

        parsed.push({
          rowNumber:           rowNum,
          username,
          // Pakai username sebagai name — bisa diupdate manual lewat halaman Petugas
          name:                username,
          regionCode:          raw.regionCode.trim(),
          // islandName & regionName tidak ada di format baru — kosong, perlu diisi manual
          islandName:          "",
          regionName:          "",
          totalRegion:         isNaN(totalRegion) ? 0 : totalRegion,
          approved:            statuses.approved,
          draft:               statuses.draft,
          open:                statuses.open,
          submitted:           statuses.submitted,
          rejected:            statuses.rejected,
          editedAdmin:         statuses.editedAdmin,
          revoked:             statuses.revoked,
          submittedRespondent: statuses.submittedRespondent,
          editedSupervisor:    statuses.editedSupervisor,
        });
      }
    }

    // ── DB upsert (idempotent, keyed on pencacah username + region_code) ──
    let successCount = 0;

    for (const row of parsed) {
      try {
        await pool.query("BEGIN");

        // 1. Upsert officer (pencacah) — keyed on username if provided, else name
        let officerId: string;
        if (row.username) {
          const existing = await pool.query(
            `SELECT id FROM public.fasih_officers WHERE username = $1 AND officer_role = 'pencacah'`,
            [row.username]
          );
          if (existing.rows.length > 0) {
            officerId = existing.rows[0].id;
            // Update name if changed
            await pool.query(
              `UPDATE public.fasih_officers SET name = $1 WHERE id = $2`,
              [row.name, officerId]
            );
          } else {
            const ins = await pool.query(
              `INSERT INTO public.fasih_officers (username, name, officer_role)
               VALUES ($1, $2, 'pencacah')
               ON CONFLICT DO NOTHING
               RETURNING id`,
              [row.username, row.name]
            );
            if (ins.rows.length === 0) {
              // Race — fetch again
              const re = await pool.query(
                `SELECT id FROM public.fasih_officers WHERE username = $1`,
                [row.username]
              );
              officerId = re.rows[0].id;
            } else {
              officerId = ins.rows[0].id;
            }
          }
        } else {
          // No username — match by name
          const existing = await pool.query(
            `SELECT id FROM public.fasih_officers WHERE name = $1 AND officer_role = 'pencacah'`,
            [row.name]
          );
          if (existing.rows.length > 0) {
            officerId = existing.rows[0].id;
          } else {
            const ins = await pool.query(
              `INSERT INTO public.fasih_officers (name, officer_role)
               VALUES ($1, 'pencacah')
               RETURNING id`,
              [row.name]
            );
            officerId = ins.rows[0].id;
          }
        }

        // 2. Upsert region — keyed on region_code (no unique constraint, use SELECT+INSERT)
        const existingRegion = await pool.query(
          `SELECT id FROM public.fasih_regions WHERE region_code = $1`,
          [row.regionCode]
        );
        let regionId: string;
        if (existingRegion.rows.length > 0) {
          regionId = existingRegion.rows[0].id;
          // Only overwrite island_name / region_name if the incoming values are non-empty
          if (row.islandName || row.regionName) {
            await pool.query(
              `UPDATE public.fasih_regions
                 SET island_name = CASE WHEN $1 <> '' THEN $1 ELSE island_name END,
                     region_name = CASE WHEN $2 <> '' THEN $2 ELSE region_name END,
                     updated_at  = now()
               WHERE id = $3`,
              [row.islandName, row.regionName, regionId]
            );
          }
        } else {
          const ins = await pool.query(
            `INSERT INTO public.fasih_regions (region_code, island_name, region_name)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [row.regionCode, row.islandName, row.regionName]
          );
          regionId = ins.rows[0].id;
        }

        // 3. Upsert assignment — unique on (pencacah_id, region_id)
        const assignmentRes = await pool.query(
          `INSERT INTO public.fasih_assignments
             (region_id, pencacah_id, pengawas_id)
           VALUES ($1, $2, NULL)
           ON CONFLICT (pencacah_id, region_id) DO UPDATE
             SET updated_at = now()
           RETURNING id`,
          [regionId, officerId]
        );
        const assignmentId = assignmentRes.rows[0].id;

        // 4. Upsert status — unique on assignment_id
        await pool.query(
          `INSERT INTO public.fasih_region_status
             (assignment_id, total_assignments, approved, draft, open, submitted, rejected,
              edited_admin, revoked, submitted_respondent, edited_supervisor)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT (assignment_id) DO UPDATE
             SET total_assignments   = EXCLUDED.total_assignments,
                 approved            = EXCLUDED.approved,
                 draft               = EXCLUDED.draft,
                 open                = EXCLUDED.open,
                 submitted           = EXCLUDED.submitted,
                 rejected            = EXCLUDED.rejected,
                 edited_admin        = EXCLUDED.edited_admin,
                 revoked             = EXCLUDED.revoked,
                 submitted_respondent = EXCLUDED.submitted_respondent,
                 edited_supervisor   = EXCLUDED.edited_supervisor,
                 updated_at          = now()`,
          [
            assignmentId,
            row.totalRegion,
            row.approved, row.draft, row.open, row.submitted,
            row.rejected, row.editedAdmin, row.revoked,
            row.submittedRespondent, row.editedSupervisor,
          ]
        );

        await pool.query("COMMIT");
        successCount++;
      } catch (rowErr) {
        await pool.query("ROLLBACK");
        rowErrors.push({
          rowNumber: row.rowNumber,
          errorType: "DB_ERROR",
          errorMessage: rowErr instanceof Error ? rowErr.message : "Database error",
          rawData: { name: row.name, regionCode: row.regionCode },
        });
      }
    }

    // ── Save row errors ────────────────────────────────────────────────────
    if (rowErrors.length > 0) {
      for (const e of rowErrors) {
        await pool.query(
          `INSERT INTO public.fasih_import_errors
             (import_id, row_number, error_type, error_message, raw_data)
           VALUES ($1,$2,$3,$4,$5)`,
          [importId, e.rowNumber, e.errorType, e.errorMessage, JSON.stringify(e.rawData)]
        );
      }
    }

    // ── Finalise import record ─────────────────────────────────────────────
    const finalStatus =
      rowErrors.length === 0
        ? "completed"
        : successCount === 0
        ? "failed"
        : "completed_with_errors";

    await pool.query(
      `UPDATE public.fasih_imports
       SET status       = $1,
           success_rows = $2,
           failed_rows  = $3
       WHERE id = $4`,
      [finalStatus, successCount, rowErrors.length, importId]
    );

    // Activity log
    await writeFasihActivityLog({
      userId: user.id,
      action: "IMPORT",
      tableName: "fasih_imports",
      recordId: importId,
      newData: {
        file_name:    file.name,
        total_rows:   totalRows,
        success_rows: successCount,
        failed_rows:  rowErrors.length,
        status:       finalStatus,
      },
    });

    return NextResponse.json({
      success: true,
      importId,
      totalRows,
      successRows: successCount,
      failedRows:  rowErrors.length,
      status:      finalStatus,
    });
  } catch (err) {
    console.error("[FASIH] import POST error:", err);

    // Mark import as failed if record was created
    if (importId) {
      await pool.query(
        `UPDATE public.fasih_imports
         SET status = 'failed', error_message = $1
         WHERE id = $2`,
        [err instanceof Error ? err.message : "Unknown error", importId]
      ).catch(() => null);
    }

    return NextResponse.json({ error: "Terjadi kesalahan saat import" }, { status: 500 });
  }
}
