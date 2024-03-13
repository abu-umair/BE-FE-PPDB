-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 08:20 AM
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
(31, '2024_01_06_063207_add_type_field_to_products_table', 25);

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
  `phone` varchar(15) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `long` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `spesialisasi` varchar(255) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
  `accumulated_expired` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `ownership_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `roles`, `phone`, `gender`, `dob`, `address`, `long`, `lat`, `spesialisasi`, `card_id`, `accumulated_expired`, `city`, `zip_code`, `ownership_id`) VALUES
(203, 'assets/gallery/AbyP3coyC3FxiHw665DHl1WtjRNF5Phe20sAnDX2.jpg', 'Cahyanto Prayoga', 'coba@gmail.com', NULL, '$2y$10$2fjo5uJLgbliOhWDyD5cfuCUq5SnN7npXZbVbzXsThkl3efhhXpuG', NULL, '2023-01-01 20:25:03', '2023-12-24 19:12:58', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BogorA', '75115', NULL),
(204, 'assets/gallery/bd2wtyEPxOxwhvCQCe7zp0F5EemyCAtc7ByHreSx.jpg', 'sidomunculads', 'siddoermunculiy@gmail.com', '2024-01-01 06:07:05', '$2y$10$zKoMAvyseIS9/y3cBvSr/.0VW81nsbwJkOIBx5dg/wFdCqMVS0Vpe', NULL, '2024-01-10 12:26:50', '2024-03-05 19:37:11', 'USER', '09889787', 1, '1974-09-16', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara', '45.683213', '-144.222879', NULL, 2, NULL, 'Jakarta', '75115', NULL),
(205, 'assets/gallery/XMe6rnZ5Xep4rd8PsIer0Wm8ijoiBvkAI9HAXi0f.jpg', 'sidomunculads', 'siddoermuncul@gmail.com', NULL, '$2y$10$QrF78h2Zygz5YlUWaTrWue3CKb9I0gPRWCRkqNFrx3WJBPAsaJ2j.', NULL, '2024-01-02 05:15:31', '2024-03-05 19:34:53', 'USER', '09889787', 1, '1974-09-16', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara', '45.683213', '-144.222879', NULL, 2, '2024-01-10', 'Bandung', '75115', NULL),
(206, NULL, 'null name', 'siddoermuncul1@gmail.comrt3', NULL, '$2y$10$cPuiNdYYsGCCcxuKT7wRPuA2b8t9JXHdFtuA2VUmDgQi1Wv99arem', NULL, '2024-03-02 08:13:38', '2024-01-23 07:48:34', 'USER', '09889787', 1, '1974-09-16', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara', '45.683213', '-144.222879', NULL, 1, '2024-09-16', 'surabaya', '75115', NULL),
(207, 'assets/gallery/qzAIItIQgJJy7tgBc60MelTfE8Bb3ixsqCxY4oNF.jpg', 'Muhammad Idris', 'muhammadidris@gmail.com', NULL, '$2y$10$e8tZk08.t3JEOxdZXlZjRekinJxUZwtRfgIQ/CEjHcKQVisd0b2JW', NULL, '2024-02-08 07:36:07', '2024-01-08 07:36:07', 'USER', '098878', NULL, NULL, 'Jl. Dr Hamka', NULL, NULL, NULL, NULL, NULL, 'funtianak', '7654333', NULL),
(211, NULL, 'sidomunculadsstaff', 'staff2@gmail.com4', NULL, '$2y$10$.YhPNSdlmkJTdXyjE0dSrOdZ4LQ6PIADsgf2ir5/AeyvmFbYpiL/S', NULL, '2024-01-23 06:44:50', '2024-01-23 07:02:26', 'USER', '09889787', 1, '1974-09-16', 'Ds. Reksoninten No. 907, Tarakan 44447, Kaltara', '45.683213', '-144.222879', NULL, 2, '2024-07-16', NULL, NULL, 203),
(212, 'assets/gallery/P3M6esnBBx6bsnwhqnXacc9lkC2tcKZMx66MtiOX.jpg', 'Reza', 'reza@gmail.com', NULL, '$2y$10$HVHzzfOVYneRctjdznmXmuKEf0S/MLkjG.gIQT4Dk/Jx/idnLWO/i', NULL, '2024-02-15 00:25:02', '2024-02-15 00:25:02', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(213, 'assets/gallery/674UFe6OMjoZ2DT4owtQRSX6Ias1y52awUice1rb.jpg', 'Reza', 'reza1@gmail.com', NULL, '$2y$10$8Ykmz4.Uj67hLXvjIxezbuEtQgiYUm5GA2QGM3KBweaJXMAHjnjqu', NULL, '2024-02-15 01:02:25', '2024-02-15 01:02:25', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(214, 'assets/gallery/5hqSzcdCAWZwpugfStAzelL63UA6W2uOA1nDC5l3.jpg', 'Reza', 'reza2@gmail.com', NULL, '$2y$10$aWeBkhrfNAAilTrh/z6wpOzKkdWaDMXYZBg421NhzPYOSRR5HMPSm', NULL, '2024-02-15 01:03:16', '2024-02-15 01:03:16', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(220, 'assets/gallery/QK4dy2yg5T4umJVWEx3d27XRUA7rxD2b3bqfIvqc.jpg', 'sidomunculads 3', 'abdi1.ahsan@gmail.com', NULL, '$2y$10$rr3sjzy1avj6k0ZHJSfnCual0h1NBgj2IoGuOIaKUvKuOoFi88clm', NULL, '2024-03-12 18:14:11', '2024-03-12 18:14:11', 'USER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
