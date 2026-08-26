-- ============================================================================
-- Database: pulau_pedia3101
-- ============================================================================

CREATE DATABASE IF NOT EXISTS pulau_pedia3101;
USE pulau_pedia3101;

-- ============================================================================
-- Table: headers
-- Untuk menyimpan konfigurasi header halaman utama
-- ============================================================================
CREATE TABLE IF NOT EXISTS headers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL DEFAULT 'PULAU PEDIA',
  subtitle VARCHAR(500) NOT NULL DEFAULT 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
  backgroundImage VARCHAR(500) NOT NULL DEFAULT 'uploads/headers/default.jpg',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO headers (id, title, subtitle, backgroundImage) VALUES
(1, 'PULAU PEDIA', 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu', 'uploads/headers/default.jpg')
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- ============================================================================
-- Table: navbar_config
-- Untuk menyimpan konfigurasi navbar
-- ============================================================================
CREATE TABLE IF NOT EXISTS navbar_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  logo VARCHAR(500) NOT NULL DEFAULT 'uploads/navbar/logo.png',
  logoAlt VARCHAR(100) NOT NULL DEFAULT 'Pulau Pedia Logo',
  brandName VARCHAR(255) NOT NULL DEFAULT 'PULAU PEDIA',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default navbar config
INSERT INTO navbar_config (id, logo, logoAlt, brandName) VALUES
(1, 'uploads/navbar/logo.png', 'Pulau Pedia Logo', 'PULAU PEDIA')
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- ============================================================================
-- Table: footer_config
-- Untuk menyimpan konfigurasi footer
-- ============================================================================
CREATE TABLE IF NOT EXISTS footer_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companyName VARCHAR(255) NOT NULL DEFAULT 'BPS Kepulauan Seribu',
  companyAddress VARCHAR(500) NOT NULL DEFAULT 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta',
  phone VARCHAR(20) NOT NULL DEFAULT '+62-21-XXXXXX',
  email VARCHAR(100) NOT NULL DEFAULT 'info@kepulauanseribu.bps.go.id',
  logo VARCHAR(500) NOT NULL DEFAULT 'uploads/footer/logo.png',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default footer config
INSERT INTO footer_config (id, companyName, companyAddress, phone, email, logo) VALUES
(1, 'BPS Kepulauan Seribu', 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta', '+62-21-XXXXXX', 'info@kepulauanseribu.bps.go.id', 'uploads/footer/logo.png')
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- ============================================================================
-- Table: services
-- Untuk menyimpan data layanan/aplikasi BPS dan header section
-- ============================================================================
CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  logo VARCHAR(500),
  link VARCHAR(500),
  sortOrder INT NOT NULL DEFAULT 0,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  type VARCHAR(50) NOT NULL DEFAULT 'service',
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert header section
INSERT INTO services (title, name, logo, link, sortOrder, isActive, type, description) VALUES
('BPS Services Web-App', 'Header', 'N/A', 'N/A', 0, TRUE, 'header', 'Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu')
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- Insert default services
INSERT INTO services (title, name, logo, link, sortOrder, isActive, type, description) VALUES
('Zona Integritas BPS', 'ZI APP', 'uploads/services/zi.png', 'https://penilaianzi.web.bps.go.id/penilaianzi/penilaian', 1, TRUE, 'service', NULL),
('Sistem Informasi Layanan Statistik', 'SILASTIK', 'uploads/services/silastik.png', 'https://silastik.bps.go.id/v3/index.php/site/login/', 2, TRUE, 'service', NULL),
('Sistem Informasi Kinerja Organisasi', 'SINERGI', 'uploads/services/sinergi.png', 'https://sinergi.web.bps.go.id/', 3, TRUE, 'service', NULL),
('Rekomendasi Kegiatan Statistik Online', 'ROMANTIK', 'uploads/services/romantik.png', 'https://romantik.web.bps.go.id/', 4, TRUE, 'service', NULL),
('General Online Job Assistant for Great Service', 'GOJAGS', 'uploads/services/gojags.png', 'https://gojags.web.bps.go.id/', 5, TRUE, 'service', NULL),
('Pelayanan Statistik Terpadu', 'PST', 'uploads/services/pst.png', 'https://pst.bps.go.id/', 6, TRUE, 'service', NULL),
('Pejabat Pengelola Informasi dan Dokumentasi', 'PPID', 'uploads/services/ppid.png', 'https://ppid.bps.go.id/?mfd=3101', 7, TRUE, 'service', NULL),
('Learning Management System', 'LMS', 'uploads/services/lms.png', 'https://lms.bps.go.id/', 8, TRUE, 'service', NULL),
('Perpustakaan BPS', 'PERPUSTAKAAN', 'uploads/services/perpus.png', 'https://perpustakaan.bps.go.id/apps/', 9, TRUE, 'service', NULL)
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- ============================================================================
-- Table: announcements
-- Untuk menyimpan data pengumuman/announcement
-- ============================================================================
CREATE TABLE IF NOT EXISTS announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- Table: main_portals
-- Untuk menyimpan portal utama (Portal Umum, Brankas Fungsi, etc)
-- ============================================================================
CREATE TABLE IF NOT EXISTS main_portals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sortOrder INT NOT NULL DEFAULT 0,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default main portals
INSERT INTO main_portals (name, description, icon, href, sortOrder, isActive) VALUES
('Portal Umum', 'Informasi umum dan layanan publik', 'BookOpen', '/portal-umum', 1, TRUE),
('Brankas Fungsi', 'Dokumen dan arsip fungsi', 'Archive', '/brankas-fungsi', 2, TRUE),
('Dokumentasi Kegiatan', 'Rekam jejak kegiatan kantor', 'FileText', '/dokumentasi-kegiatan', 3, TRUE),
('SE2026 Archive Hub', 'Arsip surat edaran 2026', 'Package', '/se2026-archive-hub', 4, TRUE),
('Aplikasi Daniel', 'Sistem aplikasi internal', 'Laptop', '/aplikasi-daniel', 5, TRUE),
('Monev Anggaran', 'Monitoring evaluasi anggaran', 'DollarSign', '/monev-anggaran', 6, TRUE),
('SAKIP 2026', 'Sistem Akuntabilitas Kinerja', 'BarChart3', '/sakip-2026', 7, TRUE),
('ZI 2026', 'Zona Integritas', 'Award', '/zi-2026', 8, TRUE)
ON DUPLICATE KEY UPDATE updatedAt = NOW();

-- ============================================================================
-- Table: portal_items
-- Untuk menyimpan sub-item untuk setiap portal
-- ============================================================================
CREATE TABLE IF NOT EXISTS portal_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  portalId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL,
  link VARCHAR(255) NOT NULL,
  documents JSON,
  sortOrder INT NOT NULL DEFAULT 0,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (portalId) REFERENCES main_portals(id) ON DELETE CASCADE
);

-- =============================================
-- CREATE TABLE portal_items
-- =============================================
CREATE TABLE IF NOT EXISTS portal_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  portalId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL,
  link VARCHAR(255) NOT NULL,
  documents JSON,
  sortOrder INT NOT NULL DEFAULT 0,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (portalId) REFERENCES main_portals(id) ON DELETE CASCADE
);

