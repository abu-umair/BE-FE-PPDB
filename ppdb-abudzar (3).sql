-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2024 at 03:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppdb-abudzar`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_02_24_042516_add_roles_field_to_users_table', 2),
(6, '2023_02_24_042834_add_roless_field_to_users_table', 3),
(7, '2023_03_16_135836_add_address_field_to_users_table', 4),
(8, '2023_03_17_055725_create_permission_tables', 5),
(9, '2023_04_13_041307_create_jobs_table', 6),
(10, '2023_07_30_014650_create_story_libraries_table', 7),
(11, '2023_07_30_023429_add_address_field_to_story_libraries_table', 8),
(12, '2023_07_30_023919_create_evaluasi_stories_table', 9),
(13, '2023_07_30_033209_create_sotry_urls_table', 10),
(14, '2023_07_30_033540_create_url_stories_table', 11),
(15, '2023_08_04_131930_create_word_libraries_table', 12),
(16, '2023_08_04_133254_create_evaluasi_words_table', 13),
(17, '2023_08_04_142522_create_evaluasi_audio_words_table', 13),
(18, '2023_08_04_142801_create_option_evaluasi_words_table', 13),
(19, '2023_08_19_151703_add_spesialisasi_field_to_users_table', 14),
(20, '2023_11_09_192710_add_card_id_field_to_users_table', 14),
(21, '2023_11_09_193708_add_start_date_field_to_transactions_table', 15),
(22, '2023_11_09_193720_add_period_field_to_products_table', 16),
(23, '2023_11_26_013746_create_chats_table', 17),
(24, '2023_11_26_014621_add_unique_field_to_chats_table', 18),
(25, '2023_12_17_202300_create_purchase_cards_table', 19),
(26, '2023_12_17_203312_create_purchase_cards_table', 20),
(27, '2024_01_01_133618_add_products_id_field_to_purchase_cards_table', 21),
(28, '2024_01_01_140540_add_card_code_field_to_purchase_cards_table', 22),
(29, '2024_01_03_034406_create_activities_table', 23),
(30, '2024_01_06_041703_add_type_field_to_products_table', 24),
(31, '2024_01_06_063207_add_type_field_to_products_table', 25),
(32, '2024_05_07_011107_add_nik_ayah_field_to_users_table', 26),
(33, '2024_05_07_013125_add_nik_ayah_field_to_users_table', 27),
(34, '2024_05_07_013251_create_students_table', 28),
(35, '2024_05_10_015237_add_name_field_to_students_table', 29);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(100) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` varchar(100) NOT NULL,
  `datas` varchar(100) DEFAULT NULL,
  `from` varchar(100) DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `merchants_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `datas`, `from`, `read_at`, `merchants_id`, `created_at`, `updated_at`) VALUES
(9, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '33', 'New user ', 'Muni', '2023-03-29 00:59:08', NULL, '2023-03-28 21:22:43', '2023-03-29 00:59:08'),
(10, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '34', 'New user ', 'Jabal', '2023-03-29 00:55:33', NULL, '2023-03-28 21:24:21', '2023-03-29 00:55:33'),
(11, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '35', 'New user ', 'Chelsea', '2023-03-29 00:50:29', NULL, '2023-03-28 21:26:20', '2023-03-29 00:50:29'),
(12, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '36', 'New user ', 'Mursinin', '2023-03-29 00:49:21', NULL, '2023-03-28 21:26:57', '2023-03-29 00:49:21'),
(13, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '37', 'New user ', 'Endra', '2023-03-29 01:03:35', NULL, '2023-03-28 21:42:15', '2023-03-29 01:03:35'),
(14, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '38', 'New user ', 'Imam', '2023-03-29 01:02:38', NULL, '2023-03-28 23:32:37', '2023-03-29 01:02:38'),
(15, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '39', 'New user ', 'Anastasia', '2023-03-29 01:02:38', NULL, '2023-03-28 23:33:43', '2023-03-29 01:02:38'),
(16, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '40', 'New user ', 'Syahrini', '2023-04-10 22:57:10', NULL, '2023-04-10 22:57:06', '2023-04-10 22:57:10'),
(17, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '41', 'New user ', 'Kuncara', '2023-04-12 18:52:49', NULL, '2023-04-10 23:15:05', '2023-04-12 18:52:49'),
(18, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '42', 'New user ', 'Luis', '2023-04-23 20:19:47', NULL, '2023-04-12 18:53:02', '2023-04-23 20:19:47'),
(19, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '43', 'New user ', 'Halima', '2023-04-23 20:19:47', NULL, '2023-04-23 20:18:26', '2023-04-23 20:19:47'),
(20, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '44', 'New user ', 'Cagak', '2023-04-23 20:19:47', NULL, '2023-04-23 20:18:47', '2023-04-23 20:19:47'),
(21, 'App\\Notifications\\NotificationBackend', 'App\\Models\\Teacher', '45', 'New user ', 'Nurul', NULL, NULL, '2023-04-23 20:19:59', '2023-04-23 20:19:59');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `validity` int(11) NOT NULL,
  `expired` tinyint(1) NOT NULL DEFAULT 0,
  `no_times_generated` int(11) NOT NULL DEFAULT 0,
  `no_times_attempted` int(11) NOT NULL DEFAULT 0,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `identifier`, `token`, `validity`, `expired`, `no_times_generated`, `no_times_attempted`, `generated_at`, `created_at`, `updated_at`) VALUES
(153, 'kZSIBubYV9aR', '577024', 30, 0, 1, 0, '2024-01-02 02:06:30', '2024-01-01 19:06:30', '2024-01-01 19:06:30');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `no_kk` int(11) DEFAULT NULL,
  `nik_siswa` int(11) DEFAULT NULL,
  `nisn` int(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `kota_lahir` varchar(255) DEFAULT NULL,
  `jenis_kelamin` tinyint(1) DEFAULT NULL,
  `phone_santri` varchar(255) DEFAULT NULL,
  `asal_sekolah` varchar(255) DEFAULT NULL,
  `anak_ke` int(11) DEFAULT NULL,
  `jumlah_saudara` int(11) DEFAULT NULL,
  `tinggi_badan` int(11) DEFAULT NULL,
  `berat_badan` int(11) DEFAULT NULL,
  `status_dalam_keluarga` varchar(255) DEFAULT NULL,
  `riwayat_penyakit` varchar(255) DEFAULT NULL,
  `jenis_tempat_tinggal` varchar(255) DEFAULT NULL,
  `transportasi` varchar(255) DEFAULT NULL,
  `pas_photo` varchar(255) DEFAULT NULL,
  `akta_lahir` varchar(255) DEFAULT NULL,
  `kk` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `users_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `no_kk`, `nik_siswa`, `nisn`, `dob`, `kota_lahir`, `jenis_kelamin`, `phone_santri`, `asal_sekolah`, `anak_ke`, `jumlah_saudara`, `tinggi_badan`, `berat_badan`, `status_dalam_keluarga`, `riwayat_penyakit`, `jenis_tempat_tinggal`, `transportasi`, `pas_photo`, `akta_lahir`, `kk`, `created_at`, `updated_at`, `users_id`, `name`) VALUES
