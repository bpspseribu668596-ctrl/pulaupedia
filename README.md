# Pulau Pedia — BPS Kepulauan Seribu (3101)

Portal informasi dan layanan digital BPS Kepulauan Seribu, mencakup:
- **Portal Publik** — halaman beranda, portal konten, pengumuman, dan layanan
- **Admin CMS** — manajemen konten portal publik (`/admin`)
- **FASIH** — monitoring pengawasan lapangan sensus (`/fasih/dashboard`)

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
- PostgreSQL (`pg`)
- Cloudinary (upload gambar)
- ExcelJS (export/import data)

---

## Prasyarat

Pastikan sudah terinstall di mesin lokal:

| Tool | Versi minimum |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| PostgreSQL | 14.x |

---

## Instalasi

### 1. Clone repository

```bash
git clone <url-repository>
cd pulau-pedia3101
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

Buat database PostgreSQL baru, lalu jalankan kedua file SQL berikut secara berurutan:

```bash
# 1. Schema portal publik (users, portals, announcements, dsb.)
psql -U <user> -d <nama_database> -f database/pulau_pedia3101_postgresql.sql

# 2. Schema FASIH (officers, regions, assignments, monitoring, dsb.)
psql -U <user> -d <nama_database> -f database/fasih_database.sql
```

> Atau buka file SQL tersebut langsung di pgAdmin / DBeaver dan jalankan query-nya.

### 4. Setup environment variables

Salin file contoh dan isi nilainya:

```bash
cp .env.example .env
```

Lalu edit `.env`:

```env
# PostgreSQL — sesuaikan dengan credentials database yang baru dibuat
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<nama_database>

# Cloudinary — daftar gratis di https://cloudinary.com
# Ambil nilai dari Dashboard → API Keys
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 5. Jalankan development server

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

---

## Struktur Aplikasi

```
/                       → Landing page publik
/[portalSlug]           → Halaman portal (e.g. /portal-umum)
/[portalSlug]/[item]    → Detail item portal

/login                  → Login gabungan (tab: Admin | FASIH)
/admin                  → CMS Admin (butuh login)
/fasih/dashboard        → Monitoring FASIH (butuh login)
/fasih/monitoring       → View monitoring publik (tanpa login)
```

---

## Akun Default

Setelah menjalankan SQL seed, tersedia akun awal:

| Aplikasi | Username | Password | Catatan |
|---|---|---|---|
| Admin CMS | Lihat file `database/pulau_pedia3101_postgresql.sql` tabel `users` | — | Hash bcrypt |
| FASIH | Lihat file `database/fasih_dataseed.sql` | — | Hash bcrypt |

> Ganti password default segera setelah login pertama.

---

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Development server dengan hot-reload |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan hasil build production |
| `npm run lint` | Lint seluruh kode |

---

## Konfigurasi Tambahan

**Akses LAN (opsional)**

Untuk mengizinkan akses dari IP lokal selain `localhost`, tambahkan IP ke `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.x.x'],
};
```

**Cloudinary upload folder**

Semua gambar yang diupload disimpan ke subfolder Cloudinary sesuai jenisnya (`uploads/announcements`, `uploads/headers`, dsb.). Tidak ada konfigurasi tambahan yang dibutuhkan selain API key.

---

## Struktur Folder Utama

```
src/
├── app/
│   ├── (public)/       # Halaman publik + Admin CMS
│   ├── (fasih)/        # Aplikasi FASIH
│   ├── (shared)/       # Halaman login
│   └── api/            # API Routes
│       ├── public/     # Endpoint portal publik & admin
│       └── fasih/      # Endpoint FASIH
├── components/
│   ├── public/         # Komponen halaman publik
│   ├── admin/          # Komponen admin CMS
│   ├── fasih/          # Komponen FASIH
│   └── ui/             # Primitif shadcn/ui
├── lib/
│   ├── db.ts           # Koneksi PostgreSQL (pg Pool)
│   ├── cloudinary.ts   # Konfigurasi Cloudinary
│   └── fasih/          # Auth & DB helpers khusus FASIH
├── hooks/              # Custom React hooks
└── middleware.ts       # Proteksi route /admin dan /fasih/*
database/
├── pulau_pedia3101_postgresql.sql  # Schema portal publik
├── fasih_database.sql              # Schema FASIH
└── fasih_dataseed.sql              # Data awal FASIH
```