-- =============================================
-- INSERT DEFAULT PORTAL ITEMS (Portal Umum)
-- =============================================
INSERT INTO portal_items (portalId, name, description, icon, link, documents, sortOrder, isActive) VALUES
(
  1, 
  'Bigram', 
  'Bimbingan dan Pengawasan Umum', 
  'FileSpreadsheet', 
  '/portal-umum/bigram', 
  '[
    {"title":"KK RPD, Revisi dan Matriks Mitra 2025","link":"https://docs.google.com/spreadsheets/d/1M6rp9hU0CUowVN363sD_zlN_oy1R3JDjC3pEXkwiHOA/edit?usp=sharing"},
    {"title":"DIPA dan POK","link":"https://drive.google.com/drive/folders/1QXFRoIYq4RKRFwonJ99fQuSgURJupK3X"},
    {"title":"E-Monev Bappenas","link":"https://e-monev.bappenas.go.id/portal/"},
    {"title":"Monitoring Evaluasi Kemenkeu","link":"https://monev.kemenkeu.go.id/"},
    {"title":"Masterplan","link":"https://shbj.bps.go.id/masterplan/"}
  ]', 
  1, 
  TRUE
),

(
  1, 
  'Keuangan', 
  'Dokumen dan arsip keuangan', 
  'DollarSign', 
  '/portal-umum/keuangan', 
  '[
    {"title":"Kelengkapan Pengajuan Anggaran TA2025","link":"https://docs.google.com/document/d/13iIYdPxVliFH4QpkSZzBklj6fVfSWT0vIfyuPUgYdSg/edit?usp=drive_link"},
    {"title":"SK","link":"https://drive.google.com/drive/folders/1XWtoIsFJ71RjWIyEq0bDEPgRcqZigNp1?usp=sharing"},
    {"title":"KAK","link":"https://drive.google.com/drive/folders/1ywN3EKvIrD_0WNGZhpWCfb9yD9dOL4Xx?usp=sharing"},
    {"title":"Form Permintaan","link":"https://drive.google.com/drive/folders/1mXhUitreD4IkCEJyJYmmM7qqKCM4_J8z?usp=sharing"},
    {"title":"Kop Surat","link":"https://docs.google.com/document/d/1aFuAOrguDtiIQTyYUQvxUiNiXjuWhC-4/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true"},
    {"title":"Draft Notula","link":"https://docs.google.com/document/d/1lj_S3IWI_XbzKzY6_iij1Ux9Qy1GpquS/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true"},
    {"title":"Juknis Akuntansi Laporan Keuangan","link":"https://sites.google.com/view/bimbingan-sai"}
  ]', 
  2, 
  TRUE
),

