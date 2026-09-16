-- =========================================================
-- FASIH MIGRATION: Create first admin user
-- Run this once in Supabase SQL Editor (or psql)
--
-- Password default: fasih@admin123
-- Hash generated with bcrypt cost 10 via pgcrypto.
--
-- GANTI password setelah pertama kali login via UI.
-- =========================================================

-- Pastikan extension pgcrypto tersedia (sudah dibuat di fasih.sql)
-- create extension if not exists pgcrypto;

INSERT INTO public.fasih_users (
  id,
  officer_id,
  username,
  password_hash,
  name,
  role,
  is_active
)
VALUES (
  gen_random_uuid(),
  NULL,
  'admin.fasih',
  crypt('fasih@admin123', gen_salt('bf', 10)),
  'Administrator FASIH',
  'admin',
  true
)
ON CONFLICT (username) DO NOTHING;

-- Verifikasi
SELECT id, username, name, role, is_active FROM public.fasih_users;
