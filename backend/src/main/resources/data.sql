-- Roles Iniciais
INSERT INTO roles (name) VALUES ('ADMIN'), ('CUSTOMER');

-- Usuário Admin (Senha: admin123)
INSERT INTO users (role_id, name, email, password_hash) 
VALUES (1, 'Chef Boleira', 'contato@confeitaria.com', 'admin123');

-- Categorias da Vitrine
INSERT INTO categories (name, display_order) VALUES ('Bolos Simples', 1), ('Bolos de Festa', 2);

-- Produtos Prontos (Vitrine)
INSERT INTO products (category_id, name, description, price) 
VALUES (1, 'Bolo de Cenoura Tradicional', 'O clássico com cobertura de chocolate', 35.00);

-- Configuração do "Monte seu Bolo"
INSERT INTO cake_sizes (description, base_price, display_order) 
VALUES ('1 Kilo', 50.00, 1), ('2 Kilos', 90.00, 2);

INSERT INTO option_groups (name, max_selection) 
VALUES ('Escolha o Recheio', 2), ('Adicionais Extra', 5);

-- Opções de Recheio/Adicional
INSERT INTO cake_options (group_id, name) VALUES (1, 'Ninho'), (1, 'Brigadeiro'), (2, 'Morango Fresco');

-- Tabela de Preços Dinâmicos (O Morango custa diferente conforme o tamanho)
-- Morango (ID 3) no bolo de 1kg (ID 1) = 5.00
-- Morango (ID 3) no bolo de 2kg (ID 2) = 8.50
INSERT INTO option_prices_by_size (option_id, size_id, additional_price) VALUES (3, 1, 5.00), (3, 2, 8.50);