(
  1, 
  'BMN & Persediaan', 
  'Barang Milik Negara dan Persediaan', 
  'Package', 
  '/portal-umum/bmn-persediaan', 
  '[
    {"title":"Identifikasi Kebutuhan ATK 2026","link":"https://docs.google.com/spreadsheets/d/1SCAEUF2GU7e4x6TIUaJoAzt5ST7qobU06iMzhoRKCCc/edit?usp=sharing"},
    {"title":"Lampiran KMK","link":"https://drive.google.com/file/d/1Nalxe48cjtSiBpt26-kI06wi4yyIA0LK/view?usp=sharing"},
    {"title":"Penetapan Status Penggunaan BMN Bangunan dan Selain Tanah dan-atau Bangunan pada BPS","link":"https://drive.google.com/file/d/1SDleCEbGFKn1jT_Kz6ngu-9Zb_72PdD0/view?usp=drive_link"},
    {"title":"PSP Kendaraan Operasional Roda 4 dan 2_2012","link":"https://drive.google.com/file/d/19uOGbjq1NKQQsBuArWzLsNgHKm3aYutF/view?usp=drive_link"},
    {"title":"PSP Pulau Seribu 2024","link":"https://drive.google.com/file/d/1_hTwRvEEfqzIheHkoj8q40JjABcLQvFp/view?usp=drive_link"},
    {"title":"SK PSP No. 338 Tgl.28 Mei''24 di Wilayah Provinsi DKI Jakarta","link":"https://drive.google.com/file/d/1DxuAJ0Q5rSSqhNP2kr5W0D6AW4tv2Poq/view?usp=drive_link"}
  ]', 
  3, 
  TRUE
),

