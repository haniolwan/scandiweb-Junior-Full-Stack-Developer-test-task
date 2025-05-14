-- Database schema for e-commerce application

-- --------------------------------------------------------
-- Table structure for table `categories`
-- --------------------------------------------------------
CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) UNIQUE NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------
CREATE TABLE products(
    id VARCHAR(255) PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    inStock BOOLEAN NOT NULL,
    description TEXT,
    category_id INT,
    brand VARCHAR(255),
    FOREIGN KEY(category_id) REFERENCES categories(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `galleries`
-- --------------------------------------------------------
CREATE TABLE galleries(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    url TEXT,
    FOREIGN KEY(product_id) REFERENCES products(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `attributes`
-- --------------------------------------------------------
CREATE TABLE attributes(
    id VARCHAR(255) PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    TYPE VARCHAR(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `attribute_items`
-- --------------------------------------------------------
CREATE TABLE attribute_items(
    id VARCHAR(255) PRIMARY KEY,
    attribute_id VARCHAR(255),
    displayValue VARCHAR(255),
    VALUE VARCHAR(255),
    FOREIGN KEY(attribute_id) REFERENCES attributes(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `product_attributes`
-- --------------------------------------------------------
CREATE TABLE product_attributes(
    product_id VARCHAR(255),
    attribute_id VARCHAR(255),
    PRIMARY KEY(product_id, attribute_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(attribute_id) REFERENCES attributes(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `product_attribute_items`
-- --------------------------------------------------------
CREATE TABLE product_attribute_items(
    product_id VARCHAR(255),
    attribute_item_id VARCHAR(255),
    PRIMARY KEY(product_id, attribute_item_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(attribute_item_id) REFERENCES attribute_items(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `currencies`
-- --------------------------------------------------------
CREATE TABLE currencies(
    label VARCHAR(10) PRIMARY KEY,
    symbol VARCHAR(5) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `prices`
-- --------------------------------------------------------
CREATE TABLE prices(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    currency_label VARCHAR(10),
    amount DECIMAL(10, 2),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(currency_label) REFERENCES currencies(label)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------
CREATE TABLE `orders` (
    `id` VARCHAR(255) NOT NULL,
    `customer_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Table structure for table `order_items`
-- --------------------------------------------------------
CREATE TABLE `order_items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `product_id` VARCHAR(255) NOT NULL,
    `order_id` VARCHAR(255) NOT NULL,
    `currency_label` VARCHAR(10) NOT NULL DEFAULT 'USD',
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `attribute_item_ids` TEXT,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    FOREIGN KEY (`currency_label`) REFERENCES `currencies` (`label`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- --------------------------------------------------------
-- Inserting data into `categories`
-- --------------------------------------------------------
INSERT INTO categories(NAME) VALUES('all');
INSERT INTO categories(NAME) VALUES('clothes');
INSERT INTO categories(NAME) VALUES('tech');

-- --------------------------------------------------------
-- Inserting data into `currencies`
-- --------------------------------------------------------
INSERT INTO currencies(label, symbol) VALUES('USD', '$');

-- --------------------------------------------------------
-- Inserting data into `products`
-- --------------------------------------------------------
-- We need to get category_id values first
SET @all_category_id = (SELECT id FROM categories WHERE NAME = 'all');
SET @clothes_category_id = (SELECT id FROM categories WHERE NAME = 'clothes');
SET @tech_category_id = (SELECT id FROM categories WHERE NAME = 'tech');

-- Insert products with their respective category IDs
INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'huarache-x-stussy-le',
    'Nike Air Huarache Le',
    TRUE,
    '<p>Great sneakers for everyday use!</p>',
    @clothes_category_id,
    'Nike x Stussy'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'jacket-canada-goosee',
    'Jacket',
    TRUE,
    '<p>Awesome winter jacket</p>',
    @clothes_category_id,
    'Canada Goose'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'ps-5',
    'PlayStation 5',
    TRUE,
    '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
    @tech_category_id,
    'Sony'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'xbox-series-s',
    'Xbox Series S 512GB',
    FALSE,
    '<div>
    <ul>
        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>
        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>
        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>
        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>
        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>
        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>
        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>
        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>
        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>
        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr</span></li>
    </ul>
</div>',
    @tech_category_id,
    'Microsoft'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'apple-imac-2021',
    'Apple IMac',
    FALSE,
    "",
    @tech_category_id,
    'Apple'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'apple-iphone-12-pro',
    'iPhone 12 Pro',
    TRUE,
    'This is iPhone 12. Nothing else to say.',
    @tech_category_id,
    'Apple'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'apple-airpods-pro',
    'AirPods Pro',
    FALSE,
    "<h3>Magic like youve never heard</h3>
<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And theyre ready to use right out of the case.
<h3>Active Noise Cancellation</h3>
<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you're listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.
<h3>Transparency mode</h3>
<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you're talking to people around you.</p>
<h3>All-new design</h3>
<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>
<h3>Amazing audio quality</h3>
<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>
<h3>Even more magical</h3>
<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>",
    @tech_category_id,
    'Apple'
);

INSERT INTO products(
    id,
    NAME,
    inStock,
    description,
    category_id,
    brand
) VALUES(
    'apple-airtag',
    'AirTag',
    TRUE,
    "<h1>Lose your knack for losing things.</h1>
<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they're on your radar in the Find My app. AirTag has your back.</p>",
    @tech_category_id,
    'Apple'
);

-- --------------------------------------------------------
-- Inserting data into `galleries`
-- --------------------------------------------------------
-- Product: huarache-x-stussy-le
INSERT INTO galleries(product_id, url) VALUES('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087');
INSERT INTO galleries(product_id, url) VALUES('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087');
INSERT INTO galleries(product_id, url) VALUES('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087');
INSERT INTO galleries(product_id, url) VALUES('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087');
INSERT INTO galleries(product_id, url) VALUES('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087');

-- Product: jacket-canada-goosee
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png');
INSERT INTO galleries(product_id, url) VALUES('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png');

-- Product: ps-5
INSERT INTO galleries(product_id, url) VALUES('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg');
INSERT INTO galleries(product_id, url) VALUES('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg');
INSERT INTO galleries(product_id, url) VALUES('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg');

-- Product: xbox-series-s
INSERT INTO galleries(product_id, url) VALUES('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg');
INSERT INTO galleries(product_id, url) VALUES('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg');

-- Product: apple-iphone-12-pro
INSERT INTO galleries(product_id, url) VALUES('apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000');

-- Product: apple-airpods-pro
INSERT INTO galleries(product_id, url) VALUES('apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000');

-- Product: apple-airtag
INSERT INTO galleries(product_id, url) VALUES('apple-airtag', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');

-- --------------------------------------------------------
-- Inserting data into `attributes`
-- --------------------------------------------------------
INSERT INTO attributes(id, NAME, TYPE) VALUES('Size', 'Size', 'text');
INSERT INTO attributes(id, NAME, TYPE) VALUES('Color', 'Color', 'swatch');
INSERT INTO attributes(id, NAME, TYPE) VALUES('Capacity', 'Capacity', 'text');
INSERT INTO attributes(id, NAME, TYPE) VALUES('With USB 3 ports', 'With USB 3 ports', 'text');
INSERT INTO attributes(id, NAME, TYPE) VALUES('Touch ID in keyboard', 'Touch ID in keyboard', 'text');

-- --------------------------------------------------------
-- Inserting data into `attribute_items`
-- --------------------------------------------------------
-- Size attribute items
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('40', 'Size', '40', '40');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('41', 'Size', '41', '41');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('42', 'Size', '42', '42');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('43', 'Size', '43', '43');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Small', 'Size', 'Small', 'S');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Medium', 'Size', 'Medium', 'M');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Large', 'Size', 'Large', 'L');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Extra Large', 'Size', 'Extra Large', 'XL');

-- Color attribute items
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Green', 'Color', 'Green', '#44FF03');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Cyan', 'Color', 'Cyan', '#03FFF7');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Blue', 'Color', 'Blue', '#030BFF');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Black', 'Color', 'Black', '#000000');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('White', 'Color', 'White', '#FFFFFF');

-- Capacity attribute items
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('512GB', 'Capacity', '512GB', '512GB');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('1T', 'Capacity', '1T', '1T');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('256GB', 'Capacity', '256GB', '256GB');

-- USB and Touch ID attribute items
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Yes', 'With USB 3 ports', 'Yes', 'Yes');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('No', 'With USB 3 ports', 'No', 'No');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('Yes_touch', 'Touch ID in keyboard', 'Yes', 'Yes');
INSERT INTO attribute_items(id, attribute_id, displayValue, VALUE) VALUES('No_touch', 'Touch ID in keyboard', 'No', 'No');

-- --------------------------------------------------------
-- Inserting data into `product_attributes`
-- --------------------------------------------------------
-- huarache-x-stussy-le
INSERT INTO product_attributes(product_id, attribute_id) VALUES('huarache-x-stussy-le', 'Size');

-- jacket-canada-goosee
INSERT INTO product_attributes(product_id, attribute_id) VALUES('jacket-canada-goosee', 'Size');

-- ps-5
INSERT INTO product_attributes(product_id, attribute_id) VALUES('ps-5', 'Color');
INSERT INTO product_attributes(product_id, attribute_id) VALUES('ps-5', 'Capacity');

-- xbox-series-s
INSERT INTO product_attributes(product_id, attribute_id) VALUES('xbox-series-s', 'Color');
INSERT INTO product_attributes(product_id, attribute_id) VALUES('xbox-series-s', 'Capacity');

-- apple-imac-2021
INSERT INTO product_attributes(product_id, attribute_id) VALUES('apple-imac-2021', 'Capacity');
INSERT INTO product_attributes(product_id, attribute_id) VALUES('apple-imac-2021', 'With USB 3 ports');
INSERT INTO product_attributes(product_id, attribute_id) VALUES('apple-imac-2021', 'Touch ID in keyboard');

-- apple-iphone-12-pro
INSERT INTO product_attributes(product_id, attribute_id) VALUES('apple-iphone-12-pro', 'Capacity');
INSERT INTO product_attributes(product_id, attribute_id) VALUES('apple-iphone-12-pro', 'Color');

-- --------------------------------------------------------
-- Inserting data into `product_attribute_items`
-- --------------------------------------------------------
-- huarache-x-stussy-le size options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('huarache-x-stussy-le', '40');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('huarache-x-stussy-le', '41');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('huarache-x-stussy-le', '42');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('huarache-x-stussy-le', '43');

-- jacket-canada-goosee size options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('jacket-canada-goosee', 'Small');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('jacket-canada-goosee', 'Medium');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('jacket-canada-goosee', 'Large');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('jacket-canada-goosee', 'Extra Large');

-- ps-5 color and capacity options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', 'Green');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', 'Cyan');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', 'Blue');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', 'Black');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', 'White');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', '512GB');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('ps-5', '1T');

-- xbox-series-s color and capacity options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', 'Green');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', 'Cyan');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', 'Blue');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', 'Black');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', 'White');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', '512GB');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('xbox-series-s', '1T');

-- apple-imac-2021 capacity, usb, and touchID options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', '256GB');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', '512GB');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', 'Yes');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', 'No');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', 'Yes_touch');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-imac-2021', 'No_touch');

-- apple-iphone-12-pro capacity and color options
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', '512GB');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', '1T');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', 'Green');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', 'Cyan');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', 'Blue');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', 'Black');
INSERT INTO product_attribute_items(product_id, attribute_item_id) VALUES('apple-iphone-12-pro', 'White');

-- --------------------------------------------------------
-- Inserting data into `prices`
-- --------------------------------------------------------
INSERT INTO prices(product_id, currency_label, amount) VALUES('huarache-x-stussy-le', 'USD', 144.69);
INSERT INTO prices(product_id, currency_label, amount) VALUES('jacket-canada-goosee', 'USD', 518.47);
INSERT INTO prices(product_id, currency_label, amount) VALUES('ps-5', 'USD', 844.02);
INSERT INTO prices(product_id, currency_label, amount) VALUES('xbox-series-s', 'USD', 333.99);
INSERT INTO prices(product_id, currency_label, amount) VALUES('apple-imac-2021', 'USD', 1688.03);
INSERT INTO prices(product_id, currency_label, amount) VALUES('apple-iphone-12-pro', 'USD', 1000.76);
INSERT INTO prices(product_id, currency_label, amount) VALUES('apple-airpods-pro', 'USD', 300.23);
INSERT INTO prices(product_id, currency_label, amount) VALUES('apple-airtag', 'USD', 120.57);

-- --------------------------------------------------------
-- Inserting data into `orders`
-- --------------------------------------------------------
INSERT INTO `orders` (`id`, `customer_id`, `created_at`) VALUES('order-1', 'customer-1', NOW());

-- --------------------------------------------------------
-- Inserting data into `order_items`
-- --------------------------------------------------------
INSERT INTO `order_items` (
    `product_id`,
    `order_id`,
    `currency_label`,
    `price`,
    `quantity`,
    `attribute_item_ids`,
    `created_at`
) VALUES(
    'huarache-x-stussy-le',
    'order-1',
    'USD',
    144.69,
    1,
    '40',
    '2025-05-14 12:02:56'
),
(
    'ps-5',
    'order-1',
    'USD',
    844.02,
    1,
    'Black, 1T',
    '2025-05-14 12:02:56'
),
(
    'apple-iphone-12-pro',
    'order-1',
    'USD',
    1000.76,
    2,
    'Blue, 512GB',
    '2025-05-14 12:02:56'
);