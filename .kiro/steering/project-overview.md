# Pulau Pedia — Project Overview

Proyek ini adalah aplikasi web **BPS Kabupaten Kepulauan Seribu** bernama **Pulau Pedia**, dibangun dengan Next.js App Router.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (style: base-nova) + lucide-react |
| Database | PostgreSQL (via `pg` pool, koneksi lewat `DATABASE_URL`) |
| Auth (Admin CMS) | Custom session cookie `admin-session` (JSON) |
| Auth (FASIH) | Custom session cookie `fasih-session` (token hex, 24 jam) |
| File Upload | Cloudinary |
| Export | ExcelJS |

## Struktur Aplikasi

### Zona Publik
- `/` — halaman utama
- `/[portalSlug]` — dynamic portal (konten dari DB)
- `/fasih/monitoring` — monitoring publik FASIH (tanpa login)

### Admin CMS (`/admin`)
- `/admin` — dashboard
- `/admin/announcement` — manajemen pengumuman
- `/admin/footer` — manajemen footer
- `/admin/header` — manajemen header
- `/admin/main-portal` — manajemen portal utama
- `/admin/navbar` — manajemen navbar
- `/admin/services` — manajemen layanan
- Dilindungi middleware: cookie `admin-session` wajib ada

### FASIH App (`/fasih/(app)`)
- `/fasih/dashboard` — dashboard statistik
- `/fasih/petugas` — manajemen petugas (pencacah/pengawas)
- `/fasih/wilayah` — manajemen wilayah assignment
- `/fasih/import` — import data dari Excel
- `/fasih/monitoring` — monitoring publik (tidak dilindungi auth)
- Dilindungi middleware: cookie `fasih-session` wajib ada
- Login via `/login?tab=fasih`

### API Routes (`/api`)
- `/api/auth` — login/logout Admin CMS (next-auth + custom)
- `/api/fasih/auth` — login/logout FASIH
- `/api/fasih/dashboard` — statistik dashboard
- `/api/fasih/petugas` — CRUD petugas
- `/api/fasih/wilayah` — data wilayah/assignment
- `/api/fasih/import` — proses import Excel
- `/api/fasih/export` — export ke Excel
- `/api/fasih/public/wilayah` — endpoint publik monitoring
- `/api/announcements`, `/api/footer`, `/api/header`, `/api/navbar`, `/api/portals`, `/api/services`, `/api/logos`, `/api/uploads`

## File Kunci

| File | Fungsi |
|---|---|
| `src/middleware.ts` | Auth guard untuk `/admin` dan `/fasih` routes |
| `src/lib/db.ts` | PostgreSQL pool (`DATABASE_URL` dari env) |
| `src/lib/fasih-db.ts` | Query layer FASIH (types + semua query function) |
| `src/lib/fasih-auth.ts` | Session helpers FASIH (create/validate/logout) |
| `src/lib/fasih-constants.ts` | Konstanta: nama cookie, durasi session |
| `src/lib/cloudinary.ts` | Konfigurasi Cloudinary |
| `src/lib/utils.ts` | Utility umum (cn, dll) |
| `src/lib/error-messages.ts` | Pesan error terpusat |

## Environment Variables

Lihat `.env` untuk konfigurasi lengkap. Variable utama:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — secret untuk NextAuth
- Cloudinary credentials (`CLOUDINARY_*`)

## Database

Dua skema SQL tersedia di root:
- `pulau_pedia3101_postgresql.sql` — skema portal/CMS
- `fasih_database.sql` — skema FASIH (assignments, regions, officers, users, sessions, import logs)
- `fasih_dataseed.sql` — seed data awal FASIH
