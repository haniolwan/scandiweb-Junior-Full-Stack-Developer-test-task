-- Categories
INSERT INTO
    categories (name)
VALUES
    ('all'),
    ('clothes'),
    ('tech');

-- Currencies
INSERT INTO
    currencies (label, symbol)
VALUES
    ('USD', '$');

-- Product: Nike Air Huarache Le
INSERT INTO
    products (
        id,
        name,
        description,
        inStock,
        category_id,
        brand
    )
VALUES
    (
        'huarache-x-stussy-le',
        'Nike Air Huarache Le',
        '<p>Great sneakers for everyday use!</p>',
        TRUE,
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'clothes'
        ),
        'Nike x Stussy'
    );

-- Gallery Images
INSERT INTO
    galleries (product_id, url)
VALUES
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'
    ),
    (
        'huarache-x-stussy-le',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'
    );

-- Attribute: Size
INSERT INTO
    attributes (id, name, type)
VALUES
    ('Size', 'Size', 'text');

-- Attribute Items
INSERT INTO
    attribute_items (id, attribute_id, displayValue, value)
VALUES
    ('40', 'Size', '40', '40'),
    ('41', 'Size', '41', '41'),
    ('42', 'Size', '42', '42'),
    ('43', 'Size', '43', '43');

-- Product ↔ Attribute
INSERT INTO
    product_attributes (product_id, attribute_id)
VALUES
    ('huarache-x-stussy-le', 'Size');

-- Product ↔ Attribute Item
INSERT INTO
    product_attribute_items (product_id, attribute_item_id)
VALUES
    ('huarache-x-stussy-le', '40'),
    ('huarache-x-stussy-le', '41'),
    ('huarache-x-stussy-le', '42'),
    ('huarache-x-stussy-le', '43');

-- Price
INSERT INTO
    prices (product_id, currency_label, amount)
VALUES
    ('huarache-x-stussy-le', 'USD', 144.69);

-- ==========================
-- Product: Jacket
-- ==========================
INSERT INTO
    products (
        id,
        name,
        description,
        inStock,
        category_id,
        brand
    )
VALUES
    (
        'jacket-canada-goosee',
        'Jacket',
        '<p>Awesome winter jacket</p>',
        TRUE,
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'clothes'
        ),
        'Canada Goose'
    );

-- Gallery Images
INSERT INTO
    galleries (product_id, url)
VALUES
    (
        'jacket-canada-goosee',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/2_49e23e37-63e0-4db6-9a93-3b8bb96781df_720x.jpg?v=1644425382'
    ),
    (
        'jacket-canada-goosee',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/3_1a69fe4a-1939-47bc-84dc-34cbe1ab8c07_720x.jpg?v=1644425383'
    );

-- Product ↔ Attribute
INSERT INTO
    product_attributes (product_id, attribute_id)
VALUES
    ('jacket-canada-goosee', 'Size');

-- Product ↔ Attribute Items
INSERT INTO
    attribute_items (id, attribute_id, display_value, value)
VALUES
    ('Small', 'Size', 'Small', 'S'),
    ('Medium', 'Size', 'Medium', 'M'),
    ('Large', 'Size', 'Large', 'L'),
    ('Extra Large', 'Size', 'Extra Large', 'XL');

INSERT INTO
    product_attribute_items (product_id, attribute_item_id)
VALUES
    ('jacket-canada-goosee', 'Small'),
    ('jacket-canada-goosee', 'Medium'),
    ('jacket-canada-goosee', 'Large'),
    ('jacket-canada-goosee', 'Extra Large');

-- Price
INSERT INTO
    prices (product_id, currency_label, amount)
VALUES
    ('jacket-canada-goosee', 'USD', 518.47);

-- ==========================
-- Product: PS5
-- ==========================
INSERT INTO
    products (
        id,
        name,
        description,
        inStock,
        category_id,
        brand
    )
VALUES
    (
        'ps-5',
        'PlayStation 5',
        '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
        TRUE,
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'tech'
        ),
        'Sony'
    );

-- Gallery Images
INSERT INTO
    galleries (product_id, url)
VALUES
    (
        'ps-5',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/ps5-digital-edition-01_720x.jpg?v=1649431544'
    ),
    (
        'ps-5',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/ps5-digital-edition-02_720x.jpg?v=1649431544'
    );

-- Attributes: Color, Capacity
INSERT INTO
    attributes (id, name, type)
VALUES
    ('Color', 'Color', 'swatch'),
    ('Capacity', 'Capacity', 'text');

-- Attribute Items: Color
INSERT INTO
    attribute_items (id, attribute_id, display_value, value)
VALUES
    ('Green', 'Color', 'Green', '#44FF03'),
    ('Cyan', 'Color', 'Cyan', '#03FFF7'),
    ('Blue', 'Color', 'Blue', '#030BFF'),
    ('Black', 'Color', 'Black', '#000000'),
    ('White', 'Color', 'White', '#FFFFFF');

-- Attribute Items: Capacity
INSERT INTO
    attribute_items (id, attribute_id, display_value, value)
VALUES
    ('512G', 'Capacity', '512G', '512G'),
    ('1T', 'Capacity', '1T', '1T');

-- Product ↔ Attribute
INSERT INTO
    product_attributes (product_id, attribute_id)
VALUES
    ('ps-5', 'Color'),
    ('ps-5', 'Capacity');

-- Product ↔ Attribute Item
INSERT INTO
    product_attribute_items (product_id, attribute_item_id)
VALUES
    ('ps-5', 'Green'),
    ('ps-5', 'Cyan'),
    ('ps-5', 'Blue'),
    ('ps-5', 'Black'),
    ('ps-5', 'White'),
    ('ps-5', '512G'),
    ('ps-5', '1T');

-- Price
INSERT INTO
    prices (product_id, currency_label, amount)
VALUES
    ('ps-5', 'USD', 844.02);

-- ==========================
-- Product: Xbox Series S
-- ==========================
INSERT INTO
    products (
        id,
        name,
        description,
        inStock,
        category_id,
        brand
    )
VALUES
    (
        'xbox-series-s',
        'Xbox Series S 512GB',
        '<p>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer Spiele Games mit bis zu 120 Bilder pro Sekunde...</p>',
        FALSE,
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'tech'
        ),
        'Microsoft'
    );

-- Gallery Images
INSERT INTO
    galleries (product_id, url)
VALUES
    (
        'xbox-series-s',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/xbox-series-s-01_720x.jpg?v=1638460454'
    ),
    (
        'xbox-series-s',
        'https://cdn.shopify.com/s/files/1/0550/6241/0867/products/xbox-series-s-02_720x.jpg?v=1638460454'
    );

-- Product ↔ Attribute
INSERT INTO
    product_attributes (product_id, attribute_id)
VALUES
    ('xbox-series-s', 'Capacity');

-- Product ↔ Attribute Item
INSERT INTO
    product_attribute_items (product_id, attribute_item_id)
VALUES
    ('xbox-series-s', '512G');

-- Price
INSERT INTO
    prices (product_id, currency_label, amount)
VALUES
    ('xbox-series-s', 'USD', 399.00);