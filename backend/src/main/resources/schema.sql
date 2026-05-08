-- ==========================================================
-- ESTRUTURA DO BANCO DE DADOS (SCHEMA)
-- ==========================================================

-- 1. Roles & Users
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(150),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);

-- 2. Storefront (Products & Categories)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,

    -- NULL permitido para produtos sob consulta
    price DECIMAL(10,2) DEFAULT NULL,

    is_price_on_request BOOLEAN DEFAULT FALSE,

    image_url VARCHAR(255),
    badge VARCHAR(50),
    badge_class VARCHAR(50),

    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (product_id, category_id),

    CONSTRAINT fk_pc_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pc_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);

-- 3. Customization (Build Your Cake)
CREATE TABLE cake_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    description VARCHAR(100) NOT NULL,

    -- Valores exemplo
    base_price DECIMAL(10,2) NOT NULL,

    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE option_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    min_selection INT DEFAULT 0,
    max_selection INT DEFAULT 1,

    is_required BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cake_options (
    id INT AUTO_INCREMENT PRIMARY KEY,

    group_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_option_group
        FOREIGN KEY (group_id)
        REFERENCES option_groups(id)
);

CREATE TABLE option_prices_by_size (
    id INT AUTO_INCREMENT PRIMARY KEY,

    option_id INT NOT NULL,
    size_id INT NOT NULL,

    additional_price DECIMAL(10,2) NOT NULL,

    CONSTRAINT uq_option_size
        UNIQUE (option_id, size_id),

    CONSTRAINT fk_price_option
        FOREIGN KEY (option_id)
        REFERENCES cake_options(id),

    CONSTRAINT fk_price_size
        FOREIGN KEY (size_id)
        REFERENCES cake_sizes(id)
);

-- 4. Orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    customer_name VARCHAR(150),
    customer_phone VARCHAR(20),

    cake_size_id INT NOT NULL,

    total_price DECIMAL(10,2) NOT NULL,

    observations TEXT,

    status ENUM(
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_order_size
        FOREIGN KEY (cake_size_id)
        REFERENCES cake_sizes(id)
);

CREATE TABLE order_selections (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,
    option_id INT NOT NULL,

    CONSTRAINT fk_selection_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_selection_option
        FOREIGN KEY (option_id)
        REFERENCES cake_options(id)
);

-- ==========================================================
-- ÍNDICES
-- ==========================================================

CREATE INDEX idx_users_role_id
    ON users(role_id);

CREATE INDEX idx_cake_options_group_id
    ON cake_options(group_id);

CREATE INDEX idx_option_prices_option_id
    ON option_prices_by_size(option_id);

CREATE INDEX idx_option_prices_size_id
    ON option_prices_by_size(size_id);

CREATE INDEX idx_orders_user_id
    ON orders(user_id);

CREATE INDEX idx_orders_size_id
    ON orders(cake_size_id);

CREATE INDEX idx_order_selections_order_id
    ON order_selections(order_id);

CREATE INDEX idx_order_selections_option_id
    ON order_selections(option_id);