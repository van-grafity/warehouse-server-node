-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2023 at 09:03 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `image` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `platform` text DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `gender`, `age`, `image`, `is_admin`, `platform`, `phone`, `is_active`) VALUES
(0, 'zz', 'development@gmail.com', '$2b$10$tFfr0nN332Jv6wKLx8UZrOzzhaVs4DpnbpmshmKOPbRbs8aXeyg/y', '', 0, '', 0, NULL, '081313131313', 0);
COMMIT;

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type_id` int(11) NOT NULL,
  `part_number` text NOT NULL,
  `condition_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `color` text NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`id`, `name`, `type_id`, `part_number`, `condition_id`, `quantity`, `price`, `color`, `comment`, `created_at`, `deleted_at`) VALUES
(1, 'Polypropylene', 1, '691831', 2, 88, 1414000, 'Gray Lower', 'No Comment', '2021-02-22 09:03:00', NULL),
(2, 'Polyvinyl chloride', 2, '691832', 1, 243, 535000, 'Red', 'No Comment', '2021-02-22 09:03:00', NULL),
(3, 'High Molecular Weight HDPE', 2, '691833', 2, 760, 456000, 'Maron', 'No Comment', '2021-02-22 09:03:00', NULL),
(4, 'Liquid Crystal Polymer', 1, '691834', 2, 546, 765000, 'White', 'No Comment', '2021-02-22 09:03:00', NULL),
(5, 'Acetal', 2, '691835', 1, 234, 346000, 'Cream', 'No Comment', '2021-02-22 09:03:00', NULL),
(6, 'Cellulose Acetate Propionate', 1, '691836', 2, 743, 785000, 'Orange', 'No Comment', '2021-02-22 09:03:00', NULL),
(7, 'Thermoplastic Polyurethane', 1, '691837', 1, 345, 967000, 'Gray', 'No Comment', '2021-02-22 09:03:00', NULL),
(8, 'Compression Moulds', 1, '691838', 1, 768, 235000, 'White', 'No Comment', '2021-02-22 09:03:00', '2021-02-22 09:03:00'),
(9, 'Rotational Core System Moulds', 2, '691839', 2, 967, 123000, 'Gray', 'No Comment', '2021-02-22 09:03:00', '2021-02-22 09:03:00'),
(10, 'Plastic Mould Design', 1, '691840', 2, 102, 346000, 'Maron', 'No Comment', '2021-02-22 09:03:00', NULL);

--
-- Table structure for table `type  `
--

CREATE TABLE `material_type` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `material_type` () VALUES
(1, 'Plastic'),
(2, 'Mould');

--
-- Table structure for table `condition`
--

CREATE TABLE `material_condition` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `condition`
--

INSERT INTO `material_condition` () VALUES
(1, 'New'),
(2, 'Used');

--
-- Indeks untuk tabel `user`
--

ALTER TABLE `user`
    ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `material`
--

ALTER TABLE `material`
    ADD PRIMARY KEY (`id`),
    ADD KEY `type_id` (`type_id`),
    ADD KEY `condition_id` (`condition_id`);

--
-- Indeks untuk tabel `type`
--

ALTER TABLE `material_type`
    ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `condition`
--

ALTER TABLE `material_condition`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--

ALTER TABLE `user`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `material`
--

ALTER TABLE `material`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `type`
--

ALTER TABLE `material_type`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `condition`
--

ALTER TABLE `material_condition`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `material`
--

ALTER TABLE `material`
    ADD CONSTRAINT `material_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `material_type` (`id`),
    ADD CONSTRAINT `material_ibfk_2` FOREIGN KEY (`condition_id`) REFERENCES `material_condition` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
