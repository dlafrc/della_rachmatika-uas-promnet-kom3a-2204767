-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 05:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2204767_dellarachmatikani_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory_della`
--

CREATE TABLE `inventory_della` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(100) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `harga_satuan` int(11) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_della`
--

INSERT INTO `inventory_della` (`id`, `nama_barang`, `jumlah`, `harga_satuan`, `lokasi`, `deskripsi`) VALUES
(1, 'Buku Gambar', 101, 6000, 'Bandung', 'Buku tulis kualitas baik'),
(2, 'Pensil 3B', 53, 20000, 'Bandung', 'Pensil warna isi 12'),
(3, 'Kemeja Casual', 30, 75000, 'Denpasar', 'Kemeja casual pria'),
(4, 'Sepatu Sneakers', 20, 150000, 'Manokwari', 'Sepatu sneakers berwarna hitam'),
(5, 'Kertas HVS', 200, 10000, 'Bandung', 'Kertas HVS ukuran A4'),
(6, 'Kantong Plastik', 500, 500, 'Jakarta', 'Kantong plastik ukuran sedang'),
(7, 'Topi Trucker', 40, 30000, 'Denpasar', 'Topi trucker dengan desain keren');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory_della`
--
ALTER TABLE `inventory_della`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory_della`
--
ALTER TABLE `inventory_della`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
