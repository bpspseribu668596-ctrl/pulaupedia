-- ============================================================
-- FASIH DATABASE SCHEMA
-- Corrected model:
-- fasih_regions = master wilayah only
-- totalRegion from source is stored as
-- fasih_region_status.total_assignments
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.fasih_officers (
  id uuid primary key default gen_random_uuid(),
  username text,
  name text not null,
  officer_role text not null check (officer_role in ('pencacah','pengawas')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fasih_users (
  id uuid primary key default gen_random_uuid(),
  officer_id uuid references public.fasih_officers(id) on delete set null,
  username text unique not null,
  name text not null,
  role text not null check (role in ('admin','viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fasih_regions (
  id uuid primary key default gen_random_uuid(),
  region_code text not null,
  island_name text not null,
  region_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fasih_assignments (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references public.fasih_regions(id) on delete restrict,
  pencacah_id uuid not null references public.fasih_officers(id) on delete restrict,
  pengawas_id uuid references public.fasih_officers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pencacah_id, region_id)
);

create table if not exists public.fasih_region_status (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null unique references public.fasih_assignments(id) on delete cascade,

  -- Total assignment/unit pada region dari source data totalRegion.
  -- Nilai ini TIDAK berubah hanya karena status berpindah.
  total_assignments integer not null default 0 check (total_assignments >= 0),

  approved integer not null default 0 check (approved >= 0),
  draft integer not null default 0 check (draft >= 0),
  open integer not null default 0 check (open >= 0),
  submitted integer not null default 0 check (submitted >= 0),
  rejected integer not null default 0 check (rejected >= 0),
  edited_admin integer not null default 0 check (edited_admin >= 0),
  revoked integer not null default 0 check (revoked >= 0),
  submitted_respondent integer not null default 0 check (submitted_respondent >= 0),
  edited_supervisor integer not null default 0 check (edited_supervisor >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fasih_imports (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  imported_by uuid references public.fasih_users(id) on delete set null,
  total_rows integer not null default 0,
  success_rows integer not null default 0,
  failed_rows integer not null default 0,
  status text not null check (status in ('processing','completed','completed_with_errors','failed')),
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.fasih_import_errors (
  id uuid primary key default gen_random_uuid(),
  import_id uuid not null references public.fasih_imports(id) on delete cascade,
  row_number integer not null,
  error_type text not null,
  error_message text not null,
  raw_data jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.fasih_activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.fasih_users(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

-- Recommended indexes
create index if not exists idx_fasih_regions_region_code on public.fasih_regions(region_code);
create index if not exists idx_fasih_regions_island_name on public.fasih_regions(island_name);
create index if not exists idx_fasih_assignments_pencacah on public.fasih_assignments(pencacah_id);
create index if not exists idx_fasih_assignments_pengawas on public.fasih_assignments(pengawas_id);
create index if not exists idx_fasih_status_assignment on public.fasih_region_status(assignment_id);

-- IMPORTANT:
-- No trigger is created to recalculate total_assignments from status.
-- total_assignments is the source totalRegion value and remains stable
-- unless an explicit import/master-data update changes it.