(5, 928203, 928203, 39203, NULL, 'Tangsel', 0, '089611985273', 'Bina sarana', 3, 4, 173, 63, 'anak3', 'mual', 'Rumah', 'Kereta', 'assets/gallery/sYW7uFbCef6N0TAE0VIz7EopNwYJ8luyFs8RuTrc.jpg', 'assets/gallery/ubne8iiettGURHCc93XbVjwMQYSKFblLW7U0GZzw.jpg', 'assets/gallery/rFiEHHHFMbHJIlSQnZbDqbfJOgIYHacHSzNJ07pK.jpg', '2024-05-09 18:54:29', '2024-05-09 19:08:40', 243, 'Albar'),
(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-09 19:27:55', '2024-05-09 19:27:55', 246, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-09 19:28:49', '2024-05-09 19:28:49', 247, NULL),
(11, 93244, 43254, 3433, '2024-05-06', 'Jakarta Selatan', 0, '535435', 'Bina utama', 2, 3, 170, 49, 'Ruko', 'ngantuk', 'Apartement', 'Motor', 'assets/gallery/Leogokmm0Y8LXPLvvVQMMxG12ZoZLbk03S05R91X.jpg', 'assets/gallery/LGzc8hd6ctkTne9PsTvHXWAc6AuyN3F0YkGaRIFz.jpg', 'assets/gallery/tYf8XVvysH8qc9kCo1JKsZL2mGn89Va1Lc2AiJhF.png', '2024-05-09 19:29:14', '2024-05-16 00:45:04', 248, 'Wals'),
(12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:15:41', '2024-05-16 18:15:41', 249, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:19:38', '2024-05-16 18:19:38', 250, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:20:20', '2024-05-16 18:20:20', 251, NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:21:33', '2024-05-16 18:21:33', 252, NULL),
(16, 9809879, 987897687, 98786, NULL, 'Bogorr', 0, '9887766769', 'Bina Saranaa', 5, 2, 170, 70, 'anak', 'Maghi', 'Apartement', 'Mobil', 'assets/gallery/3dxsmlWydKrN4tThXAfS9kPWuZZ6nGkN96gNjt5m.jpg', 'assets/gallery/CcrrRcGm9bjNqpwHTRt2KcUmxLeRgoxTCcghFKpz.jpg', 'assets/gallery/Jm967Y6sZlMsex2dpvuezmsNXl3NhbT7hL9LTwUu.jpg', '2024-05-16 18:30:25', '2024-05-16 18:39:01', 253, 'Ahmad Santosa');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` text DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'USER',
  `address` longtext DEFAULT NULL,
  `long` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `nik_ayah` int(11) DEFAULT NULL,
  `pekerjaan_ayah` varchar(255) DEFAULT NULL,
  `dob_ayah` date DEFAULT NULL,
  `kota_lahir_ayah` varchar(255) DEFAULT NULL,
  `penghasilan_ayah` varchar(255) DEFAULT NULL,
  `phone_ayah` varchar(255) DEFAULT NULL,
  `name_ibu` varchar(255) DEFAULT NULL,
  `nik_ibu` int(11) DEFAULT NULL,
  `pekerjaan_ibu` varchar(255) DEFAULT NULL,
  `dob_ibu` date DEFAULT NULL,
  `kota_lahir_ibu` varchar(255) DEFAULT NULL,
  `penghasilan_ibu` varchar(255) DEFAULT NULL,
  `phone_ibu` varchar(255) DEFAULT NULL,
  `kelurahan` varchar(255) DEFAULT NULL,
  `kecamatan` varchar(255) DEFAULT NULL,
  `kabupaten_kota` varchar(255) DEFAULT NULL,
  `provinsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `roles`, `address`, `long`, `lat`, `zip_code`, `nik_ayah`, `pekerjaan_ayah`, `dob_ayah`, `kota_lahir_ayah`, `penghasilan_ayah`, `phone_ayah`, `name_ibu`, `nik_ibu`, `pekerjaan_ibu`, `dob_ibu`, `kota_lahir_ibu`, `penghasilan_ibu`, `phone_ibu`, `kelurahan`, `kecamatan`, `kabupaten_kota`, `provinsi`) VALUES
