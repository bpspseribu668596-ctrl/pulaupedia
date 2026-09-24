import pool from '@/lib/db';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FasihUser {
  id: string;
  officer_id: string | null;
  username: string;
  name: string;
  role: 'admin' | 'viewer';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FasihSession {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: string;
  created_at: string;
}

export interface FasihOfficer {
  id: string;
  username: string | null;
  name: string;
  officer_role: 'pencacah' | 'pengawas';
  created_at: string;
  updated_at: string;
}

export interface FasihRegion {
  id: string;
  region_code: string;
  island_name: string;
  region_name: string;
  created_at: string;
  updated_at: string;
}

export interface FasihAssignment {
  id: string;
  region_id: string;
  pencacah_id: string;
  pengawas_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface FasihRegionStatus {
  id: string;
  assignment_id: string;
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
  created_at: string;
  updated_at: string;
}

export interface FasihImport {
  id: string;
  file_name: string;
  imported_by: string | null;
  total_rows: number;
  success_rows: number;
  failed_rows: number;
  status: 'processing' | 'completed' | 'completed_with_errors' | 'failed';
  error_message: string | null;
  created_at: string;
}

export interface FasihImportError {
  id: string;
  import_id: string;
  row_number: number;
  error_type: string;
  error_message: string;
  raw_data: Record<string, unknown> | null;
  created_at: string;
}

// ─── Activity Log ─────────────────────────────────────────────────────────────

/**
 * Write an activity log entry. user_id is always taken from the
 * validated server-side session — never from client input.
 */
export async function writeFasihActivityLog({
  userId,
  action,
  tableName,
  recordId,
  oldData,
  newData,
}: {
  userId: string | null;
  action: string;
  tableName: string;
  recordId?: string | null;
  oldData?: Record<string, unknown> | null;
  newData?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO public.fasih_activity_logs
         (user_id, action, table_name, record_id, old_data, new_data)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId ?? null,
        action,
        tableName,
        recordId ?? null,
        oldData ? JSON.stringify(oldData) : null,
        newData ? JSON.stringify(newData) : null,
      ]
    );
  } catch (err) {
    // Log failure should not break the main operation
    console.error('[FASIH] activity log write failed:', err);
  }
}

// ─── User Queries ─────────────────────────────────────────────────────────────

export async function getFasihUserByUsername(
  username: string
): Promise<(FasihUser & { password_hash: string }) | null> {
  const { rows } = await pool.query<FasihUser & { password_hash: string }>(
    `SELECT id, officer_id, username, password_hash, name, role, is_active,
            created_at, updated_at
     FROM public.fasih_users
     WHERE username = $1`,
    [username]
  );
  return rows[0] ?? null;
}

export async function getFasihUserById(
  id: string
): Promise<FasihUser | null> {
  const { rows } = await pool.query<FasihUser>(
    `SELECT id, officer_id, username, name, role, is_active,
            created_at, updated_at
     FROM public.fasih_users
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

// ─── Session Queries ──────────────────────────────────────────────────────────

export async function createFasihSession(
  userId: string,
  token: string,
  expiresAt: Date
): Promise<void> {
  await pool.query(
    `INSERT INTO public.fasih_sessions (user_id, session_token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt.toISOString()]
  );
}

export async function getFasihSessionWithUser(token: string): Promise<
  | (FasihSession & {
      user: FasihUser;
    })
  | null
> {
  const { rows } = await pool.query(
    `SELECT
       s.id, s.user_id, s.session_token, s.expires_at, s.created_at,
       u.id        AS u_id,
       u.officer_id AS u_officer_id,
       u.username  AS u_username,
       u.name      AS u_name,
       u.role      AS u_role,
       u.is_active AS u_is_active
     FROM public.fasih_sessions s
     JOIN public.fasih_users u ON u.id = s.user_id
     WHERE s.session_token = $1
       AND s.expires_at > now()
       AND u.is_active = true`,
    [token]
  );
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    id: r.id,
    user_id: r.user_id,
    session_token: r.session_token,
    expires_at: r.expires_at,
    created_at: r.created_at,
    user: {
      id: r.u_id,
      officer_id: r.u_officer_id,
      username: r.u_username,
      name: r.u_name,
      role: r.u_role,
      is_active: r.u_is_active,
      created_at: '',
      updated_at: '',
    },
  };
}