(
  1, 
  'SAKIP', 
  'Sistem Akuntabilitas Kinerja Instansi Pemerintah', 
  'BarChart3', 
  '/portal-umum/sakip', 
  '[
    {"title":"SAKIP 2024","link":"https://s.bps.go.id/Dokumen-SAKIP2024"},
    {"title":"SAKIP 2025","link":"https://drive.bps.go.id/s/WG5br3FbGjnd3nn"}
  ]', 
  4, 
  TRUE
),

(
  1, 
  'HUMAS', 
  'Hubungan Masyarakat dan Komunikasi', 
  'Megaphone', 
  '/portal-umum/humas', 
  '[
    {"title":"Instagram","link":"https://www.instagram.com/bpskabupatenkepulauanseribu/"},
    {"title":"YouTube","link":"https://www.youtube.com/@bpskepulauanseribu4158"},
    {"title":"Foto Kegiatan Tahun 2024","link":"https://drive.google.com/drive/folders/1KZCMDx_xr683WppTxLfa4usJpVYTMpgO?usp=sharing"},
    {"title":"Foto Kegiatan Tahun 2025","link":"https://drive.google.com/drive/folders/1B58_QpN4CInHyeH6hPxoUtprBIVklBph?usp=sharing"}
  ]', 
  5, 
  TRUE
),

(
  1, 
  'Zona Integritas', 
  'Dokumen dan arsip Zona Integritas', 
  'Award', 
  '/portal-umum/zona-integritas', 
  '[
    {"title":"A.I. Pengungkit - Pemenuhan","link":"https://drive.google.com/drive/folders/pengungkit-pemenuhan"},
    {"title":"A.II. Pengungkit - Reform","link":"https://drive.google.com/drive/folders/pengungkit-reform"},
    {"title":"B. Hasil","link":"https://drive.google.com/drive/folders/hasil"},
    {"title":"ZI 2024","link":"https://heylink.me/ZI_P1000_2025/"}
  ]', 
  6, 
  TRUE
),

(
  1, 
  'Pengadaan Barang & Jasa', 
  'Dokumen pengadaan barang dan jasa', 
  'ShoppingCart', 
  '/portal-umum/pengadaan', 
  '[
    {"title":"Pelatihan Sakernas Agustus 2024","link":"https://drive.google.com/drive/folders/14fZrahleLeoCrfDQKKLsY-gbnUbPmdNo?usp=drive_link"},
    {"title":"Pengadaan Jasa Keamanan dan Kebersihan 2024","link":"https://drive.google.com/drive/folders/1ZrYEmhYJPfJu5bUzimOpB8LnMBAU-jr2?usp=drive_link"}
  ]', 
  7, 
  TRUE
),

(
  1, 
  'Kepegawaian', 
  'Dokumen dan arsip kepegawaian', 
  'Users', 
  '/portal-umum/kepegawaian', 
  '[
    {"title":"Nomor Surat dan Nomor SK","link":"https://docs.google.com/spreadsheets/d/1ka8xRpj1eTGDaO-9DRwMQ0u3WIi2ieDTYRdAAdRtDXg/edit?pli=1&gid=0#gid=0"},
    {"title":"Rekap Perjalanan Dinas","link":"https://docs.google.com/spreadsheets/d/1GSxAsD7MxE0iMBKMDzDlHQUA5hObz7XR1THVQhAAayE/edit?usp=sharing"},
    {"title":"Laporan FWA Pegawai 24-27 Maret 25","link":"https://drive.google.com/drive/folders/11h_2tkHKrkMxzfabOsbr6-hXFERvgp6x?usp=sharing"},
    {"title":"Aturan Kepegawaian","link":"https://drive.google.com/drive/folders/1RkF3WYZNNMXHQ81yB4W_1mKMSsOzbysU?usp=sharing"},
    {"title":"Penetapan Angka Kredit (PAK)","link":"http://s.bps.go.id/PAK_Pegawai"}
  ]', 
  8, 
  TRUE
)
ON DUPLICATE KEY UPDATE 
  name = VALUES(name),
  description = VALUES(description),
  icon = VALUES(icon),
  link = VALUES(link),
  documents = VALUES(documents),
  sortOrder = VALUES(sortOrder),
  isActive = VALUES(isActive),
  updatedAt = NOW();

