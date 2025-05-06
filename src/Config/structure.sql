CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

CREATE TABLE
    products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        inStock BOOLEAN NOT NULL,
        description TEXT,
        category_id INT,
        brand VARCHAR(255),
        FOREIGN KEY (category_id) REFERENCES categories (id)
    );

CREATE TABLE
    galleries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(255),
        url TEXT,
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

CREATE TABLE
    attributes (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL
    );

CREATE TABLE
    attribute_items (
        id VARCHAR(255) PRIMARY KEY,
        attribute_id VARCHAR(255),
        displayValue VARCHAR(255),
        value VARCHAR(255),
        FOREIGN KEY (attribute_id) REFERENCES attributes (id)
    );

CREATE TABLE
    product_attributes (
        product_id VARCHAR(255),
        attribute_id VARCHAR(255),
        PRIMARY KEY (product_id, attribute_id), -- Composite Primary Key or add unique constraint
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (attribute_id) REFERENCES attributes (id)
    );

CREATE TABLE
    product_attribute_items (
        product_id VARCHAR(255),
        attribute_item_id VARCHAR(255),
        PRIMARY KEY (product_id, attribute_item_id),
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (attribute_item_id) REFERENCES attribute_items (id)
    );

CREATE TABLE
    currencies (
        label VARCHAR(10) PRIMARY KEY,
        symbol VARCHAR(5) NOT NULL
    );

CREATE TABLE
    prices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(255),
        currency_label VARCHAR(10),
        amount DECIMAL(10, 2),
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (currency_label) REFERENCES currencies (label)
    );