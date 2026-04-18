-- 1. Roles & Users
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(150),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 2. Storefront (Products)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 3. Build Your Cake (Customization)
CREATE TABLE cake_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE option_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    min_selection INT DEFAULT 1,
    max_selection INT DEFAULT 2,
    is_required BOOLEAN DEFAULT TRUE
);

CREATE TABLE cake_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_option_group FOREIGN KEY (group_id) REFERENCES option_groups(id)
);

CREATE TABLE option_prices_by_size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    option_id INT NOT NULL,
    size_id INT NOT NULL,
    additional_price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_price_option FOREIGN KEY (option_id) REFERENCES cake_options(id),
    CONSTRAINT fk_price_size FOREIGN KEY (size_id) REFERENCES cake_sizes(id)
);

-- 4. Logs
CREATE TABLE order_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    order_details TEXT,
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(id)
);