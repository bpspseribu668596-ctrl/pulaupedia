# Panduan Development

## Menjalankan Proyek

```bash
# Development server
npm run dev

# Build production
npm run build

# Start production
npm start

# Lint
npm run lint
```

> Dev server berjalan di port default Next.js (3000). Allowed dev origins yang dikonfigurasi:
> `192.168.1.15` dan `192.168.110.122` (lihat `next.config.ts`).

## Setup Database

1. Buat database PostgreSQL
2. Set `DATABASE_URL` di `.env`
3. Jalankan skema:
   ```bash
   # Skema portal/CMS
   psql $DATABASE_URL -f pulau_pedia3101_postgresql.sql
   
   # Skema FASIH
   psql $DATABASE_URL -f fasih_database.sql
   
   # Seed data FASIH
   psql $DATABASE_URL -f fasih_dataseed.sql
   ```

## Menambah Halaman Baru

### Halaman Publik
Buat file di `src/app/[nama-route]/page.tsx`. Server Component by default.

### Halaman Admin CMS (protected)
Buat di `src/app/admin/[nama]/page.tsx`. Middleware otomatis melindungi semua route `/admin/*`.

### Halaman FASIH (protected)
Buat di `src/app/fasih/(app)/[nama]/page.tsx`. Middleware otomatis melindungi route berikut:
- `/fasih/dashboard/*`
- `/fasih/petugas/*`
- `/fasih/wilayah/*`
- `/fasih/import/*`

Jika menambah route baru yang perlu dilindungi, update matcher di `src/middleware.ts`:
```typescript
const fasihProtected =
  path.startsWith('/fasih/dashboard') ||
  path.startsWith('/fasih/petugas') ||
  // tambahkan di sini
  path.startsWith('/fasih/[nama-baru]');
```

## Menambah API Route Baru

Buat di `src/app/api/[domain]/route.ts`. Contoh:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { validateFasihSession } from '@/lib/fasih-auth';

export async function GET(request: NextRequest) {
  const user = await validateFasihSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  // logic...
  return NextResponse.json({ data });
}
```

## Menambah Query Database FASIH

1. Tambahkan type interface di `src/lib/fasih-db.ts`
2. Tambahkan query function di file yang sama
3. Export function tersebut
4. Import di API route atau server component yang membutuhkan

## Menambah Komponen shadcn/ui

```bash
npx shadcn add [nama-komponen]
```

Komponen akan otomatis ditaruh di `src/components/ui/`.

## Struktur Komponen Halaman FASIH

Halaman FASIH authenticated menggunakan layout dari `src/app/fasih/(app)/layout.tsx` yang sudah include sidebar (`src/components/fasih/sidebar.tsx`).

Halaman publik (`/fasih/monitoring`) menggunakan `<Navbar>` dan `<Footer>` dari `src/components/`.

## Activity Logging (FASIH)

Setiap operasi mutasi penting di FASIH harus di-log:

```typescript
import { writeFasihActivityLog } from '@/lib/fasih-db';

await writeFasihActivityLog({
  userId: user.id,        // dari validateFasihSession()
  action: 'CREATE',       // atau UPDATE, DELETE, IMPORT, EXPORT
  tableName: 'fasih_xxx',
  recordId: newRecord.id,
  oldData: null,          // data sebelum perubahan (untuk UPDATE/DELETE)
  newData: newRecord,     // data setelah perubahan
});
```

## Tips & Gotchas

- **`"use client"` di API routes**: jangan — API routes selalu server-side
- **Database pool SSL**: dikonfigurasi dengan `rejectUnauthorized: false` di `db.ts`, cocok untuk cloud DB
- **Pagination FASIH**: gunakan pattern `page` + `pageSize` + `offset` seperti di `getFasihAssignments()`
- **Sort column injection**: selalu whitelist kolom yang boleh di-sort (lihat `validSortColumns` di `fasih-db.ts`)
- **Cookie `admin-session`**: nilai JSON, bukan token — berbeda dengan FASIH session
- **Route group `(app)`**: folder `fasih/(app)` menggunakan layout terpisah dari `fasih/monitoring` yang publik