export async function deleteFasihSession(token: string): Promise<void> {
  await pool.query(
    `DELETE FROM public.fasih_sessions WHERE session_token = $1`,
    [token]
  );
}

export async function cleanupExpiredFasihSessions(): Promise<void> {
  await pool.query(
    `DELETE FROM public.fasih_sessions WHERE expires_at <= now()`
  );
}

// ─── Officer Queries ──────────────────────────────────────────────────────────

export async function getFasihOfficers(
  role?: 'pencacah' | 'pengawas'
): Promise<FasihOfficer[]> {
  const { rows } = await pool.query<FasihOfficer>(
    `SELECT id, username, name, officer_role, created_at, updated_at
     FROM public.fasih_officers
     ${role ? 'WHERE officer_role = $1' : ''}
     ORDER BY name ASC`,
    role ? [role] : []
  );
  return rows;
}

export async function getFasihOfficerById(
  id: string
): Promise<FasihOfficer | null> {
  const { rows } = await pool.query<FasihOfficer>(
    `SELECT id, username, name, officer_role, created_at, updated_at
     FROM public.fasih_officers
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  total_assignments: number;
  total_approved: number;
  total_draft: number;
  total_open: number;
  total_submitted: number;
  total_rejected: number;
  total_edited_admin: number;
  total_revoked: number;
  total_submitted_respondent: number;
  total_edited_supervisor: number;
}

export async function getFasihDashboardStats(): Promise<DashboardStats> {
  const { rows } = await pool.query<DashboardStats>(
    `SELECT
       COUNT(a.id)::int                  AS total_assignments,
       COALESCE(SUM(s.approved),0)::int  AS total_approved,
       COALESCE(SUM(s.draft),0)::int     AS total_draft,
       COALESCE(SUM(s.open),0)::int      AS total_open,
       COALESCE(SUM(s.submitted),0)::int AS total_submitted,
       COALESCE(SUM(s.rejected),0)::int  AS total_rejected,
       COALESCE(SUM(s.edited_admin),0)::int          AS total_edited_admin,
       COALESCE(SUM(s.revoked),0)::int               AS total_revoked,
       COALESCE(SUM(s.submitted_respondent),0)::int  AS total_submitted_respondent,
       COALESCE(SUM(s.edited_supervisor),0)::int     AS total_edited_supervisor
     FROM public.fasih_assignments a
     LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id`
  );
  return rows[0];
}

export interface PencacahSummary {
  pencacah_id: string;
  pencacah_name: string;
  total_assignments: number;
  total_approved: number;
  total_draft: number;
  total_open: number;
  total_submitted: number;
  total_rejected: number;
  total_edited_admin: number;
  total_revoked: number;
  total_submitted_respondent: number;
  total_edited_supervisor: number;
}

export async function getFasihPencacahSummary(): Promise<PencacahSummary[]> {
  const { rows } = await pool.query<PencacahSummary>(
    `SELECT
       o.id   AS pencacah_id,
       o.name AS pencacah_name,
       COUNT(a.id)::int                  AS total_assignments,
       COALESCE(SUM(s.approved),0)::int  AS total_approved,
       COALESCE(SUM(s.draft),0)::int     AS total_draft,
       COALESCE(SUM(s.open),0)::int      AS total_open,
       COALESCE(SUM(s.submitted),0)::int AS total_submitted,
       COALESCE(SUM(s.rejected),0)::int  AS total_rejected,
       COALESCE(SUM(s.edited_admin),0)::int         AS total_edited_admin,
       COALESCE(SUM(s.revoked),0)::int              AS total_revoked,
       COALESCE(SUM(s.submitted_respondent),0)::int AS total_submitted_respondent,
       COALESCE(SUM(s.edited_supervisor),0)::int    AS total_edited_supervisor
     FROM public.fasih_officers o
     JOIN public.fasih_assignments a ON a.pencacah_id = o.id
     LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
     WHERE o.officer_role = 'pencacah'
     GROUP BY o.id, o.name
     ORDER BY o.name ASC`
  );
  return rows;
}

// ─── Wilayah / Assignment Queries ─────────────────────────────────────────────

export interface AssignmentRow {
  assignment_id: string;
  pencacah_id: string;
  pencacah_name: string;
  pencacah_username: string | null;
  pengawas_id: string | null;
  pengawas_name: string | null;
  region_id: string;
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
}

export async function getFasihAssignments(params: {
  search?: string;
  island?: string;
  pencacahId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}): Promise<{ rows: AssignmentRow[]; total: number; filteredStats: DashboardStats }> {
  const { search = '', island = '', pencacahId = '', page = 1, pageSize = 50, sortBy = '', sortDir = 'asc' } = params;
  const offset = (page - 1) * pageSize;

  const conditions: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (search) {
    conditions.push(
      `(r.region_code ILIKE $${idx} OR r.region_name ILIKE $${idx} OR r.island_name ILIKE $${idx} OR pc.name ILIKE $${idx} OR pc.username ILIKE $${idx})`
    );
    values.push(`%${search}%`);
    idx++;
  }
  if (island) {
    conditions.push(`r.island_name = $${idx}`);
    values.push(island);
    idx++;
  }
  if (pencacahId) {
    conditions.push(`a.pencacah_id = $${idx}`);
    values.push(pencacahId);
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  // Build ORDER BY clause — only allow specific columns for safety
  const validSortColumns = ['region_code', 'island_name', 'region_name', 'total_assignments', 'pencacah_name', 'pengawas_name', 'approved', 'draft', 'open', 'submitted', 'rejected', 'edited_admin', 'revoked', 'submitted_respondent', 'edited_supervisor'];
  let orderBy = 'ORDER BY r.island_name ASC, r.region_name ASC';
  
  if (sortBy && validSortColumns.includes(sortBy)) {
    const columnMap: Record<string, string> = {
      'region_code': 'r.region_code',
      'island_name': 'r.island_name',
      'region_name': 'r.region_name',
      'total_assignments': 's.total_assignments',
      'pencacah_name': 'pc.name',
      'pengawas_name': 'pw.name',
      'approved': 's.approved',
      'draft': 's.draft',
      'open': 's.open',
      'submitted': 's.submitted',
      'rejected': 's.rejected',
      'edited_admin': 's.edited_admin',
      'revoked': 's.revoked',
      'submitted_respondent': 's.submitted_respondent',
      'edited_supervisor': 's.edited_supervisor',
    };
    const direction = sortDir === 'desc' ? 'DESC' : 'ASC';
    orderBy = `ORDER BY ${columnMap[sortBy]} ${direction}`;
  }

  const [countResult, statsResult, dataResult] = await Promise.all([
    pool.query(
      `SELECT COUNT(*)::int AS total
       FROM public.fasih_assignments a
       JOIN public.fasih_regions r ON r.id = a.region_id
       JOIN public.fasih_officers pc ON pc.id = a.pencacah_id
       LEFT JOIN public.fasih_officers pw ON pw.id = a.pengawas_id
       LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
       ${where}`,
      values
    ),
    pool.query<DashboardStats>(
      `SELECT
         COUNT(a.id)::int                              AS total_assignments,
         COALESCE(SUM(s.approved),0)::int             AS total_approved,
         COALESCE(SUM(s.draft),0)::int                AS total_draft,
         COALESCE(SUM(s.open),0)::int                 AS total_open,
         COALESCE(SUM(s.submitted),0)::int            AS total_submitted,
         COALESCE(SUM(s.rejected),0)::int             AS total_rejected,
         COALESCE(SUM(s.edited_admin),0)::int         AS total_edited_admin,
         COALESCE(SUM(s.revoked),0)::int              AS total_revoked,
         COALESCE(SUM(s.submitted_respondent),0)::int AS total_submitted_respondent,
         COALESCE(SUM(s.edited_supervisor),0)::int    AS total_edited_supervisor
       FROM public.fasih_assignments a
       JOIN public.fasih_regions r ON r.id = a.region_id
       JOIN public.fasih_officers pc ON pc.id = a.pencacah_id
       LEFT JOIN public.fasih_officers pw ON pw.id = a.pengawas_id
       LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
       ${where}`,
      values
    ),
    pool.query<AssignmentRow>(    `SELECT
       a.id   AS assignment_id,
       pc.id  AS pencacah_id,
       pc.name AS pencacah_name,
       pc.username AS pencacah_username,
       pw.id  AS pengawas_id,
       pw.name AS pengawas_name,
       r.id   AS region_id,
       r.region_code,
       r.island_name,
       r.region_name,
       COALESCE(s.total_assignments,0) AS total_assignments,
       COALESCE(s.approved,0)             AS approved,
       COALESCE(s.draft,0)               AS draft,
       COALESCE(s.open,0)                AS open,
       COALESCE(s.submitted,0)           AS submitted,
       COALESCE(s.rejected,0)            AS rejected,
       COALESCE(s.edited_admin,0)        AS edited_admin,
       COALESCE(s.revoked,0)             AS revoked,
       COALESCE(s.submitted_respondent,0) AS submitted_respondent,
       COALESCE(s.edited_supervisor,0)   AS edited_supervisor
     FROM public.fasih_assignments a
     JOIN public.fasih_regions r ON r.id = a.region_id
     JOIN public.fasih_officers pc ON pc.id = a.pencacah_id
     LEFT JOIN public.fasih_officers pw ON pw.id = a.pengawas_id
     LEFT JOIN public.fasih_region_status s ON s.assignment_id = a.id
     ${where}
     ${orderBy}
     LIMIT $${idx} OFFSET $${idx + 1}`,
    [...values, pageSize, offset]
  ),
  ]);

  return {
    rows: dataResult.rows,
    total: countResult.rows[0].total,
    filteredStats: statsResult.rows[0],
  };
}

export async function getDistinctIslands(): Promise<string[]> {
  const { rows } = await pool.query<{ island_name: string }>(
    `SELECT DISTINCT island_name FROM public.fasih_regions ORDER BY island_name ASC`
  );
  return rows.map((r) => r.island_name);
}

// ─── Import Queries ───────────────────────────────────────────────────────────

export async function getFasihImports(): Promise<FasihImport[]> {
  const { rows } = await pool.query<FasihImport>(
    `SELECT id, file_name, imported_by, total_rows, success_rows, failed_rows,
            status, error_message, created_at
     FROM public.fasih_imports
     ORDER BY created_at DESC
     LIMIT 50`
  );
  return rows;
}

export async function getFasihImportErrors(
  importId: string
): Promise<FasihImportError[]> {
  const { rows } = await pool.query<FasihImportError>(
    `SELECT id, import_id, row_number, error_type, error_message, raw_data, created_at
     FROM public.fasih_import_errors
     WHERE import_id = $1
     ORDER BY row_number ASC`,
    [importId]
  );
  return rows;
}

// ─── Fasih Users CRUD ─────────────────────────────────────────────────────────

export interface FasihUserWithOfficer extends FasihUser {
  officer_name: string | null;
  officer_role: string | null;
}

export async function getFasihUsers(): Promise<FasihUserWithOfficer[]> {
  const { rows } = await pool.query<FasihUserWithOfficer>(
    `SELECT
       u.id, u.officer_id, u.username, u.name, u.role, u.is_active,
       u.created_at, u.updated_at,
       o.name AS officer_name,
       o.officer_role
     FROM public.fasih_users u
     LEFT JOIN public.fasih_officers o ON o.id = u.officer_id
     ORDER BY u.name ASC`
  );
  return rows;
}
