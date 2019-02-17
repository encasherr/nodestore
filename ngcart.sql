-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2019 at 07:03 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngcart`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `parent_category_id` int(11) NOT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `title`, `description`, `parent_category_id`, `update_time`) VALUES
(1, 'Electronics', 'All Electronic Goods In Retail', 0, '2018-02-18 23:56:05'),
(2, 'Mobile', 'All Brand Mobiles at reasonable rates', 1, '2018-02-18 23:56:30'),
(3, 'Television', 'All brand new Television Sets', 1, '2018-02-18 23:56:49'),
(4, 'Microwave Oven', 'All brand new Microwave ovens', 1, '2018-02-18 23:57:12'),
(5, 'Apparells', 'All clothing items at reasonable rates', 0, '2018-02-18 23:57:51'),
(6, 'Mens Clothing', 'All mens clothing', 5, '2018-02-18 23:58:19'),
(7, 'Gym T-Shirts', 'Gym T-Shirts', 6, '2018-02-18 23:58:50'),
(8, 'Womens Clothing', 'Womens Clothing', 5, '2018-02-18 23:59:30'),
(9, 'Chudidar', 'Chudidar', 8, '2018-02-18 23:59:47'),
(10, 'Lehenga', 'Lehenga', 8, '2018-02-19 00:00:08'),
(11, 'Trousers', 'Trousers', 6, '2018-02-19 00:00:53'),
(12, 'Jeans', 'Jeans', 6, '2018-02-19 00:01:14'),
(13, 'Casual Shirts', 'Casual Shirts', 6, '2018-02-19 00:01:32'),
(14, 'Formal Shirts', 'Formal Shirts', 6, '2018-02-19 00:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipping_addressid` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `status` varchar(50) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `category_id`, `status`, `update_time`) VALUES
(1, 'Samsung 8GB RAM 4G Silver Handset', 'Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset', 0, NULL, '2018-03-04 21:43:01'),
(2, 'Samsung 8GB RAM 4G Silver Handset', 'Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset', 0, NULL, '2018-03-04 21:48:21'),
(3, 'Samsung 8GB RAM 4G Silver Handset', 'Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset, Samsung 8GB RAM 4G Silver Handset', 0, NULL, '2018-03-04 21:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_meta`
--

CREATE TABLE `product_meta` (
  `product_id` int(11) NOT NULL,
  `meta_key` varchar(50) NOT NULL,
  `meta_value` text NOT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_meta`
--

INSERT INTO `product_meta` (`product_id`, `meta_key`, `meta_value`, `update_time`) VALUES
(1, 'sell_price', '50000', '2018-03-04 21:43:01'),
(1, 'stock_quantity', '4', '2018-03-04 21:43:01'),
(2, 'sell_price', '50000', '2018-03-04 21:48:22'),
(2, 'stock_quantity', '4', '2018-03-04 21:48:23'),
(3, 'sell_price', '50000', '2018-03-04 21:50:15'),
(3, 'stock_quantity', '4', '2018-03-04 21:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `product_option`
--

CREATE TABLE `product_option` (
  `product_id` int(11) NOT NULL,
  `option_type` varchar(50) NOT NULL,
  `option_label` varchar(200) NOT NULL,
  `option_values` text,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_option`
--

INSERT INTO `product_option` (`product_id`, `option_type`, `option_label`, `option_values`, `update_time`) VALUES
(1, 'Radio', 'Wifi', 'yes,no', '2018-03-04 21:43:01'),
(1, 'Radio', 'Bluetooth', 'yes,no', '2018-03-04 21:43:01'),
(1, 'Dropdown', 'color', 'black,silver,white,gold', '2018-03-04 21:43:01'),
(2, 'Radio', 'Wifi', 'yes,no', '2018-03-04 21:48:23'),
(2, 'Radio', 'Bluetooth', 'yes,no', '2018-03-04 21:48:23'),
(2, 'Dropdown', 'color', 'black,silver,white,gold', '2018-03-04 21:48:23'),
(3, 'Radio', 'Wifi', 'yes,no', '2018-03-04 21:50:15'),
(3, 'Radio', 'Bluetooth', 'yes,no', '2018-03-04 21:50:15'),
(3, 'Dropdown', 'color', 'black,silver,white,gold', '2018-03-04 21:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_address`
--

CREATE TABLE `shipping_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `landmark` varchar(500) DEFAULT NULL,
  `pincode` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `salt` varchar(1000) DEFAULT NULL,
  `user_group_id` int(11) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `username`, `password`, `salt`, `user_group_id`, `ip`, `status`, `update_time`) VALUES
(1, 'test1@email.com', 'test1', 'wX7gTRP27IvQd5J/yiMIHKQUeYQ+I+UxHP8Z9/QTOCMKqAPr1I63IlHFjHFkAHBnqSsQh493P3ftAmdgYmtiaA==', 'test1', 1, '127.0.0.1', '0', '2018-02-18 21:32:11'),
(2, 'test2@email.com', 'test2', 'aJu3EC1B7+c1H36sdUzUMXIBcGxmqRU1Ehc7z5tiL6u1RYejKzhi1DmDGlf7jjwEfSB9G4qW+ckiddYi5fJrnA==', 'test2', 1, '127.0.0.1', '0', '2018-02-18 21:38:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_cart`
--

CREATE TABLE `user_cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_price` float NOT NULL,
  `shipping_amount` float NOT NULL,
  `status` varchar(50) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_address`
--
ALTER TABLE `shipping_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_cart`
--
ALTER TABLE `user_cart`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shipping_address`
--
ALTER TABLE `shipping_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_cart`
--
ALTER TABLE `user_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
