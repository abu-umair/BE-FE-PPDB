-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2024 at 03:31 AM
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
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `message`, `file_path`, `created_at`, `updated_at`) VALUES
(1, '<p>test</p>', 'uploads/Nf91XX2dPXeQmWZDxwDab10ogqDXA1WY9370Enzc.png', '2024-05-30 20:27:11', '2024-05-30 20:27:11'),
(2, '<p class=\"ql-align-center\"><img src=\"data:image/png;base64,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\"></p><p class=\"ql-align-center\">Assalamualaikum warrohmatullahi wabarakatuh</p><p class=\"ql-align-center\"><br></p><p class=\"ql-align-center\">Yth Bapak/Ibu Calon Walimurid dan Walisantri Sekolah Islam Abudzar   Mengingatkan kembali bagi yang belum melengkapi pengisian formulir  diharapkan dapat melengkapi formulir sebelum berkas diserahkan ke panitia  PPDB TA 2024-2025 Bagi yang mengalami kendala dipersilahkan menghubungi  PIC Panitia PPDB Unit Masing masing .   Semoga Allah Azza Wa Jalla memudahkan semua urusan kita.   Demikian yang dapat kami sampaikan, syukron wa jaazakumullahu khayran.  Wassalamualaikum warrohmatullahi wabarakatuh</p>', NULL, '2024-05-30 20:31:36', '2024-05-30 20:31:36'),
(3, '<p>Apa kabar semua nya</p>', 'uploads/InORfmohet0fsSD5jfUFE6YY6sgYkxssgpOKFwRc.png', '2024-05-31 01:21:36', '2024-05-31 01:21:36');

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
(35, '2024_05_10_015237_add_name_field_to_students_table', 29),
(36, '2024_05_22_075601_add_status_field_to_students_table', 30),
(37, '2024_05_27_013011_create_payments_table', 31),
(38, '2024_05_29_010344_add_jenjang_field_to_students_table', 32),
(39, '2024_06_07_062956_create_xenditpayments_table', 33),
(40, '2024_06_11_073218_add_price_field_to_students_table', 34);

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
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `customer_first_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `checkout_link` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `status`, `price`, `item_name`, `customer_first_name`, `customer_email`, `checkout_link`, `created_at`, `updated_at`) VALUES
(4, '383714cf-24b4-4835-a807-4229352a8b59', 'capture', 10000, 'Pembayaran PPDB', 'Marco', 'marco@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/4685b0da-023c-4ac8-bd35-f933363eab78', '2024-05-29 19:26:11', '2024-05-30 01:05:09'),
(5, 'fd5e9c9c-45e1-4efa-a148-21710a0a3fbf', 'pending', 10000, 'Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/f7177486-337a-4cb1-b840-9a88b4d01f44', '2024-05-30 00:27:52', '2024-05-30 00:27:52'),
(6, 'e5d37366-8afe-4229-b383-381dba4a2349', 'capture', 10000, 'Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/39b8d4e6-811d-4cae-8456-429438409950', '2024-05-30 00:28:05', '2024-05-30 01:07:11'),
(7, '4c62a186-bd4e-4434-86a4-6fd35d9577ff', 'pending', 20000, 'Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/1448c7dd-3e97-4dda-a459-c0eb900c33d6', '2024-06-03 00:08:51', '2024-06-03 00:08:51'),
(8, '1de44de4-f0f4-4bde-a330-d31c08d878aa', 'pending', 540000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/ab8ddd04-fe17-4e3d-842d-29be88b7d60d', '2024-06-06 00:03:32', '2024-06-06 00:08:16'),
(9, '1a86e1f6-a4a9-4911-810f-eaf57d2f2e2f', 'pending', 550000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/4b6c68a9-2b68-4741-aa24-b487f4a774f1', '2024-06-06 00:14:59', '2024-06-06 00:14:59'),
(10, '05e946c5-d594-4a74-8151-bfae95c122ff', 'pending', 560000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/cdc26a91-d6c8-4143-a96c-5e1232af9e12', '2024-06-06 00:17:08', '2024-06-06 00:17:08'),
(11, '9d8e4de3-45a6-4a5f-bd72-0cecafd361ca', 'pending', 590000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:18:53', '2024-06-10 01:18:53'),
(12, 'c252c79e-91dd-4888-9f76-18d2eceeef2f', 'pending', 590000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:19:35', '2024-06-10 01:19:35'),
(13, '3422ee27-22c1-40c7-89c0-fd4f9f8ebc1c', 'pending', 590000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:20:05', '2024-06-10 01:20:05'),
(14, '12010953-9719-4a28-9edc-7e9d9952804d', 'pending', 590000, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:20:38', '2024-06-10 01:20:38'),
(15, '84b8395d-2def-43bc-9404-a1da117ffdbc', 'pending', 590001, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:21:37', '2024-06-10 01:21:37'),
(16, '65f362e6-fb3f-4662-b8ff-76a65db4e9e3', 'pending', 590001, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:22:03', '2024-06-10 01:22:03'),
(17, '330a67dc-2ec8-4574-b197-6ea9ca4a87ff', 'pending', 590001, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:22:09', '2024-06-10 01:22:09'),
(18, 'a5e6686c-5879-43e4-bba0-fef305e9780d', 'capture', 590001, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 01:23:29', '2024-06-10 01:24:57'),
(19, '1e997ebc-aeec-4a81-9227-a275a1944fde', 'capture', 590002, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'test', '2024-06-10 19:42:14', '2024-06-10 19:44:31'),
(20, '6146f5c4-a4cc-432c-bd8a-5d2c851c1828', 'pending', 590003, 'Test Pembayaran PPDB baru', 'Marcell', 'max@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/b4c87963-c104-42d9-bdd3-9c9a75b9d595', '2024-06-10 20:41:19', '2024-06-10 20:41:19');

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
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `biaya` int(11) DEFAULT NULL,
  `jenjang` varchar(255) DEFAULT NULL,
  `verifikasi` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `status_payment` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `customer_first_name` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `checkout_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `no_kk`, `nik_siswa`, `nisn`, `dob`, `kota_lahir`, `jenis_kelamin`, `phone_santri`, `asal_sekolah`, `anak_ke`, `jumlah_saudara`, `tinggi_badan`, `berat_badan`, `status_dalam_keluarga`, `riwayat_penyakit`, `jenis_tempat_tinggal`, `transportasi`, `pas_photo`, `akta_lahir`, `kk`, `created_at`, `updated_at`, `users_id`, `name`, `status`, `biaya`, `jenjang`, `verifikasi`, `order_id`, `status_payment`, `price`, `item_name`, `customer_first_name`, `customer_email`, `checkout_link`) VALUES
