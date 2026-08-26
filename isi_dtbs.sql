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













INSERT INTO portal_items (portalId, name, description, icon, link, documents, sortOrder, isActive) VALUES
(
  2,
  'Sosial',
  'Dokumen dan arsip fungsi sosial',
  'Users',
  'https://drive.google.com/drive/folders/sosial',
  '[]',
  1,
  TRUE
),
(
  2,
  'Distribusi',
  'Dokumen dan arsip fungsi distribusi',
  'TrendingUp',
  'https://drive.google.com/drive/folders/distribusi',
  '[]',
  2,
  TRUE
),
(
  2,
  'Produksi',
  'Dokumen dan arsip fungsi produksi',
  'Package',
  'https://drive.google.com/drive/folders/produksi',
  '[]',
  3,
  TRUE
),
(
  2,
  'Nerwilis',
  'Dokumen dan arsip neraca wilayah',
  'FileText',
  'https://drive.google.com/drive/folders/nerwilis',
  '[]',
  4,
  TRUE
),
(
  2,
  'IPDS',
  'Dokumen dan arsip IPDS',
  'BarChart3',
  'https://drive.google.com/drive/folders/ipds',
  '[]',
  5,
  TRUE
);













INSERT INTO portal_items (portalId, name, description, icon, link, documents, sortOrder, isActive) VALUES
(
  3,
  'Kegiatan 2024',
  'Dokumentasi kegiatan tahun 2024',
  'Calendar',
  'https://drive.google.com/drive/folders/kegiatan-2024',
  '[]',
  1,
  TRUE
),
(
  3,
  'Kegiatan 2025',
  'Dokumentasi kegiatan tahun 2025',
  'Calendar',
  'https://drive.google.com/drive/folders/kegiatan-2025',
  '[]',
  2,
  TRUE
),
(
  3,
  'Kegiatan 2026',
  'Dokumentasi kegiatan tahun 2026',
  'Calendar',
  'https://drive.google.com/drive/folders/kegiatan-2026',
  '[]',
  3,
  TRUE
),
(
  3,
  'Foto Kegiatan',
  'Galeri foto dokumentasi',
  'Camera',
  'https://drive.google.com/drive/folders/foto-kegiatan',
  '[]',
  4,
  TRUE
),
(
  3,
  'Laporan',
  'Laporan kegiatan dan evaluasi',
  'FileText',
  'https://drive.google.com/drive/folders/laporan',
  '[]',
  5,
  TRUE
),
(
  3,
  'Rapat',
  'Dokumentasi rapat dan pertemuan',
  'Users',
  'https://drive.google.com/drive/folders/rapat',
  '[]',
  6,
  TRUE
),
(
  3,
  'Penghargaan',
  'Dokumentasi penghargaan',
  'Award',
  'https://drive.google.com/drive/folders/penghargaan',
  '[]',
  7,
  TRUE
),
(
  3,
  'Pelatihan',
  'Dokumentasi pelatihan pegawai',
  'BookOpen',
  'https://drive.google.com/drive/folders/pelatihan',
  '[]',
  8,
  TRUE
);











