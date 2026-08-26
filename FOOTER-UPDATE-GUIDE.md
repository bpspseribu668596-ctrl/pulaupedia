# Panduan Update Footer - Multiple Entries Support

## Perubahan yang Dilakukan

### 1. Database Structure
File: `database-footer-update.sql`

Tabel `footer_config` diupdate untuk mendukung multiple entries menggunakan JSON:
- `companyAddress` → JSON array untuk multiple alamat
- `contacts` → JSON array untuk multiple kontak (label + value)
- `links` → JSON array untuk multiple tautan (label + url)

### 2. API Route
File: `src/app/api/footer/route.ts`

- GET: Parse JSON dari database
- POST: Menyimpan data dengan JSON.stringify()
- DELETE: Reset ke default values

### 3. Frontend Components

#### Footer Component (`src/components/Footer.tsx`)
- Menampilkan multiple alamat
- Menampilkan multiple kontak dengan label
- Menampilkan multiple tautan dengan label
- Fallback text jika data kosong

#### Admin Footer Page (`src/app/admin/footer/page.tsx`)
- Form untuk edit company name dan logo
- Dynamic form untuk alamat (tambah/hapus dengan button)
- Dynamic form untuk kontak (label + value, tambah/hapus)
- Dynamic form untuk tautan (label + url, tambah/hapus)
- Preview yang sesuai dengan tampilan footer di homepage

## Cara Menjalankan Update

### Step 1: Update Database
Jalankan SQL di file `database-footer-update.sql` melalui phpMyAdmin atau MySQL client:

```sql
USE pulau_pedia3101;

ALTER TABLE footer_config 
  MODIFY COLUMN companyAddress JSON,
  ADD COLUMN contacts JSON AFTER companyAddress,
  ADD COLUMN links JSON AFTER contacts;

UPDATE footer_config SET 
  companyAddress = JSON_ARRAY('Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta'),
  contacts = JSON_ARRAY(JSON_OBJECT('label', 'Telepon', 'value', '+62-21-XXXXXX')),
  links = JSON_ARRAY(JSON_OBJECT('label', 'Email', 'url', 'mailto:info@kepulauanseribu.bps.go.id'))
WHERE id = 1;
```

**CATATAN:** Jika ada error column `phone` dan `email` masih ada, jalankan ini dulu:
```sql
ALTER TABLE footer_config 
  DROP COLUMN IF EXISTS phone,
  DROP COLUMN IF EXISTS email;
```

### Step 2: Test Frontend
1. Buka http://localhost:3000/ - cek footer section
2. Buka http://localhost:3000/admin/footer - cek form edit

### Step 3: Cara Menggunakan Admin Footer

#### Tambah Alamat:
1. Klik button "Edit" di Admin Footer
2. Di section "Alamat Kantor", klik button "+ Tambah"
3. Ketik alamat di textarea yang muncul
4. Ulangi untuk alamat tambahan
5. Klik "Simpan Perubahan"

#### Tambah Kontak:
1. Di section "Kontak", klik button "+ Tambah"
2. Isi "Label" (contoh: Telepon, WhatsApp, Fax)
3. Isi "Nilai" (contoh: +62-21-XXXXXX)
4. Ulangi untuk kontak tambahan
5. Klik "Simpan Perubahan"

#### Tambah Tautan:
1. Di section "Tautan Lainnya", klik button "+ Tambah"
2. Isi "Label" (contoh: Email, Website, Facebook)
3. Isi "URL" (contoh: mailto:email@domain.com, https://website.com)
4. Ulangi untuk tautan tambahan
5. Klik "Simpan Perubahan"

#### Hapus Item:
- Klik icon "Trash" (🗑️) di samping item yang ingin dihapus
- Minimal harus ada 1 item di setiap section

## Fitur Baru

✅ Multiple alamat kantor (bisa lebih dari 1)
✅ Multiple kontak dengan label (Telepon, WhatsApp, Fax, dll)
✅ Multiple tautan dengan label (Email, Website, Social Media, dll)
✅ Button tambah/hapus untuk setiap section
✅ Textarea untuk alamat mendukung multi-line
✅ Preview real-time sesuai tampilan footer homepage
✅ Fallback text "tidak tersedia" jika database error

## Error Handling

Jika database tidak tersedia:
- Alamat: "Alamat tidak tersedia"
- Kontak: "Kontak tidak tersedia"
- Tautan: "Tautan tidak tersedia"
- Company Name: "BPS Kepulauan Seribu" (default)
