-- PostgreSQL SQL Dump
-- Converted from MySQL (pulau_pedia3101)
-- For use with Supabase

-- --------------------------------------------------------
-- Table: announcements
-- --------------------------------------------------------

CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500) DEFAULT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO announcements (id, title, content, image, "isActive", "createdAt", "updatedAt") VALUES
(1, 'Juara 2', 'juara 2 lomba 17 agustusan 2026', 'uploads/announcements/1787039030769-IMG92121.jpg', TRUE, '2026-08-18 07:42:38', '2026-08-18 07:43:52'),
(2, 'Juara 1', 'juara 1 lomba 17 agustusan 2026', 'uploads/announcements/1787039433813-IMG9221.jpg', TRUE, '2026-08-18 07:50:34', '2026-08-18 07:50:34');

SELECT setval('announcements_id_seq', (SELECT MAX(id) FROM announcements));

-- --------------------------------------------------------
-- Table: footer_config
-- --------------------------------------------------------

CREATE TABLE footer_config (
  id SERIAL PRIMARY KEY,
  "companyName" VARCHAR(255) NOT NULL DEFAULT 'BPS Kepulauan Seribu',
  "companyAddress" JSONB DEFAULT NULL,
  contacts JSONB DEFAULT NULL,
  links JSONB DEFAULT NULL,
  logo VARCHAR(500) NOT NULL DEFAULT 'uploads/footer/logo.png',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO footer_config (id, "companyName", "companyAddress", contacts, links, logo, "createdAt", "updatedAt") VALUES
(1, 'BPS Kepulauan Seribu', '["Jl. Ikan Betok Putih Rt. 004 Rw. 05 Pulau Pramuka Kecamatan Kepulauan Seribu Utara 14530", "Jl. Cempaka Putih Tengah XIV Rt. 008 Rw. 05 No. 10B Kelurahan Cempaka Putih Timur, Kecamatan Cempaka Putih, Jakarta Pusat 10510"]', '[{"label": "Telepon", "value": "+62-21-XXXXXX"}, {"label": "Email", "value": "bps.3101@gmail.com"}]', '[{"url": "https://kepulauanseribukab.bps.go.id/", "label": "Website"}]', 'uploads/footer/1787719167764-logo-bps.png', '2026-08-26 04:38:48', '2026-08-26 08:27:59');

SELECT setval('footer_config_id_seq', (SELECT MAX(id) FROM footer_config));

-- --------------------------------------------------------
-- Table: headers
-- --------------------------------------------------------

CREATE TABLE headers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'PULAU PEDIA',
  subtitle VARCHAR(500) NOT NULL DEFAULT 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
  "backgroundImage" VARCHAR(500) NOT NULL DEFAULT 'uploads/headers/default.jpg',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO headers (id, title, subtitle, "backgroundImage", "createdAt", "updatedAt") VALUES
(1, 'PULAU PEDIA', 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu', 'uploads/headers/1787041408800-PulauYuKepulauanSeribuProvinsiDKIJakarta.jpg', '2026-08-18 01:55:38', '2026-08-26 08:26:22');

SELECT setval('headers_id_seq', (SELECT MAX(id) FROM headers));

-- --------------------------------------------------------
-- Table: main_portals
-- --------------------------------------------------------

CREATE TABLE main_portals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  icon VARCHAR(50) NOT NULL,
  href VARCHAR(255) NOT NULL,
  "sortOrder" INT NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO main_portals (id, name, description, icon, href, "sortOrder", "isActive", "createdAt", "updatedAt") VALUES
(1, 'Portal Umum', 'Informasi umum dan layanan publik', 'BookOpen', '/portal-umum', 1, TRUE, '2026-08-24 04:25:10', '2026-08-26 03:47:39'),
(2, 'Brankas Fungsi', 'Dokumen dan arsip fungsi', 'Archive', '/brankas-fungsi', 3, TRUE, '2026-08-24 04:25:10', '2026-08-24 08:16:07'),
(3, 'Dokumentasi Kegiatan', 'Rekam jejak kegiatan kantor', 'FileText', '/dokumentasi-kegiatan', 3, TRUE, '2026-08-24 04:25:10', '2026-08-24 04:25:10'),
(4, 'SE2026 Archive Hub', 'Arsip surat edaran 2026', 'Package', 'https://www.google.com/url?q=https%3A%2F%2Flicense365bps-my.sharepoint.com%2F%3Af%3A%2Fg%2Fpersonal%2Falfo_license365bps_onmicrosoft_com%2FIgAL1AaIlVlGS5wz3xXY33VLAXrAOVy9ASRDrL4cw65cKxo%3Fe%3DlpYtoy&sa=D&sntz=1&usg=AOvVaw22l6QAhYJS5ymbJVeVYJcY', 4, TRUE, '2026-08-24 04:25:10', '2026-08-26 08:01:16'),
(7, 'SAKIP 2026', 'Sistem Akuntabilitas Kinerja', 'BarChart3', '/sakip-2026', 7, TRUE, '2026-08-24 04:25:10', '2026-09-03 07:25:52'),
(8, 'ZI 2026', 'Zona Integritas', 'Award', '/zi-2026', 2, TRUE, '2026-08-24 04:25:10', '2026-08-24 08:15:58'),
(9, 'Arsiparis', 'arsip dokumen', 'Archive', '/arsiparis', 8, TRUE, '2026-08-31 02:57:39', '2026-08-31 02:59:42');

SELECT setval('main_portals_id_seq', (SELECT MAX(id) FROM main_portals));

-- --------------------------------------------------------
-- Table: navbar_config
-- --------------------------------------------------------

CREATE TABLE navbar_config (
  id SERIAL PRIMARY KEY,
  logo VARCHAR(500) NOT NULL DEFAULT 'uploads/navbar/logo.png',
  "logoAlt" VARCHAR(100) NOT NULL DEFAULT 'Pulau Pedia Logo',
  "brandName" VARCHAR(255) NOT NULL DEFAULT 'PULAU PEDIA',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO navbar_config (id, logo, "logoAlt", "brandName", "createdAt", "updatedAt") VALUES
(1, 'uploads/navbar/1787560503434-logo-bps.png', 'Pulau Pedia Logo', 'KABUPATEN KEPULAUAN SERIBU', '2026-08-18 02:38:41', '2026-08-26 03:55:55');

SELECT setval('navbar_config_id_seq', (SELECT MAX(id) FROM navbar_config));

-- --------------------------------------------------------
-- Table: portal_items
-- --------------------------------------------------------

CREATE TABLE portal_items (
  id SERIAL PRIMARY KEY,
  "portalId" INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  icon VARCHAR(50) NOT NULL,
  link VARCHAR(255) NOT NULL,
  documents JSONB DEFAULT NULL,
  "sortOrder" INT NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT portal_items_portalId_fkey FOREIGN KEY ("portalId") REFERENCES main_portals(id) ON DELETE CASCADE
);

INSERT INTO portal_items (id, "portalId", name, description, icon, link, documents, "sortOrder", "isActive", "createdAt", "updatedAt") VALUES
(1, 1, 'Bigram', 'Bimbingan dan Pengawasan Umum', 'FileSpreadsheet', '/portal-umum/bigram', '[{"link": "https://docs.google.com/spreadsheets/d/1M6rp9hU0CUowVN363sD_zlN_oy1R3JDjC3pEXkwiHOA/edit?usp=sharing", "title": "KK RPD, Revisi dan Matriks Mitra 2025"}, {"link": "https://drive.google.com/drive/folders/1QXFRoIYq4RKRFwonJ99fQuSgURJupK3X", "title": "DIPA dan POK"}, {"link": "https://e-monev.bappenas.go.id/portal/", "title": "E-Monev Bappenas"}, {"link": "https://monev.kemenkeu.go.id/", "title": "Monitoring Evaluasi Kemenkeu"}, {"link": "https://shbj.bps.go.id/masterplan/", "title": "Masterplan"}]', 1, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(2, 1, 'Keuangan', 'Dokumen dan arsip keuangan', 'DollarSign', '/portal-umum/keuangan', '[{"link": "https://docs.google.com/document/d/13iIYdPxVliFH4QpkSZzBklj6fVfSWT0vIfyuPUgYdSg/edit?usp=drive_link", "title": "Kelengkapan Pengajuan Anggaran TA2025"}, {"link": "https://drive.google.com/drive/folders/1XWtoIsFJ71RjWIyEq0bDEPgRcqZigNp1?usp=sharing", "title": "SK"}, {"link": "https://drive.google.com/drive/folders/1ywN3EKvIrD_0WNGZhpWCfb9yD9dOL4Xx?usp=sharing", "title": "KAK"}, {"link": "https://drive.google.com/drive/folders/1mXhUitreD4IkCEJyJYmmM7qqKCM4_J8z?usp=sharing", "title": "Form Permintaan"}, {"link": "https://docs.google.com/document/d/1aFuAOrguDtiIQTyYUQvxUiNiXjuWhC-4/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true", "title": "Kop Surat"}, {"link": "https://docs.google.com/document/d/1lj_S3IWI_XbzKzY6_iij1Ux9Qy1GpquS/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true", "title": "Draft Notula"}, {"link": "https://sites.google.com/view/bimbingan-sai", "title": "Juknis Akuntansi Laporan Keuangan"}]', 2, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(3, 1, 'BMN & Persediaan', 'Barang Milik Negara dan Persediaan', 'Package', '/portal-umum/bmn-persediaan', '[{"link": "https://docs.google.com/spreadsheets/d/1SCAEUF2GU7e4x6TIUaJoAzt5ST7qobU06iMzhoRKCCc/edit?usp=sharing", "title": "Identifikasi Kebutuhan ATK 2026"}, {"link": "https://drive.google.com/file/d/1Nalxe48cjtSiBpt26-kI06wi4yyIA0LK/view?usp=sharing", "title": "Lampiran KMK"}, {"link": "https://drive.google.com/file/d/1SDleCEbGFKn1jT_Kz6ngu-9Zb_72PdD0/view?usp=drive_link", "title": "Penetapan Status Penggunaan BMN Bangunan dan Selain Tanah dan-atau Bangunan pada BPS"}, {"link": "https://drive.google.com/file/d/19uOGbjq1NKQQsBuArWzLsNgHKm3aYutF/view?usp=drive_link", "title": "PSP Kendaraan Operasional Roda 4 dan 2_2012"}, {"link": "https://drive.google.com/file/d/1_hTwRvEEfqzIheHkoj8q40JjABcLQvFp/view?usp=drive_link", "title": "PSP Pulau Seribu 2024"}, {"link": "https://drive.google.com/file/d/1DxuAJ0Q5rSSqhNP2kr5W0D6AW4tv2Poq/view?usp=drive_link", "title": "SK PSP No. 338 Tgl.28 Mei''24 di Wilayah Provinsi DKI Jakarta"}]', 3, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(4, 1, 'SAKIP', 'Sistem Akuntabilitas Kinerja Instansi Pemerintah', 'BarChart3', '/portal-umum/sakip', '[{"link": "https://s.bps.go.id/Dokumen-SAKIP2024", "title": "SAKIP 2024"}, {"link": "https://drive.bps.go.id/s/WG5br3FbGjnd3nn", "title": "SAKIP 2025"}]', 4, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(5, 1, 'HUMAS', 'Hubungan Masyarakat dan Komunikasi', 'Megaphone', '/portal-umum/humas', '[{"link": "https://www.instagram.com/bpskabupatenkepulauanseribu/", "title": "Instagram"}, {"link": "https://www.youtube.com/@bpskepulauanseribu4158", "title": "YouTube"}, {"link": "https://drive.google.com/drive/folders/1KZCMDx_xr683WppTxLfa4usJpVYTMpgO?usp=sharing", "title": "Foto Kegiatan Tahun 2024"}, {"link": "https://drive.google.com/drive/folders/1B58_QpN4CInHyeH6hPxoUtprBIVklBph?usp=sharing", "title": "Foto Kegiatan Tahun 2025"}]', 5, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(6, 1, 'Zona Integritas', 'Dokumen dan arsip Zona Integritas', 'Award', '/portal-umum/zona-integritas', '[{"link": "https://drive.google.com/drive/folders/pengungkit-pemenuhan", "title": "A.I. Pengungkit - Pemenuhan"}, {"link": "https://drive.google.com/drive/folders/pengungkit-reform", "title": "A.II. Pengungkit - Reform"}, {"link": "https://drive.google.com/drive/folders/hasil", "title": "B. Hasil"}, {"link": "https://heylink.me/ZI_P1000_2025/", "title": "ZI 2024"}]', 6, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(7, 1, 'Pengadaan Barang & Jasa', 'Dokumen pengadaan barang dan jasa', 'ShoppingCart', '/portal-umum/pengadaan', '[{"link": "https://drive.google.com/drive/folders/14fZrahleLeoCrfDQKKLsY-gbnUbPmdNo?usp=drive_link", "title": "Pelatihan Sakernas Agustus 2024"}, {"link": "https://drive.google.com/drive/folders/1ZrYEmhYJPfJu5bUzimOpB8LnMBAU-jr2?usp=drive_link", "title": "Pengadaan Jasa Keamanan dan Kebersihan 2024"}]', 7, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(8, 1, 'Kepegawaian', 'Dokumen dan arsip kepegawaian', 'Users', '/portal-umum/kepegawaian', '[{"link": "https://docs.google.com/spreadsheets/d/1ka8xRpj1eTGDaO-9DRwMQ0u3WIi2ieDTYRdAAdRtDXg/edit?pli=1&gid=0#gid=0", "title": "Nomor Surat dan Nomor SK"}, {"link": "https://docs.google.com/spreadsheets/d/1GSxAsD7MxE0iMBKMDzDlHQUA5hObz7XR1THVQhAAayE/edit?usp=sharing", "title": "Rekap Perjalanan Dinas"}, {"link": "https://drive.google.com/drive/folders/11h_2tkHKrkMxzfabOsbr6-hXFERvgp6x?usp=sharing", "title": "Laporan FWA Pegawai 24-27 Maret 25"}, {"link": "https://drive.google.com/drive/folders/1RkF3WYZNNMXHQ81yB4W_1mKMSsOzbysU?usp=sharing", "title": "Aturan Kepegawaian"}, {"link": "http://s.bps.go.id/PAK_Pegawai", "title": "Penetapan Angka Kredit (PAK)"}]', 8, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(9, 8, 'Bukti Dukung Pemenuhan', 'Bukti Dukung ZI 2026 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-pemenuhan', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 1, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(10, 8, 'Bukti Dukung Reform', 'Bukti Dukung ZI 2026 (Reform)', 'FileText', '/zi-2026/bukti-dukung-reform', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 2, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(11, 8, 'LKE ZI 2026', 'Laporan Ketaatan Etika ZI 2026', 'FileText', '/zi-2026/lke-zi-2026', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS Kepulauan Seribu 2026"}]', 3, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(12, 8, 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-jakarta-timur-2025-pemenuhan', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 4, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(13, 8, 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)', 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)', 'FileText', '/zi-2026/bukti-dukung-jakarta-timur-2025-reform', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 5, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(14, 8, 'LKE ZI BPS Kota Jakarta Timur 2025', 'LKE ZI BPS Kota Jakarta Timur 2025', 'FileText', '/zi-2026/lke-jakarta-timur-2025', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS Kota Jakarta Timur 2025"}]', 6, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(15, 8, 'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)', 'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)', 'FileText', '/zi-2026/zi-rb-bps-ri-2024-pemenuhan', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 7, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(16, 8, 'Bukti Dukung ZI RB BPS RI 2024 (Reform)', 'Bukti Dukung ZI RB BPS RI 2024 (Reform)', 'FileText', '/zi-2026/zi-rb-bps-ri-2024-reform', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 8, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(17, 8, 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-bps-dki-2025-pemenuhan', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 9, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(18, 8, 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)', 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)', 'FileText', '/zi-2026/bukti-dukung-bps-dki-2025-reform', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 10, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(19, 8, 'LKE ZI BPS DKI Jakarta 2025', 'LKE ZI BPS DKI Jakarta 2025', 'FileText', '/zi-2026/lke-bps-dki-jakarta-2025', '[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS DKI Jakarta 2025"}]', 11, TRUE, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(20, 2, 'Sosial', 'Dokumen dan arsip fungsi sosial', 'Users', 'https://drive.google.com/drive/folders/sosial', '[]', 1, TRUE, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(21, 2, 'Distribusi', 'Dokumen dan arsip fungsi distribusi', 'TrendingUp', 'https://drive.google.com/drive/folders/distribusi', '[]', 2, TRUE, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(22, 2, 'Produksi', 'Dokumen dan arsip fungsi produksi', 'Package', 'https://drive.google.com/drive/folders/produksi', '[]', 3, TRUE, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(23, 2, 'Nerwilis', 'Dokumen dan arsip neraca wilayah', 'FileText', 'https://drive.google.com/drive/folders/nerwilis', '[]', 4, TRUE, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(24, 2, 'IPDS', 'Dokumen dan arsip IPDS', 'BarChart3', 'https://drive.google.com/drive/folders/ipds', '[]', 5, TRUE, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(25, 3, 'Kegiatan 2024', 'Dokumentasi kegiatan tahun 2024', 'Calendar', 'https://drive.google.com/drive/folders/kegiatan-2024', '[]', 1, TRUE, '2026-08-24 08:13:59', '2026-08-24 08:13:59'),
(26, 3, 'Kegiatan 2025', 'Dokumentasi kegiatan tahun 2025', 'Calendar', 'https://drive.google.com/drive/folders/kegiatan-2025', '[]', 2, TRUE, '2026-08-24 08:13:59', '2026-08-24 08:13:59'),
(27, 3, 'Kegiatan 2026', 'Dokumentasi kegiatan tahun 2026', 'Calendar', '/dokumentasi-kegiatan/kegiatan-2026', '[{"link": "https://drive.google.com/drive/folders/1toEz5kkn5cwXJdBWmBDzXCtO3ftaEZft?usp=sharing", "title": "Januari"}, {"link": "https://drive.google.com/drive/folders/1AsUpP-6FtYUNDZXgD9bfEa4vhtAwtX4_?usp=sharing", "title": "Februari"}]', 3, TRUE, '2026-08-24 08:13:59', '2026-08-26 07:47:27'),
(33, 8, 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)', 'FileSpreadsheet', '/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-pemenuhan', '[{"link": "https://drive.google.com/drive/folders/1-KnkPHqOKIwlW8XbwlqajMscPuGJ-ojH", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/1_vnF6__NaoRAl_sfEGFEOCLZEl9LFEZR", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/1kHX1SeJvWs-_Nf8hAhm9VKb1EL-qhVuT", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/15z1y4zSvKY77WNkckTZf2UYCLd92KmoM", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/1UUaPIWW2Q8WMqAVsAWKawpaMFccXvpFn", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/1y8EouelLpVECtMlgcs58kyEaunsWDLxF", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 0, TRUE, '2026-08-26 06:25:03', '2026-08-26 07:40:08'),
(34, 8, 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)', 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)', 'FileSpreadsheet', '/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-reform', '[{"link": "https://drive.google.com/drive/folders/122WEZFNT4sTb1YCMv1G9ca2Gz-4bSINP", "title": "Pilar 1. MANAJEMEN PERUBAHAN "}, {"link": "https://drive.google.com/drive/folders/1rPP5sI7wutHcGcTllED14_9FnHXlyRoQ", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/14mTRoqGBkcFvPIgZMUAykxS8QMUgd3ZL", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/18N76IhkIKsT4mDs4QcgCPwmL3BUQFlTK", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/1Y3d2TkMgLWIfgwkz2bW1J7X1jHspsUhc", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/1AHaAWp2uxZ6MD2zjUyMNUBOI882x1inN", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]', 0, TRUE, '2026-08-26 07:41:38', '2026-08-26 07:41:38'),
(35, 8, 'LKE ZI BPS Kepulauan Seribu 2025', 'LKE ZI BPS Kepulauan Seribu 2025', 'FileSpreadsheet', '/zi-2026/lke-zi-bps-kepulauan-seribu-2025', '[{"link": "https://docs.google.com/spreadsheets/d/1qx-uiW9O80zx6hdM0m8htUI6Bg25r2Ef/edit?gid=2022470203#gid=2022470203", "title": "LKE 2025 BPS Kepulauan Seribu 2025"}]', 0, TRUE, '2026-08-26 07:42:59', '2026-08-26 07:42:59'),
(36, 9, 'Arsip Keuangan', 'ada', 'FileSpreadsheet', '/arsiparis/arsip-keuangan', '[]', 0, TRUE, '2026-08-31 03:01:52', '2026-08-31 03:01:52'),
(37, 7, 'SAKIP 2026', 'ASJKDAS', 'FileSpreadsheet', '/sakip-2026/sakip-2026', '[]', 0, TRUE, '2026-09-03 07:26:18', '2026-09-03 07:26:18');

SELECT setval('portal_items_id_seq', (SELECT MAX(id) FROM portal_items));

-- --------------------------------------------------------
-- Table: services
-- --------------------------------------------------------

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(500) NOT NULL,
  link VARCHAR(500) NOT NULL,
  "sortOrder" INT NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  type VARCHAR(50) DEFAULT 'service',
  description TEXT DEFAULT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (id, title, name, logo, link, "sortOrder", "isActive", type, description, "createdAt", "updatedAt") VALUES
(13, 'BPS Services Web-App', 'Header', 'N/A', 'N/A', 0, TRUE, 'header', 'Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu', '2026-08-18 07:18:06', '2026-08-18 07:18:12'),
(16, 'Sistem Informasi Layanan Statistik', 'SILASTIK', 'uploads/services/1787038248252-silastik.png', 'https://silastik.bps.go.id/v3/index.php/site/login/', 0, TRUE, 'service', NULL, '2026-08-18 07:30:48', '2026-08-18 07:30:48'),
(17, 'Rekomendasi Kegiatan Statistik Online', 'ROMANTIK', 'uploads/services/1787038272212-romantik.png', 'https://romantik.web.bps.go.id/', 0, TRUE, 'service', NULL, '2026-08-18 07:31:13', '2026-08-18 07:31:13');

SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));

-- --------------------------------------------------------
-- Table: users
-- --------------------------------------------------------

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'admin' CHECK (role IN ('admin', 'user')),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, password, name, role, "createdAt", "updatedAt") VALUES
(1, 'admin', '$2b$10$YYJ1pRgQjfC.Ixc9cvjP8OBaI9aMZ2t1EMJyk/oIQjozy.WOQw/yC', 'Administrator', 'admin', '2026-08-26 08:11:00', '2026-08-26 08:13:52');

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
