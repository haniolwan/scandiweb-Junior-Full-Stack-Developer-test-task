-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: May 08, 2025 at 10:40 AM
-- Server version: 9.1.0
-- PHP Version: 8.2.27
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scandiweb`
--
-- --------------------------------------------------------
--
-- Table structure for table `attributes`
--
CREATE TABLE
  `attributes` (
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `type` varchar(50) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attributes`
--
INSERT INTO
  `attributes` (`id`, `name`, `type`)
VALUES
  ('Capacity', 'Capacity', 'text'),
  ('Color', 'Color', 'swatch'),
  ('Size', 'Size', 'text');

-- --------------------------------------------------------
--
-- Table structure for table `attribute_items`
--
CREATE TABLE
  `attribute_items` (
    `id` varchar(255) NOT NULL,
    `attribute_id` varchar(255) DEFAULT NULL,
    `displayValue` varchar(255) DEFAULT NULL,
    `value` varchar(255) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attribute_items`
--
INSERT INTO
  `attribute_items` (`id`, `attribute_id`, `displayValue`, `value`)
VALUES
  ('1T', 'Capacity', '1T', '1T'),
  ('40', 'Size', '40', '40'),
  ('41', 'Size', '41', '41'),
  ('42', 'Size', '42', '42'),
  ('43', 'Size', '43', '43'),
  ('512G', 'Capacity', '512G', '512G'),
  ('Black', 'Color', 'Black', '#000000'),
  ('Blue', 'Color', 'Blue', '#030BFF'),
  ('Cyan', 'Color', 'Cyan', '#03FFF7'),
  ('Extra Large', 'Size', 'Extra Large', 'XL'),
  ('Green', 'Color', 'Green', '#44FF03'),
  ('Large', 'Size', 'Large', 'L'),
  ('Medium', 'Size', 'Medium', 'M'),
  ('Small', 'Size', 'Small', 'S'),
  ('White', 'Color', 'White', '#FFFFFF');

-- --------------------------------------------------------
--
-- Table structure for table `categories`
--
CREATE TABLE
  `categories` (`id` int NOT NULL, `name` varchar(255) NOT NULL) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--
INSERT INTO
  `categories` (`id`, `name`)
VALUES
  (1, 'all'),
  (2, 'clothes'),
  (3, 'tech');

-- --------------------------------------------------------
--
-- Table structure for table `currencies`
--
CREATE TABLE
  `currencies` (
    `label` varchar(10) NOT NULL,
    `symbol` varchar(5) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `currencies`
--
INSERT INTO
  `currencies` (`label`, `symbol`)
VALUES
  ('USD', '$');

-- --------------------------------------------------------
--
-- Table structure for table `galleries`
--
CREATE TABLE
  `galleries` (
    `id` int NOT NULL,
    `product_id` varchar(255) DEFAULT NULL,
    `url` text
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `galleries`
--
INSERT INTO
  `galleries` (`id`, `product_id`, `url`)
VALUES
  (
    1,
    'huarache-x-stussy-le',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'
  ),
  (
    2,
    'huarache-x-stussy-le',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'
  ),
  (
    3,
    'jacket-canada-goosee',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/2_49e23e37-63e0-4db6-9a93-3b8bb96781df_720x.jpg?v=1644425382'
  ),
  (
    4,
    'jacket-canada-goosee',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/3_1a69fe4a-1939-47bc-84dc-34cbe1ab8c07_720x.jpg?v=1644425383'
  ),
  (
    5,
    'ps-5',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/ps5-digital-edition-01_720x.jpg?v=1649431544'
  ),
  (
    6,
    'ps-5',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/ps5-digital-edition-02_720x.jpg?v=1649431544'
  ),
  (
    7,
    'xbox-series-s',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/xbox-series-s-01_720x.jpg?v=1638460454'
  ),
  (
    8,
    'xbox-series-s',
    'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/xbox-series-s-02_720x.jpg?v=1638460454'
  );

-- --------------------------------------------------------
--
-- Table structure for table `prices`
--
CREATE TABLE
  `prices` (
    `id` int NOT NULL,
    `product_id` varchar(255) DEFAULT NULL,
    `currency_label` varchar(10) DEFAULT NULL,
    `amount` decimal(10, 2) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `prices`
--
INSERT INTO
  `prices` (`id`, `product_id`, `currency_label`, `amount`)
VALUES
  (1, 'huarache-x-stussy-le', 'USD', 144.69),
  (2, 'jacket-canada-goosee', 'USD', 518.47),
  (3, 'ps-5', 'USD', 844.02),
  (4, 'xbox-series-s', 'USD', 399.00);

-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE
  `products` (
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `inStock` tinyint (1) NOT NULL,
    `description` text,
    `category_id` int DEFAULT NULL,
    `brand` varchar(255) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--
INSERT INTO
  `products` (
    `id`,
    `name`,
    `inStock`,
    `description`,
    `category_id`,
    `brand`
  )
VALUES
  (
    'huarache-x-stussy-le',
    'Nike Air Huarache Le',
    1,
    '<p>Great sneakers for everyday use!</p>',
    2,
    'Nike x Stussy'
  ),
  (
    'jacket-canada-goosee',
    'Jacket',
    1,
    '<p>Awesome winter jacket</p>',
    2,
    'Canada Goose'
  ),
  (
    'ps-5',
    'PlayStation 5',
    1,
    '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
    3,
    'Sony'
  ),
  (
    'xbox-series-s',
    'Xbox Series S 512GB',
    0,
    '<p>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer Spiele Games mit bis zu 120 Bilder pro Sekunde...</p>',
    3,
    'Microsoft'
  );

-- --------------------------------------------------------
--
-- Table structure for table `product_attributes`
--
CREATE TABLE
  `product_attributes` (
    `product_id` varchar(255) NOT NULL,
    `attribute_id` varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_attributes`
--
INSERT INTO
  `product_attributes` (`product_id`, `attribute_id`)
VALUES
  ('ps-5', 'Capacity'),
  ('xbox-series-s', 'Capacity'),
  ('ps-5', 'Color'),
  ('huarache-x-stussy-le', 'Size'),
  ('jacket-canada-goosee', 'Size');

-- --------------------------------------------------------
--
-- Table structure for table `product_attribute_items`
--
CREATE TABLE
  `product_attribute_items` (
    `product_id` varchar(255) NOT NULL,
    `attribute_item_id` varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_attribute_items`
--
INSERT INTO
  `product_attribute_items` (`product_id`, `attribute_item_id`)
VALUES
  ('ps-5', '1T'),
  ('huarache-x-stussy-le', '40'),
  ('huarache-x-stussy-le', '41'),
  ('huarache-x-stussy-le', '42'),
  ('huarache-x-stussy-le', '43'),
  ('ps-5', '512G'),
  ('xbox-series-s', '512G'),
  ('ps-5', 'Black'),
  ('ps-5', 'Blue'),
  ('ps-5', 'Cyan'),
  ('jacket-canada-goosee', 'Extra Large'),
  ('ps-5', 'Green'),
  ('jacket-canada-goosee', 'Large'),
  ('jacket-canada-goosee', 'Medium'),
  ('jacket-canada-goosee', 'Small'),
  ('ps-5', 'White');

--
-- Indexes for dumped tables
--
--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attribute_items`
--
ALTER TABLE `attribute_items` ADD PRIMARY KEY (`id`),
ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories` ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies` ADD PRIMARY KEY (`label`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries` ADD PRIMARY KEY (`id`),
ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices` ADD PRIMARY KEY (`id`),
ADD KEY `product_id` (`product_id`),
ADD KEY `currency_label` (`currency_label`);

--
-- Indexes for table `products`
--
ALTER TABLE `products` ADD PRIMARY KEY (`id`),
ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes` ADD PRIMARY KEY (`product_id`, `attribute_id`),
ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `product_attribute_items`
--
ALTER TABLE `product_attribute_items` ADD PRIMARY KEY (`product_id`, `attribute_item_id`),
ADD KEY `attribute_item_id` (`attribute_item_id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 9;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices` MODIFY `id` int NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 5;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `attribute_items`
--
ALTER TABLE `attribute_items` ADD CONSTRAINT `attribute_items_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries` ADD CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `prices`
--
ALTER TABLE `prices` ADD CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
ADD CONSTRAINT `prices_ibfk_2` FOREIGN KEY (`currency_label`) REFERENCES `currencies` (`label`);

--
-- Constraints for table `products`
--
ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_attributes`
--
ALTER TABLE `product_attributes` ADD CONSTRAINT `product_attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
ADD CONSTRAINT `product_attributes_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

--
-- Constraints for table `product_attribute_items`
--
ALTER TABLE `product_attribute_items` ADD CONSTRAINT `product_attribute_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
ADD CONSTRAINT `product_attribute_items_ibfk_2` FOREIGN KEY (`attribute_item_id`) REFERENCES `attribute_items` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE
  `orders` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` VARCHAR(255) NOT NULL,
    `currency_label` VARCHAR(10) NOT NULL DEFAULT 'USD',
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `attribute_item_ids` TEXT, -- "40, black, 512G"
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`currency_label`) REFERENCES `currencies` (`label`)
  );