-- ============================================================
-- PORTAL ITEMS ZI
-- portalId = 8
-- ============================================================

INSERT INTO portal_items
(portalId, name, description, icon, link, documents, sortOrder, isActive)
VALUES

-- ============================================================
-- ZI 2026 - LINK UPLOAD
-- ============================================================
(
  8,
  'Bukti Dukung Pemenuhan',
  'Bukti Dukung ZI 2026 (Pemenuhan)',
  'FileText',
  '/zi-2026/bukti-dukung-pemenuhan',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  1,
  TRUE
),

(
  8,
  'Bukti Dukung Reform',
  'Bukti Dukung ZI 2026 (Reform)',
  'FileText',
  '/zi-2026/bukti-dukung-reform',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  2,
  TRUE
),

(
  8,
  'LKE ZI 2026',
  'Laporan Ketaatan Etika ZI 2026',
  'FileText',
  '/zi-2026/lke-zi-2026',
  '[
    {"title":"LKE BPS Kepulauan Seribu 2026","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  3,
  TRUE
),

-- ============================================================
-- BPS KOTA JAKARTA TIMUR 2025
-- ============================================================
(
  8,
  'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)',
  'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)',
  'FileText',
  '/zi-2026/bukti-dukung-jakarta-timur-2025-pemenuhan',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  4,
  TRUE
),

(
  8,
  'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)',
  'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)',
  'FileText',
  '/zi-2026/bukti-dukung-jakarta-timur-2025-reform',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  5,
  TRUE
),

(
  8,
  'LKE ZI BPS Kota Jakarta Timur 2025',
  'LKE ZI BPS Kota Jakarta Timur 2025',
  'FileText',
  '/zi-2026/lke-jakarta-timur-2025',
  '[
    {"title":"LKE BPS Kota Jakarta Timur 2025","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  6,
  TRUE
),

-- ============================================================
-- ZI RB BPS RI 2024
-- ============================================================
(
  8,
  'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)',
  'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)',
  'FileText',
  '/zi-2026/zi-rb-bps-ri-2024-pemenuhan',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  7,
  TRUE
),

(
  8,
  'Bukti Dukung ZI RB BPS RI 2024 (Reform)',
  'Bukti Dukung ZI RB BPS RI 2024 (Reform)',
  'FileText',
  '/zi-2026/zi-rb-bps-ri-2024-reform',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  8,
  TRUE
),

-- ============================================================
-- BPS DKI JAKARTA 2025
-- ============================================================
(
  8,
  'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)',
  'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)',
  'FileText',
  '/zi-2026/bukti-dukung-bps-dki-2025-pemenuhan',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  9,
  TRUE
),

(
  8,
  'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)',
  'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)',
  'FileText',
  '/zi-2026/bukti-dukung-bps-dki-2025-reform',
  '[
    {"title":"Pilar 1. MANAJEMEN PERUBAHAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 2. PENATAAN TATALAKSANA","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 4. PENGUATAN AKUNTABILITAS","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 5. PENGUATAN PENGAWASAN","link":"https://drive.google.com/drive/folders/zi-2026"},
    {"title":"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  10,
  TRUE
),

(
  8,
  'LKE ZI BPS DKI Jakarta 2025',
  'LKE ZI BPS DKI Jakarta 2025',
  'FileText',
  '/zi-2026/lke-bps-dki-jakarta-2025',
  '[
    {"title":"LKE BPS DKI Jakarta 2025","link":"https://drive.google.com/drive/folders/zi-2026"}
  ]',
  11,
  TRUE
)

ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  icon = VALUES(icon),
  link = VALUES(link),
  documents = VALUES(documents),
  sortOrder = VALUES(sortOrder),
  isActive = VALUES(isActive),
  updatedAt = NOW();


-- ============================================================================
-- Selesai - Database Setup Selesai
-- ============================================================================
