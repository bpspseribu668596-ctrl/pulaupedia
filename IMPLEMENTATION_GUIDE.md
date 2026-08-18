# Header Implementation - Setup Instructions

## 1. Database Setup
1. Buka phpMyAdmin di Laragon
2. Copy-paste seluruh isi file `@dtbs.txt` ke SQL query
3. Execute untuk membuat database `pulau_pedia3101` dan tabel `headers`

## 2. Environment Variables
File `.env.local` sudah dibuat dengan config:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pulau_pedia3101
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Sesuaikan `DB_PASSWORD` jika Laragon menggunakan password MySQL.

## 3. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 4. Testing

### Homepage (/)
- Header title dan subtitle fetch dari `/api/header` (database)
- Background image dari storage folder
- Fallback ke data default jika DB kosong

### Admin Header (/admin/header)
- Upload gambar baru → disimpan ke `/storage/uploads/headers/`
- Edit title & subtitle → update ke database
- Klik "Simpan Perubahan" → POST ke `/api/header`
- Klik "Reset to Default" → DELETE dari `/api/header` (reset ke default)

### File Serving
- Gambar diakses via `/api/uploads/[filename]`
- Route handler baca dari `/storage/uploads/` dan serve dengan MIME type

## 5. Struktur Implementasi

```
/storage/uploads/headers/  ← Physical file storage
  └── [timestamp]-[filename].jpg

/src/app/api/
  ├── header/route.ts              ← GET/POST/DELETE header data
  ├── uploads/
  │   ├── header/route.ts          ← POST upload file
  │   └── [filename]/route.ts      ← GET serve file

/src/app/
  ├── page.tsx                      ← Homepage (fetch dari /api/header)
  └── admin/header/page.tsx         ← Admin form (upload + update)

/.env.local                          ← Database config
```

## 6. Database Structure

**Table: headers**
- id (int, PK)
- title (varchar)
- subtitle (text)
- backgroundImage (varchar) - path relatif: `uploads/headers/image-123.jpg`
- createdAt (timestamp)
- updatedAt (timestamp)

## 7. Next Steps (Untuk Fitur Lain)
Implementasi serupa bisa dilakukan untuk:
- Services (admin/services)
- Announcements (admin/announcement)
- Navbar config (admin/navbar)
- Footer config (admin/footer)
- Main portal items (admin/main-portal)

Setiap halaman:
1. Buat tabel di database
2. Buat API routes (GET/POST/DELETE)
3. Update admin form untuk submit ke API
4. Update homepage/pages untuk fetch dari API dengan fallback default

---

Build status: ✓ Compiled successfully
