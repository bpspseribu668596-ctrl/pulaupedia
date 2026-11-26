# Pulau Pedia — BPS Kepulauan Seribu (3101)

Portal informasi dan layanan digital BPS Kepulauan Seribu, mencakup:
- **Portal Publik** — halaman beranda, portal konten, pengumuman, dan layanan
- **Admin CMS** — manajemen konten portal publik (`/admin`)
- **FASIH** — monitoring pengawasan lapangan sensus (`/fasih/dashboard`)

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
- PostgreSQL via `pg` pool
- Cloudinary (upload gambar)
- ExcelJS (export/import data FASIH)

---

## Prasyarat

| Tool | Versi minimum |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| PostgreSQL | 14.x (atau Supabase) |

---

## Instalasi

### 1. Clone & install (skip jika sudah ada source-codenya)

```bash
git clone <url-repository>
cd pulau-pedia3101
npm install
```

### 2. Setup database (pilih salah satu)

**Opsi A — Lokal (pgAdmin lokal)**

```bash
psql -U <user> -d <nama_database> -f "database/pulped_pgadmin4(lokal).sql"
```

Atau buka file tersebut langsung di pgAdmin dan jalankan query-nya.

**Opsi B — Supabase**

Buka Supabase SQL Editor, lalu jalankan isi file `database/pulped_supabase(web).sql`.

> **Catatan:** Jangan gunakan file `pulped_pgadmin4(lokal).sql` di Supabase SQL Editor —
> file tersebut adalah full dump yang berisi schema internal dan tidak kompatibel.
> File di folder `database/arsip/` adalah file lama dan tidak digunakan.

### 3. Setup environment variables

```bash
cp .env.example .env
```

Isi `.env` sesuai petunjuk di dalam file `.env.example`.

Untuk Supabase, gunakan **Connection Pooler** (bukan Direct Connection):
> Project Settings → Database → Connection string → **Connection Pooler** → mode Transaction → port **6543**

### 4. Jalankan

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

---

## Struktur Aplikasi

```
/                       → Landing page publik
/[portalSlug]           → Halaman portal (e.g. /portal-umum)
/login                  → Login gabungan (tab: Admin | FASIH)
/admin                  → CMS Admin (butuh login)
/fasih/dashboard        → Monitoring FASIH (butuh login)
/fasih/monitoring       → View monitoring publik (tanpa login)
```

---

## Akun Default

| Aplikasi | Sumber akun |
|---|---|
| Admin CMS | Tabel `users` di file `pulped_supabase(web).sql` |
| FASIH | Tabel `fasih_users` di file `pulped_supabase(web).sql` |

akun login CMS
user: admin
pass: admin123