(5, 928203, 928203, 39203, NULL, 'Tangsel', 0, '089611985273', 'Bina sarana', 3, 4, 173, 63, 'anak3', 'mual', 'Rumah', 'Kereta', 'assets/gallery/sYW7uFbCef6N0TAE0VIz7EopNwYJ8luyFs8RuTrc.jpg', 'assets/gallery/ubne8iiettGURHCc93XbVjwMQYSKFblLW7U0GZzw.jpg', 'assets/gallery/rFiEHHHFMbHJIlSQnZbDqbfJOgIYHacHSzNJ07pK.jpg', '2024-05-09 18:54:29', '2024-05-09 19:08:40', 243, 'Albar', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-09 19:27:55', '2024-05-09 19:27:55', 246, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-09 19:28:49', '2024-05-09 19:28:49', 247, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 93244, 43254, 3433, '2024-05-06', 'Jakarta Selatan', 0, '535435', 'Bina utama', 2, 3, 170, 49, 'Ruko', 'ngantuk', 'Apartement', 'Motor', 'assets/gallery/Leogokmm0Y8LXPLvvVQMMxG12ZoZLbk03S05R91X.jpg', 'assets/gallery/LGzc8hd6ctkTne9PsTvHXWAc6AuyN3F0YkGaRIFz.jpg', 'assets/gallery/tYf8XVvysH8qc9kCo1JKsZL2mGn89Va1Lc2AiJhF.png', '2024-05-09 19:29:14', '2024-05-16 00:45:04', 248, 'Wals', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:15:41', '2024-05-16 18:15:41', 249, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:19:38', '2024-05-16 18:19:38', 250, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:20:20', '2024-05-16 18:20:20', 251, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-16 18:21:33', '2024-05-16 18:21:33', 252, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 9809879, 987897687, 98786, '2024-05-08', 'Bogorr', 0, '9887766769', 'Bina Saranaa', 5, 2, 170, 70, 'anak', 'Maghi', 'Apartement', 'Mobil', 'assets/gallery/3dxsmlWydKrN4tThXAfS9kPWuZZ6nGkN96gNjt5m.jpg', 'assets/gallery/CcrrRcGm9bjNqpwHTRt2KcUmxLeRgoxTCcghFKpz.jpg', 'assets/gallery/Jm967Y6sZlMsex2dpvuezmsNXl3NhbT7hL9LTwUu.jpg', '2024-05-16 18:30:25', '2024-05-16 19:00:36', 253, 'Ahmad Santosa', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 93245, 43244, 2345, '2024-05-15', 'Jakarta Selatan', 0, '097', 'Bina utama', 4, 5, 1, 12, 'anak', 'ngantuk', 'Rumah', 'Motor', 'assets/gallery/Ruz16D1ogSt7TSRTl1eV01zyMutTP2MXYwa79mpD.jpg', 'assets/gallery/mrhCF3RzAgnlh1DEmC7zsUURr12ilUeLgvYS2pMt.jpg', 'assets/gallery/BVHutXfb2cfHDaWkHo4wJvORX2Em1fqSQ410bkBe.jpg', '2024-05-16 19:38:25', '2024-05-24 01:21:13', 254, 'Walf', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'assets/gallery/Ruz16D1ogSt7TSRTl1eV01zyMutTP2MXYwa79mpD.jpg', 'assets/gallery/mrhCF3RzAgnlh1DEmC7zsUURr12ilUeLgvYS2pMt.jpg', 'assets/gallery/BVHutXfb2cfHDaWkHo4wJvORX2Em1fqSQ410bkBe.jpg', '2024-05-16 19:38:25', '2024-05-20 00:45:49', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 01:10:06', '2024-05-22 01:10:06', 255, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 01:22:28', '2024-05-22 01:22:28', 256, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 01:24:03', '2024-05-22 01:24:03', 257, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 01:58:34', '2024-05-22 01:58:34', 258, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 02:02:52', '2024-05-22 02:02:52', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 19:24:31', '2024-05-22 19:24:31', 260, NULL, 0, 1000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 19:25:01', '2024-05-22 19:25:01', 261, NULL, 0, 2000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-22 19:26:34', '2024-05-22 19:26:34', 262, NULL, 0, 1000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 9324, 111, 111111, '2024-05-23', 'Jakarta Selatan', 1, '212342134', 'Bina utama', 1, 1, 170, 2, 'anak angkat', 'ngantuk', 'Apartement', 'Motor', NULL, NULL, NULL, '2024-05-24 01:21:56', '2024-05-24 01:22:57', 264, 'sandikah', 0, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 9324, 123123, 31234, '2024-05-15', 'Jakarta Selatan', 0, '086575', 'Bina utama', 1, 3, 170, 23, 'anak', 'ngantuk', 'Apartement', 'Mobil', NULL, NULL, NULL, '2024-05-27 18:22:45', '2024-05-27 18:23:34', 265, 'Wals', 0, 2000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(36, 6584847, 23453454, 96587678, '2024-05-19', 'Bogor', 1, '096785678', 'adfggggg', 4, 7, 89, 47, 'anak angkat', 'Magh', 'Rumah', 'Motor', NULL, NULL, NULL, '2024-05-27 18:24:06', '2024-05-27 18:25:19', 266, 'Tesstttt', 0, 1000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 18:14:23', '2024-05-28 18:14:23', 267, NULL, 0, NULL, 'pondok', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 18:15:54', '2024-05-28 18:15:54', 268, NULL, 0, 1000, 'pondok', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, 980987, 3453245, 9874325, '2024-05-08', 'Bogor', 0, '980985', 'Bina Saranaa', 4, 65, 190, 82, 'anak', 'Magh', 'Rumah', 'Mobil', NULL, NULL, NULL, '2024-05-29 18:16:02', '2024-06-19 01:01:58', 269, 'Reginald Johnsone', 0, 3000, 'smp-sma', NULL, '91e997fc-a485-43ed-83ea-599ce38f5baa', 'pending', 3000, 'PPDB', 'Struick', 'marco@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/24b60a09-7340-4026-a2eb-49cb66be9b83'),
(49, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 18:16:02', '2024-05-29 18:16:02', NULL, NULL, 0, 3000, 'smp-sma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-11 00:47:53', '2024-06-12 01:20:29', 270, NULL, 0, 2000, 'sd', NULL, '633b0527-3d7f-4bff-a1d1-c98a4fb46e3a', 'capture', 2000, 'PPDB', 'Wesewes', 'wesewes@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/2af0d267-44b3-4d3e-89c4-4867e9d4ba01'),
(57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-11 00:47:53', '2024-06-12 01:12:12', 2700, NULL, 0, 2000, 'sd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(58, 93245, 2345325, 2345, '2024-06-12', 'Jakarta Selatan', 1, '65656', 'Bina utama', 3, 43, 170, 43, 'anak', 'ngantuk', 'Apartement', 'Mobil', 'assets/gallery/zi5tAn3Drn8E6opzWn3SnDPQ8kpuCOOKcE7S1jfn.jpg', 'assets/gallery/dwZP4hAItAxeh7QnC0XaiOZfIm05xjL0T4iEsW5P.jpg', 'assets/gallery/bwXxuJsqnfYZUA8MUgpfcJjDYAm3no9Zu1JDtYFt.jpg', '2024-06-12 01:48:21', '2024-06-13 01:08:07', 271, 'Wals', 0, 3000, 'smp-sma', NULL, '24f4c5c9-bc18-4093-aec0-4fed70692ddb', 'pending', 3000, 'PPDB', 'lala', 'lala@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/38bf08ac-6f9a-4daa-a5a0-adcf4188f097'),
(59, 9324, 2345, 23453245, '2024-06-05', 'Jakarta Selatan', 0, '076986', 'Bina utama', 1, 2, 170, 33, 'anak', 'ngantuk', 'Apartement', 'Mobil', 'assets/gallery/yMJ8HlJF5X7ebdsFrkKN7UzgKkLSgYFOyGsYecuM.jpg', 'assets/gallery/rCLPawYfjj312KXy4VnoqdEPOJPRHmHstiNsUqgF.jpg', 'assets/gallery/1lcnik6petlvzc6bE99NcIVpgiWfF05JGlPa35B9.jpg', '2024-06-13 01:51:46', '2024-06-13 18:11:55', 272, 'Wals', 0, 3000, 'smp-sma', NULL, 'fe038646-5114-4a69-86d5-a7f62e9c8105', 'pending', 3000, 'PPDB', 'Awal', 'awal@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/c70a8b02-fe8f-41e4-9b5e-c01e513cddea'),
(60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-19 01:03:32', '2024-06-19 01:03:32', 273, NULL, 0, 1000, 'pondok', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(61, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-19 01:46:10', '2024-06-19 01:47:29', 274, NULL, 0, 3000, 'smp-sma', NULL, 'd9b70f61-d915-443c-9042-3b04fa4206c5', 'capture', 3000, 'PPDB', 'lele afs', 'lele@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/7e627dcc-cd23-423c-b9e0-87b5fe37b0a6'),
(62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-19 18:18:27', '2024-06-19 18:21:36', 275, NULL, 0, 1000, 'pondok', NULL, '55c52c1c-f897-47e3-b2d1-316298f7add2', 'capture', 1000, 'PPDB', 'Akram Almair', 'akram@gmail.com', 'https://app.sandbox.midtrans.com/snap/v4/redirection/d17f6a8e-0f86-4fb8-ad16-832cd06df02c');

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
(253, 'assets/gallery/o37zjfcHcd1PJtsxl669kdKb1xJbQmEj1XDcmVrA.jpg', 'Reginalds', 'reginalds@gmail.com', NULL, '$2y$10$kCYOPKtpEJ8n6WuLvr1a5eQSJdH.jG8eYhvuGSjNvn5ICO/0EizC.', NULL, '2024-05-16 18:30:25', '2024-05-16 18:36:57', 'USER', 'Komplek Southlake , rumpin', NULL, NULL, '09898798', 8787, 'Makan', '2024-05-10', 'Tangerang', '< 2.000.000', '09887675', 'Ummu', 99878767, 'Rumah Tangga', '2024-05-11', 'Padang', '> 2.000.000', '0989786765', 'sfd', 'sfdsaf', 'sadfsadf', 'asdfdf'),
(254, 'assets/gallery/aNXKy8ZGCJPCshqhH3O8LJecnG06Uyf33gTM83XT.jpg', 'munawir', 'munawir@gmail.com', NULL, '$2y$10$Rt..hvBdDIl2mKeDh/vKne5Xxwg8n5Ylk/TIXOASfBNnGAlyx4gt.', NULL, '2024-05-16 19:38:25', '2024-05-20 01:00:44', 'USER', NULL, NULL, NULL, NULL, 346, 'sdfsdf', '2024-05-01', 'bogor', '< 2.000.000', '653', 'kaksdf', 34, 'Rumah tangga', '2024-05-22', 'Padang', '> 2.000.000', '3465', NULL, NULL, NULL, NULL),
(255, 'assets/gallery/MjrhZTvQlLfcRyx6uPx7ZHuYygMxyem9nr9ps6uV.jpg', 'yusuf', 'yusuf@gmail.com', NULL, '$2y$10$DNLEjJfj2sqRbuhSS.kBPu.DvJ0wz6kEF6YHEceUYsveDDQsP15JO', NULL, '2024-05-22 01:10:06', '2024-05-22 01:10:06', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(256, 'assets/gallery/8Ylx6NfzCLhbDF0WsYRGBQkUAVc6QJIOBZWuW1Qx.jpg', 'yufus', 'yufus@gmail.com', NULL, '$2y$10$PFL5JBrUoCDuIeqKo.7OGuGEvn3zk2JUokPe2kXFqtGCWCk.66XNu', NULL, '2024-05-22 01:22:28', '2024-05-22 01:22:28', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(257, 'assets/gallery/muq8xzl0lEIHk2Xfeg6qDu235VdB0oYt9MlNQ34v.jpg', 'rokida', 'rokida@gmail.com', NULL, '$2y$10$Te91rBxEYuB7oeay6ZeTfeMa/eZpoYTq1Is2EErDdGMT8CcNM8DbC', NULL, '2024-05-22 01:24:03', '2024-05-22 01:24:03', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(258, 'assets/gallery/HJkjmPTs7ukMGSDy5OphxBejBrfqC83kEwrh9oZR.jpg', 'kelinci', 'kelinci@gmail.com', NULL, '$2y$10$Z47yzvRplHxcMZrhqfYt5eLVzCYL.a1nMCndc4/a0konI4iEErsXe', NULL, '2024-05-22 01:58:33', '2024-05-22 01:58:33', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(259, 'assets/gallery/Bog18pOohY0iQoIRLZ5NDryyDuYpN214lzbo7zoD.jpg', 'sandiss', 'cobasss@gmail.com', NULL, '$2y$10$VlerIEySnwNn0dlm1yvy8O4KFcXHoEyv8VXNAzGJw/xJ1m5jDA7ZO', NULL, '2024-05-22 02:02:52', '2024-05-22 02:02:52', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(260, 'assets/gallery/H2eTypcGKoWSut0XDTr5jxa8e9HvurHPjF6SkXh8.jpg', 'Wals34', 'coba@gmail.com34', NULL, '$2y$10$WyUGTujY7I/0jUrjuPb71OQRB1rcu3peUT0Z3JG7ek3y3D3.Gv9HS', NULL, '2024-05-22 19:24:31', '2024-05-22 19:24:31', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(261, 'assets/gallery/CGxSk9gnmuQVqpJAssdENJ6jRvCecq7C77lVfFuL.jpg', 'Walf12', 'coba@gmail.com11', NULL, '$2y$10$Ce7OW3hZBTACbArG9nBbW.iDuQdOdHUbNTCeonFrCj9kZlZ4eR.by', NULL, '2024-05-22 19:25:01', '2024-05-22 19:25:01', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(262, 'assets/gallery/d1NbeKdn2wsaStZMNzsWFaYV6XF9cFEQS9fSwdVt.jpg', 'Walf23', 'coba@gmail.com23', NULL, '$2y$10$dGmuzlEyBPKpyta8BB4Ztetev/MYrSB5QMoBxxZVrOnPt1wgZ7qme', NULL, '2024-05-22 19:26:34', '2024-05-22 19:26:34', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(263, 'assets/gallery/l44jgl9t4Xm5xcWE5p6k62vhfrmOUzWrKxdo6ftu.jpg', 'admin 1', 'admin@gmail.com', NULL, '$2y$10$P07S0kP6fuGAm30sQNM4b.iRfHUo4vRVCq479YJ1S9iB0jifFZwQu', NULL, '2024-05-22 19:49:23', '2024-05-22 19:49:23', 'ADMIN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(264, 'assets/gallery/CPwMxx0eoaVsB1qHi0KPwyVmyc3zvuhzslQ3PFEJ.jpg', 'aeon', 'aeon@gmail.com', NULL, '$2y$10$1gRVAdxaog31.lBLWiYJY.gGbPGj2bErzjmh5oZfPeCqDHvU68pwS', NULL, '2024-05-24 01:21:56', '2024-05-24 01:21:56', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(265, 'assets/gallery/sHZ6A5eBC0HBJP03j7pLf4cMy9vqkQPHYzvfS4a0.jpg', 'user3', 'user3@gmail.com', NULL, '$2y$10$PNXfdyHh0fKJNJXSuETJGegTm2.JJNioI6Rts8kFfGse7mzckQHxC', NULL, '2024-05-27 18:22:45', '2024-05-27 18:22:45', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(266, 'assets/gallery/7bXmHG4U7yZ8OIZchuf37ZOlOB8uG2uaDpEfc78Y.jpg', 'user4', 'user4@gmail.com', NULL, '$2y$10$wFeBQrHg.yJguuGMoDuxyuck3QcJoESCg1hX0P5XFJPfeNnL0/OSi', NULL, '2024-05-27 18:24:06', '2024-05-27 18:24:06', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(267, 'assets/gallery/1HNUkkMTC4vG9TPUJN4rftFwD7SGjCrXCUI3EOKk.jpg', 'user5', 'user5@gmail.com', NULL, '$2y$10$okRh339v31bc6fU0XYpnQOykYu0f4tbwxQwEVcBm7VD57fJ7xZ08W', NULL, '2024-05-28 18:14:23', '2024-05-28 18:14:23', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(268, 'assets/gallery/vYjMSf9GfaIHsHGkZQPk0hYDQUs1yVBtPUx8QvyX.jpg', 'user6', 'user6@gmail.com', NULL, '$2y$10$l8NhivzNS7JrISLecToPGO0cRdFQkFU3HS57Dtd2IEFolgATM6Trm', NULL, '2024-05-28 18:15:54', '2024-05-28 18:15:54', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(269, 'assets/gallery/Gya0XVs7FpKEWGxziN7hL9d6fzTBCfQH9iLKm4R6.jpg', 'Struick', 'marco@gmail.com', NULL, '$2y$10$J8286vNOZ.Kbr6QKI9ssUusLurLMxpqtVwtYVPXtSmDS6vKTcu1um', NULL, '2024-05-29 18:16:02', '2024-06-18 19:32:52', 'USER', 'aaaaadfgsdfg', NULL, NULL, 'sdfg', 1234560, 'Mancing0', '1974-09-10', 'Bandung0', '2000000', '098897870', 'Balqis0', 6543210, 'rumah tangga0', '1975-09-10', 'Tangerang Selatan0', '1000', '098897870', 'sdgfsdfg', 'Pondok', 'sdf', 'sdfg'),
(270, 'assets/gallery/8dKiqjO5FZ9ufytmEb9Lp4oSSBjsnT9R9DNpsInv.jpg', 'Wesewes', 'wesewes@gmail.com', NULL, '$2y$10$6tn/vvE5diEbJ9.50B8H9.zOVdT.S4T.Hgvsw25Iom3JPAeYH6XnC', NULL, '2024-06-11 00:47:53', '2024-06-11 00:47:53', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(271, 'assets/gallery/dbeAtSBDXlD3alAuHDzCk8UwQ6t4P9ysdHccm3Zq.jpg', 'lala', 'lala@gmail.com', NULL, '$2y$10$hnnrUVK2uLpxOrMebFRsueAVOGtjAWGxCbHZT1TZNENhDNBtnzYw6', NULL, '2024-06-12 01:48:21', '2024-06-13 01:02:47', 'USER', 'aasdf', NULL, NULL, '34535', 343434, '54545', '2024-06-14', '456456456', '> 2.000.000', '5465656', 'kaksdf', 3456, 'Rumah tangga', '2024-06-08', 'Padang', '< 2.000.000', '456456456', 'sdgfsdfg', 'sadfr', 'sadfr', 'asdf'),
(272, 'assets/gallery/igWhNaT0e8L9LHDqum0rWknltOymHs9INbEyvvW2.jpg', 'Awal', 'awal@gmail.com', NULL, '$2y$10$Ywpgb/ZXzn6XY7yvx1apYulEqjPa/DPGUQAxZBAuRnt2PBGLr9MC2', NULL, '2024-06-13 01:51:46', '2024-06-13 01:56:14', 'USER', 'aasdf', NULL, NULL, '34535', 2345, 'sdfsdf', '2024-06-06', 'bogor', '< 2.000.000', '096568', 'kjhsdf', 5476, 'Rumah tangga', '2024-06-07', 'Padang', '> 2.000.000', '068678567', 'y563456', 'gsdfg', 'sadf', 'asdf'),
(273, 'assets/gallery/QJgxNHmKsRvSr0z1fQSebs1MhI27AUftAeeVu5fN.jpg', 'walf', 'walf@gmail.com', NULL, '$2y$10$YBnIekiFvmQ6EaN/qx09Q.Z9g4BlYP50CtPgTcdp.exrqWQFhY.Pi', NULL, '2024-06-19 01:03:32', '2024-06-19 01:29:49', 'USER', 'aasdf', NULL, NULL, '34535', NULL, NULL, '2024-06-06', NULL, NULL, '6436', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sadf', 'sadf', 'sadf', 'asdf'),
(274, 'assets/gallery/1a9sZa1DzYBdhRMk5hD8sBfoqa2UC91aXsrUEk0l.jpg', 'lele afs', 'lele@gmail.com', NULL, '$2y$10$Vb1RJMruLmWHkaSX0Vl.N.yYEV41stXqQ8v.U/glOuY901Yi2nB8W', NULL, '2024-06-19 01:46:10', '2024-06-19 01:49:38', 'USER', 'aasdf', NULL, NULL, '34535', NULL, NULL, '2024-05-31', NULL, NULL, '23453245', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sadf', 'sadf', 'sadfr', 'asdfr'),
(275, 'assets/gallery/MrgHqgn9vWXz7C7JcAfQvFSkqRPbCikpXGVyIkAq.jpg', 'Akram Almair', 'akram@gmail.com', NULL, '$2y$10$Zko0VnEgVB1yGb4s9h8WMOB5/6WPAW7Ag7XhQhOLIPAAEDzFsOZUu', NULL, '2024-06-19 18:18:27', '2024-06-19 18:19:28', 'USER', 'aaaaa', NULL, NULL, '34535', NULL, NULL, '2024-06-12', NULL, NULL, '09686', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sadf', 'sadfr', 'sad', 'asdfr');

-- --------------------------------------------------------

--
-- Table structure for table `xenditpayments`
--

CREATE TABLE `xenditpayments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `checkout_link` varchar(255) NOT NULL,
  `external_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `xenditpayments`
--

INSERT INTO `xenditpayments` (`id`, `checkout_link`, `external_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'https://checkout-staging.xendit.co/v2/6666ab842eb4dbb8c04382b4', 'acd1b0b9-aa1b-4398-be7e-b52fb5487425', 'paid', '2024-06-10 00:30:13', '2024-06-10 00:40:19'),
(2, 'https://checkout-staging.xendit.co/v2/6666b23d82ba076c16d5dadc', '9f10063e-a193-47ef-be23-b67e7870883f', 'pending', '2024-06-10 00:58:53', '2024-06-10 00:58:53'),
(3, 'https://checkout-staging.xendit.co/v2/6666b58db13be91c598662ed', '32c0d97b-0885-4b7f-be4a-af709b33126f', 'settled', '2024-06-10 01:13:01', '2024-06-10 01:13:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `xenditpayments`
--
ALTER TABLE `xenditpayments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT for table `xenditpayments`
--
ALTER TABLE `xenditpayments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
