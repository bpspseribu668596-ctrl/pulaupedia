-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 08, 2026 at 08:27 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pulau_pedia3101`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `image`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Juara 2', 'juara 2 lomba 17 agustusan 2026', 'uploads/announcements/1787039030769-IMG92121.jpg', 1, '2026-08-18 07:42:38', '2026-08-18 07:43:52'),
(2, 'Juara 1', 'juara 1 lomba 17 agustusan 2026', 'uploads/announcements/1787039433813-IMG9221.jpg', 1, '2026-08-18 07:50:34', '2026-08-18 07:50:34');

-- --------------------------------------------------------

--
-- Table structure for table `footer_config`
--

CREATE TABLE `footer_config` (
  `id` int NOT NULL,
  `companyName` varchar(255) NOT NULL DEFAULT 'BPS Kepulauan Seribu',
  `companyAddress` json DEFAULT NULL,
  `contacts` json DEFAULT NULL,
  `links` json DEFAULT NULL,
  `logo` varchar(500) NOT NULL DEFAULT 'uploads/footer/logo.png',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `footer_config`
--

INSERT INTO `footer_config` (`id`, `companyName`, `companyAddress`, `contacts`, `links`, `logo`, `createdAt`, `updatedAt`) VALUES
(1, 'BPS Kepulauan Seribu', '[\"Jl. Ikan Betok Putih Rt. 004 Rw. 05 Pulau Pramuka Kecamatan Kepulauan Seribu Utara 14530\", \"Jl. Cempaka Putih Tengah XIV Rt. 008 Rw. 05 No. 10B Kelurahan Cempaka Putih Timur, Kecamatan Cempaka Putih, Jakarta Pusat 10510\"]', '[{\"label\": \"Telepon\", \"value\": \"+62-21-XXXXXX\"}, {\"label\": \"Email\", \"value\": \"bps.3101@gmail.com\"}]', '[{\"url\": \"https://kepulauanseribukab.bps.go.id/\", \"label\": \"Website\"}]', 'uploads/footer/1787719167764-logo-bps.png', '2026-08-26 04:38:48', '2026-08-26 08:27:59');

-- --------------------------------------------------------

--
-- Table structure for table `headers`
--

CREATE TABLE `headers` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'PULAU PEDIA',
  `subtitle` varchar(500) NOT NULL DEFAULT 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
  `backgroundImage` varchar(500) NOT NULL DEFAULT 'uploads/headers/default.jpg',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `headers`
--

INSERT INTO `headers` (`id`, `title`, `subtitle`, `backgroundImage`, `createdAt`, `updatedAt`) VALUES
(1, 'PULAU PEDIA', 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu', 'uploads/headers/1787041408800-PulauYuKepulauanSeribuProvinsiDKIJakarta.jpg', '2026-08-18 01:55:38', '2026-08-26 08:26:22');

-- --------------------------------------------------------

--
-- Table structure for table `main_portals`
--

CREATE TABLE `main_portals` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(50) NOT NULL,
  `href` varchar(255) NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `main_portals`
--

INSERT INTO `main_portals` (`id`, `name`, `description`, `icon`, `href`, `sortOrder`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Portal Umum', 'Informasi umum dan layanan publik', 'BookOpen', '/portal-umum', 1, 1, '2026-08-24 04:25:10', '2026-08-26 03:47:39'),
(2, 'Brankas Fungsi', 'Dokumen dan arsip fungsi', 'Archive', '/brankas-fungsi', 3, 1, '2026-08-24 04:25:10', '2026-08-24 08:16:07'),
(3, 'Dokumentasi Kegiatan', 'Rekam jejak kegiatan kantor', 'FileText', '/dokumentasi-kegiatan', 3, 1, '2026-08-24 04:25:10', '2026-08-24 04:25:10'),
(4, 'SE2026 Archive Hub', 'Arsip surat edaran 2026', 'Package', 'https://www.google.com/url?q=https%3A%2F%2Flicense365bps-my.sharepoint.com%2F%3Af%3A%2Fg%2Fpersonal%2Falfo_license365bps_onmicrosoft_com%2FIgAL1AaIlVlGS5wz3xXY33VLAXrAOVy9ASRDrL4cw65cKxo%3Fe%3DlpYtoy&sa=D&sntz=1&usg=AOvVaw22l6QAhYJS5ymbJVeVYJcY', 4, 1, '2026-08-24 04:25:10', '2026-08-26 08:01:16'),
(7, 'SAKIP 2026', 'Sistem Akuntabilitas Kinerja', 'BarChart3', '/sakip-2026', 7, 1, '2026-08-24 04:25:10', '2026-09-03 07:25:52'),
(8, 'ZI 2026', 'Zona Integritas', 'Award', '/zi-2026', 2, 1, '2026-08-24 04:25:10', '2026-08-24 08:15:58'),
(9, 'Arsiparis', 'arsip dokumen', 'Archive', '/arsiparis', 8, 1, '2026-08-31 02:57:39', '2026-08-31 02:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `navbar_config`
--

CREATE TABLE `navbar_config` (
  `id` int NOT NULL,
  `logo` varchar(500) NOT NULL DEFAULT 'uploads/navbar/logo.png',
  `logoAlt` varchar(100) NOT NULL DEFAULT 'Pulau Pedia Logo',
  `brandName` varchar(255) NOT NULL DEFAULT 'PULAU PEDIA',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `navbar_config`
--

INSERT INTO `navbar_config` (`id`, `logo`, `logoAlt`, `brandName`, `createdAt`, `updatedAt`) VALUES
(1, 'uploads/navbar/1787560503434-logo-bps.png', 'Pulau Pedia Logo', 'KABUPATEN KEPULAUAN SERIBU', '2026-08-18 02:38:41', '2026-08-26 03:55:55');

-- --------------------------------------------------------

--
-- Table structure for table `portal_items`
--

CREATE TABLE `portal_items` (
  `id` int NOT NULL,
  `portalId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(50) NOT NULL,
  `link` varchar(255) NOT NULL,
  `documents` json DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `portal_items`