(203, 'assets/gallery/fuQbX68O8DzzmOWNZHJeOnfLOnZ560wsxwVXMWoO.jpg', 'Cahyanto Prayoga', 'coba@gmail.com', NULL, '$2y$10$c2Jqn6AnpOSu1rYbHq9mRervWwroxD08696GbuRlY/uM66IWilaaW', NULL, '2023-01-01 20:25:03', '2024-04-30 00:19:22', 'ADMIN', NULL, NULL, NULL, '75115', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(204, 'assets/gallery/bd2wtyEPxOxwhvCQCe7zp0F5EemyCAtc7ByHreSx.jpg', 'sidomunculads', 'siddoermunculiy@gmail.com', '2024-01-01 06:07:05', '$2y$10$zKoMAvyseIS9/y3cBvSr/.0VW81nsbwJkOIBx5dg/wFdCqMVS0Vpe', NULL, '2024-01-10 12:26:50', '2024-03-05 19:37:11', 'USER', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara', '45.683213', '-144.222879', '75115', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(243, 'assets/gallery/WzaAn9XLr1zPZNIhLuPfqQnrXN1CZSiAH9G79clg.jpg', 'Struick', 'struick@gmail.com', NULL, '$2y$10$ijpPudMs6/lurPza0QZdy.083Kv2BT9w7uEhJejOmZA4TriOSD442', NULL, '2024-05-09 18:03:44', '2024-05-09 18:08:26', 'USER', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara0', '45.6832130', '-144.2228790', '741150', 1234560, 'Mancing0', '1974-09-10', 'Bandung0', '2000000', '098897870', 'Balqis0', 6543210, 'rumah tangga0', '1975-09-10', 'Tangerang Selatan0', '1000', '098897870', 'mekar sari0', 'rumpin0', 'bogor0', 'jabar0'),
(245, 'assets/gallery/Af7mnn3x41F2Lol40HMEUAnd1wzvqLQJQd0ow09U.jpg', 'Jordi Amat', 'jordi@gmail.com', NULL, '$2y$10$wULLnlbEshB5mrrIlZ7O4OVDr9tE7WmGp0uczZJnLZ9KjGJ6rqUS6', NULL, '2024-05-09 19:26:08', '2024-05-09 19:26:08', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(246, NULL, 'muflih', 'muflih@gmail.com', NULL, '$2y$10$rxb.jCLohG.sa2o.OQ.tPOCSJWRAn.gCyjd2nbZnBidon1m6qU0Z.', NULL, '2024-05-09 19:27:55', '2024-05-09 19:27:55', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(247, 'assets/gallery/NccYdiRhIRwK0PAeMuygAXSSVfy0PcS2Hbzjbpsa.jpg', 'Wals', 'wals@gmail.com', NULL, '$2y$10$Mp.nZzGbRLcVFQRVsvRJCeG7d9KeXjOmvxJC58F/eLhn69XGP8202', NULL, '2024-05-09 19:28:49', '2024-05-09 19:28:49', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(248, 'assets/gallery/QeXM7cyuwpcOWs4bQ4xv30kqPnvI6Rzys5vOKz53.jpg', 'sandikah', 'sandi@gmail.com', NULL, '$2y$10$WrYQDzMjQtd9k6lBzh/4R.zjdAIRffum3Yzf7U6r0ebGI0MDpLabi', NULL, '2024-05-09 19:29:14', '2024-05-13 20:58:14', 'USER', 'aaaaar', NULL, NULL, '345356', 5454, 'sdfsdf', '2024-05-01', 'bogor', NULL, '54545454545', 'kaksdf', 3434, 'Rumah tangga', '2024-05-02', 'Padang', '> 2.000.000', '5656565555', 'sadfr', 'sadfr', 'sadfr', 'asdfr'),
(249, 'assets/gallery/lUbg1JsqV2jjgaThgc0PzOiEdpfDmpEKDfnbJwAl.png', 'ragnar', 'ragnar@gmail.com', NULL, '$2y$10$q80SSdhfEdU.kNYOk/0/6.fY1gnVCUSFGqz82WYdARQ2MaSlzFQue', NULL, '2024-05-16 18:15:41', '2024-05-16 18:15:41', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(250, 'assets/gallery/41XgYBVY3YrYs2X9mbCP8pLgjM7HoYw0c2t2BIjW.png', 'orragnar', 'orragnar@gmail.com', NULL, '$2y$10$MAjFGDCB3Krdq/VpA5QzEOcmDAqspcCaqgDi/qsoNi.5Cq79iz2aG', NULL, '2024-05-16 18:19:38', '2024-05-16 18:19:38', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(251, 'assets/gallery/gmIhrr5ulQQ1u92Dq2Dn0OFx6eH0mTf7NgHJX5ok.png', 'ragnaror', 'ragnaror@gmail.com', NULL, '$2y$10$oe2vqtwd4.dU4P9NgU9EEejHm9YzQInTdnEIEEqqkrqQqNwzlOVDG', NULL, '2024-05-16 18:20:20', '2024-05-16 18:20:20', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(252, 'assets/gallery/yqcY0bBHAHmWXlS33lxSU52qwtpufgdBwiFSjfkx.png', 'Santri baru', 'santribaru@gmail.com', NULL, '$2y$10$HqO1G/1eCXUOBPeeuvlhheX6Er6X.xc8tQX4W6QSYxmVm.oWecm/.', NULL, '2024-05-16 18:21:33', '2024-05-16 18:21:33', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(253, 'assets/gallery/o37zjfcHcd1PJtsxl669kdKb1xJbQmEj1XDcmVrA.jpg', 'Reginalds', 'reginalds@gmail.com', NULL, '$2y$10$kCYOPKtpEJ8n6WuLvr1a5eQSJdH.jG8eYhvuGSjNvn5ICO/0EizC.', NULL, '2024-05-16 18:30:25', '2024-05-16 18:36:57', 'USER', 'Komplek Southlake , rumpin', NULL, NULL, '09898798', 8787, 'Makan', '2024-05-10', 'Tangerang', '< 2.000.000', '09887675', 'Ummu', 99878767, 'Rumah Tangga', '2024-05-11', 'Padang', '> 2.000.000', '0989786765', 'sfd', 'sfdsaf', 'sadfsadf', 'asdfdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