--

INSERT INTO `portal_items` (`id`, `portalId`, `name`, `description`, `icon`, `link`, `documents`, `sortOrder`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Bigram', 'Bimbingan dan Pengawasan Umum', 'FileSpreadsheet', '/portal-umum/bigram', '[{\"link\": \"https://docs.google.com/spreadsheets/d/1M6rp9hU0CUowVN363sD_zlN_oy1R3JDjC3pEXkwiHOA/edit?usp=sharing\", \"title\": \"KK RPD, Revisi dan Matriks Mitra 2025\"}, {\"link\": \"https://drive.google.com/drive/folders/1QXFRoIYq4RKRFwonJ99fQuSgURJupK3X\", \"title\": \"DIPA dan POK\"}, {\"link\": \"https://e-monev.bappenas.go.id/portal/\", \"title\": \"E-Monev Bappenas\"}, {\"link\": \"https://monev.kemenkeu.go.id/\", \"title\": \"Monitoring Evaluasi Kemenkeu\"}, {\"link\": \"https://shbj.bps.go.id/masterplan/\", \"title\": \"Masterplan\"}]', 1, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(2, 1, 'Keuangan', 'Dokumen dan arsip keuangan', 'DollarSign', '/portal-umum/keuangan', '[{\"link\": \"https://docs.google.com/document/d/13iIYdPxVliFH4QpkSZzBklj6fVfSWT0vIfyuPUgYdSg/edit?usp=drive_link\", \"title\": \"Kelengkapan Pengajuan Anggaran TA2025\"}, {\"link\": \"https://drive.google.com/drive/folders/1XWtoIsFJ71RjWIyEq0bDEPgRcqZigNp1?usp=sharing\", \"title\": \"SK\"}, {\"link\": \"https://drive.google.com/drive/folders/1ywN3EKvIrD_0WNGZhpWCfb9yD9dOL4Xx?usp=sharing\", \"title\": \"KAK\"}, {\"link\": \"https://drive.google.com/drive/folders/1mXhUitreD4IkCEJyJYmmM7qqKCM4_J8z?usp=sharing\", \"title\": \"Form Permintaan\"}, {\"link\": \"https://docs.google.com/document/d/1aFuAOrguDtiIQTyYUQvxUiNiXjuWhC-4/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true\", \"title\": \"Kop Surat\"}, {\"link\": \"https://docs.google.com/document/d/1lj_S3IWI_XbzKzY6_iij1Ux9Qy1GpquS/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true\", \"title\": \"Draft Notula\"}, {\"link\": \"https://sites.google.com/view/bimbingan-sai\", \"title\": \"Juknis Akuntansi Laporan Keuangan\"}]', 2, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(3, 1, 'BMN & Persediaan', 'Barang Milik Negara dan Persediaan', 'Package', '/portal-umum/bmn-persediaan', '[{\"link\": \"https://docs.google.com/spreadsheets/d/1SCAEUF2GU7e4x6TIUaJoAzt5ST7qobU06iMzhoRKCCc/edit?usp=sharing\", \"title\": \"Identifikasi Kebutuhan ATK 2026\"}, {\"link\": \"https://drive.google.com/file/d/1Nalxe48cjtSiBpt26-kI06wi4yyIA0LK/view?usp=sharing\", \"title\": \"Lampiran KMK\"}, {\"link\": \"https://drive.google.com/file/d/1SDleCEbGFKn1jT_Kz6ngu-9Zb_72PdD0/view?usp=drive_link\", \"title\": \"Penetapan Status Penggunaan BMN Bangunan dan Selain Tanah dan-atau Bangunan pada BPS\"}, {\"link\": \"https://drive.google.com/file/d/19uOGbjq1NKQQsBuArWzLsNgHKm3aYutF/view?usp=drive_link\", \"title\": \"PSP Kendaraan Operasional Roda 4 dan 2_2012\"}, {\"link\": \"https://drive.google.com/file/d/1_hTwRvEEfqzIheHkoj8q40JjABcLQvFp/view?usp=drive_link\", \"title\": \"PSP Pulau Seribu 2024\"}, {\"link\": \"https://drive.google.com/file/d/1DxuAJ0Q5rSSqhNP2kr5W0D6AW4tv2Poq/view?usp=drive_link\", \"title\": \"SK PSP No. 338 Tgl.28 Mei\'24 di Wilayah Provinsi DKI Jakarta\"}]', 3, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(4, 1, 'SAKIP', 'Sistem Akuntabilitas Kinerja Instansi Pemerintah', 'BarChart3', '/portal-umum/sakip', '[{\"link\": \"https://s.bps.go.id/Dokumen-SAKIP2024\", \"title\": \"SAKIP 2024\"}, {\"link\": \"https://drive.bps.go.id/s/WG5br3FbGjnd3nn\", \"title\": \"SAKIP 2025\"}]', 4, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(5, 1, 'HUMAS', 'Hubungan Masyarakat dan Komunikasi', 'Megaphone', '/portal-umum/humas', '[{\"link\": \"https://www.instagram.com/bpskabupatenkepulauanseribu/\", \"title\": \"Instagram\"}, {\"link\": \"https://www.youtube.com/@bpskepulauanseribu4158\", \"title\": \"YouTube\"}, {\"link\": \"https://drive.google.com/drive/folders/1KZCMDx_xr683WppTxLfa4usJpVYTMpgO?usp=sharing\", \"title\": \"Foto Kegiatan Tahun 2024\"}, {\"link\": \"https://drive.google.com/drive/folders/1B58_QpN4CInHyeH6hPxoUtprBIVklBph?usp=sharing\", \"title\": \"Foto Kegiatan Tahun 2025\"}]', 5, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(6, 1, 'Zona Integritas', 'Dokumen dan arsip Zona Integritas', 'Award', '/portal-umum/zona-integritas', '[{\"link\": \"https://drive.google.com/drive/folders/pengungkit-pemenuhan\", \"title\": \"A.I. Pengungkit - Pemenuhan\"}, {\"link\": \"https://drive.google.com/drive/folders/pengungkit-reform\", \"title\": \"A.II. Pengungkit - Reform\"}, {\"link\": \"https://drive.google.com/drive/folders/hasil\", \"title\": \"B. Hasil\"}, {\"link\": \"https://heylink.me/ZI_P1000_2025/\", \"title\": \"ZI 2024\"}]', 6, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(7, 1, 'Pengadaan Barang & Jasa', 'Dokumen pengadaan barang dan jasa', 'ShoppingCart', '/portal-umum/pengadaan', '[{\"link\": \"https://drive.google.com/drive/folders/14fZrahleLeoCrfDQKKLsY-gbnUbPmdNo?usp=drive_link\", \"title\": \"Pelatihan Sakernas Agustus 2024\"}, {\"link\": \"https://drive.google.com/drive/folders/1ZrYEmhYJPfJu5bUzimOpB8LnMBAU-jr2?usp=drive_link\", \"title\": \"Pengadaan Jasa Keamanan dan Kebersihan 2024\"}]', 7, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(8, 1, 'Kepegawaian', 'Dokumen dan arsip kepegawaian', 'Users', '/portal-umum/kepegawaian', '[{\"link\": \"https://docs.google.com/spreadsheets/d/1ka8xRpj1eTGDaO-9DRwMQ0u3WIi2ieDTYRdAAdRtDXg/edit?pli=1&gid=0#gid=0\", \"title\": \"Nomor Surat dan Nomor SK\"}, {\"link\": \"https://docs.google.com/spreadsheets/d/1GSxAsD7MxE0iMBKMDzDlHQUA5hObz7XR1THVQhAAayE/edit?usp=sharing\", \"title\": \"Rekap Perjalanan Dinas\"}, {\"link\": \"https://drive.google.com/drive/folders/11h_2tkHKrkMxzfabOsbr6-hXFERvgp6x?usp=sharing\", \"title\": \"Laporan FWA Pegawai 24-27 Maret 25\"}, {\"link\": \"https://drive.google.com/drive/folders/1RkF3WYZNNMXHQ81yB4W_1mKMSsOzbysU?usp=sharing\", \"title\": \"Aturan Kepegawaian\"}, {\"link\": \"http://s.bps.go.id/PAK_Pegawai\", \"title\": \"Penetapan Angka Kredit (PAK)\"}]', 8, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(9, 8, 'Bukti Dukung Pemenuhan', 'Bukti Dukung ZI 2026 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-pemenuhan', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 1, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(10, 8, 'Bukti Dukung Reform', 'Bukti Dukung ZI 2026 (Reform)', 'FileText', '/zi-2026/bukti-dukung-reform', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 2, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(11, 8, 'LKE ZI 2026', 'Laporan Ketaatan Etika ZI 2026', 'FileText', '/zi-2026/lke-zi-2026', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"LKE BPS Kepulauan Seribu 2026\"}]', 3, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(12, 8, 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-jakarta-timur-2025-pemenuhan', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 4, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(13, 8, 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)', 'Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)', 'FileText', '/zi-2026/bukti-dukung-jakarta-timur-2025-reform', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 5, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(14, 8, 'LKE ZI BPS Kota Jakarta Timur 2025', 'LKE ZI BPS Kota Jakarta Timur 2025', 'FileText', '/zi-2026/lke-jakarta-timur-2025', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"LKE BPS Kota Jakarta Timur 2025\"}]', 6, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(15, 8, 'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)', 'Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)', 'FileText', '/zi-2026/zi-rb-bps-ri-2024-pemenuhan', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 7, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(16, 8, 'Bukti Dukung ZI RB BPS RI 2024 (Reform)', 'Bukti Dukung ZI RB BPS RI 2024 (Reform)', 'FileText', '/zi-2026/zi-rb-bps-ri-2024-reform', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 8, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(17, 8, 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)', 'FileText', '/zi-2026/bukti-dukung-bps-dki-2025-pemenuhan', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 9, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(18, 8, 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)', 'Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)', 'FileText', '/zi-2026/bukti-dukung-bps-dki-2025-reform', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 10, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(19, 8, 'LKE ZI BPS DKI Jakarta 2025', 'LKE ZI BPS DKI Jakarta 2025', 'FileText', '/zi-2026/lke-bps-dki-jakarta-2025', '[{\"link\": \"https://drive.google.com/drive/folders/zi-2026\", \"title\": \"LKE BPS DKI Jakarta 2025\"}]', 11, 1, '2026-08-24 08:01:22', '2026-08-24 08:01:22'),
(20, 2, 'Sosial', 'Dokumen dan arsip fungsi sosial', 'Users', 'https://drive.google.com/drive/folders/sosial', '[]', 1, 1, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(21, 2, 'Distribusi', 'Dokumen dan arsip fungsi distribusi', 'TrendingUp', 'https://drive.google.com/drive/folders/distribusi', '[]', 2, 1, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(22, 2, 'Produksi', 'Dokumen dan arsip fungsi produksi', 'Package', 'https://drive.google.com/drive/folders/produksi', '[]', 3, 1, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(23, 2, 'Nerwilis', 'Dokumen dan arsip neraca wilayah', 'FileText', 'https://drive.google.com/drive/folders/nerwilis', '[]', 4, 1, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(24, 2, 'IPDS', 'Dokumen dan arsip IPDS', 'BarChart3', 'https://drive.google.com/drive/folders/ipds', '[]', 5, 1, '2026-08-24 08:08:42', '2026-08-24 08:08:42'),
(25, 3, 'Kegiatan 2024', 'Dokumentasi kegiatan tahun 2024', 'Calendar', 'https://drive.google.com/drive/folders/kegiatan-2024', '[]', 1, 1, '2026-08-24 08:13:59', '2026-08-24 08:13:59'),
(26, 3, 'Kegiatan 2025', 'Dokumentasi kegiatan tahun 2025', 'Calendar', 'https://drive.google.com/drive/folders/kegiatan-2025', '[]', 2, 1, '2026-08-24 08:13:59', '2026-08-24 08:13:59'),
(27, 3, 'Kegiatan 2026', 'Dokumentasi kegiatan tahun 2026', 'Calendar', '/dokumentasi-kegiatan/kegiatan-2026', '[{\"link\": \"https://drive.google.com/drive/folders/1toEz5kkn5cwXJdBWmBDzXCtO3ftaEZft?usp=sharing\", \"title\": \"Januari\"}, {\"link\": \"https://drive.google.com/drive/folders/1AsUpP-6FtYUNDZXgD9bfEa4vhtAwtX4_?usp=sharing\", \"title\": \"Februari\"}]', 3, 1, '2026-08-24 08:13:59', '2026-08-26 07:47:27'),
(33, 8, 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)', 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)', 'FileSpreadsheet', '/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-pemenuhan', '[{\"link\": \"https://drive.google.com/drive/folders/1-KnkPHqOKIwlW8XbwlqajMscPuGJ-ojH\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN\"}, {\"link\": \"https://drive.google.com/drive/folders/1_vnF6__NaoRAl_sfEGFEOCLZEl9LFEZR\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/1kHX1SeJvWs-_Nf8hAhm9VKb1EL-qhVuT\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/15z1y4zSvKY77WNkckTZf2UYCLd92KmoM\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/1UUaPIWW2Q8WMqAVsAWKawpaMFccXvpFn\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/1y8EouelLpVECtMlgcs58kyEaunsWDLxF\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 0, 1, '2026-08-26 06:25:03', '2026-08-26 07:40:08'),
(34, 8, 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)', 'Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)', 'FileSpreadsheet', '/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-reform', '[{\"link\": \"https://drive.google.com/drive/folders/122WEZFNT4sTb1YCMv1G9ca2Gz-4bSINP\", \"title\": \"Pilar 1. MANAJEMEN PERUBAHAN \"}, {\"link\": \"https://drive.google.com/drive/folders/1rPP5sI7wutHcGcTllED14_9FnHXlyRoQ\", \"title\": \"Pilar 2. PENATAAN TATALAKSANA\"}, {\"link\": \"https://drive.google.com/drive/folders/14mTRoqGBkcFvPIgZMUAykxS8QMUgd3ZL\", \"title\": \"Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR\"}, {\"link\": \"https://drive.google.com/drive/folders/18N76IhkIKsT4mDs4QcgCPwmL3BUQFlTK\", \"title\": \"Pilar 4. PENGUATAN AKUNTABILITAS\"}, {\"link\": \"https://drive.google.com/drive/folders/1Y3d2TkMgLWIfgwkz2bW1J7X1jHspsUhc\", \"title\": \"Pilar 5. PENGUATAN PENGAWASAN\"}, {\"link\": \"https://drive.google.com/drive/folders/1AHaAWp2uxZ6MD2zjUyMNUBOI882x1inN\", \"title\": \"Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK\"}]', 0, 1, '2026-08-26 07:41:38', '2026-08-26 07:41:38'),
(35, 8, 'LKE ZI BPS Kepulauan Seribu 2025', 'LKE ZI BPS Kepulauan Seribu 2025', 'FileSpreadsheet', '/zi-2026/lke-zi-bps-kepulauan-seribu-2025', '[{\"link\": \"https://docs.google.com/spreadsheets/d/1qx-uiW9O80zx6hdM0m8htUI6Bg25r2Ef/edit?gid=2022470203#gid=2022470203\", \"title\": \"LKE 2025 BPS Kepulauan Seribu 2025\"}]', 0, 1, '2026-08-26 07:42:59', '2026-08-26 07:42:59'),
(36, 9, 'Arsip Keuangan', 'ada', 'FileSpreadsheet', '/arsiparis/arsip-keuangan', '[]', 0, 1, '2026-08-31 03:01:52', '2026-08-31 03:01:52'),
(37, 7, 'SAKIP 2026', 'ASJKDAS', 'FileSpreadsheet', '/sakip-2026/sakip-2026', '[]', 0, 1, '2026-09-03 07:26:18', '2026-09-03 07:26:18');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(500) NOT NULL,
  `link` varchar(500) NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(50) DEFAULT 'service',
  `description` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `name`, `logo`, `link`, `sortOrder`, `isActive`, `type`, `description`, `createdAt`, `updatedAt`) VALUES
(13, 'BPS Services Web-App', 'Header', 'N/A', 'N/A', 0, 1, 'header', 'Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu', '2026-08-18 07:18:06', '2026-08-18 07:18:12'),
(16, 'Sistem Informasi Layanan Statistik', 'SILASTIK', 'uploads/services/1787038248252-silastik.png', 'https://silastik.bps.go.id/v3/index.php/site/login/', 0, 1, 'service', NULL, '2026-08-18 07:30:48', '2026-08-18 07:30:48'),
(17, 'Rekomendasi Kegiatan Statistik Online', 'ROMANTIK', 'uploads/services/1787038272212-romantik.png', 'https://romantik.web.bps.go.id/', 0, 1, 'service', NULL, '2026-08-18 07:31:13', '2026-08-18 07:31:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'admin',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$YYJ1pRgQjfC.Ixc9cvjP8OBaI9aMZ2t1EMJyk/oIQjozy.WOQw/yC', 'Administrator', 'admin', '2026-08-26 08:11:00', '2026-08-26 08:13:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_config`
--
ALTER TABLE `footer_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headers`
--
ALTER TABLE `headers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `main_portals`
--
ALTER TABLE `main_portals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navbar_config`
--
ALTER TABLE `navbar_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portal_items`
--
ALTER TABLE `portal_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portalId` (`portalId`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `footer_config`
--
ALTER TABLE `footer_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `headers`
--
ALTER TABLE `headers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `main_portals`
--
ALTER TABLE `main_portals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `navbar_config`
--
ALTER TABLE `navbar_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `portal_items`
--
ALTER TABLE `portal_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portal_items`
--
ALTER TABLE `portal_items`
  ADD CONSTRAINT `portal_items_ibfk_1` FOREIGN KEY (`portalId`) REFERENCES `main_portals` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
