-- ==========================================================
-- POPULAÇÃO DE DADOS (INSERTS)
-- ==========================================================

-- # 1. Categorias Baseado nos botões de filtro do bolos.html
INSERT INTO categories (slug, name, display_order) VALUES 
('tradicionais', 'Bolos Tradicionais', 1),
('tematicos', 'Bolos Temáticos', 2),
('comemorativos', 'Bolos Comemorativos', 3),
('especial', 'Datas Especiais', 4);

-- # 2. Produtos (Bolos) Extraídos de BOLOS_DATA
-- Regra: Apenas tradicionais (exceto Red Velvet) têm preço fixo.
INSERT INTO products (id, name, description, price, is_price_on_request, image_url, badge, badge_class) VALUES
(1, 'Morango Natalino', NULL, NULL, TRUE, 'images/bolos/bolo_morango_LE_upscale_prime.jpg', 'Destaque', 'destaque'),
(2, 'Bolo Sonic', NULL, NULL, TRUE, 'images/bolos/bolo_sonic_infantil.jpg', NULL, NULL),
(3, 'Bolo Natalino', NULL, NULL, TRUE, 'images/bolos/bolo_natal_festivo.jpg', NULL, NULL),
(4, 'Bolo Hora de Aventura', NULL, NULL, TRUE, 'images/bolos/bolo_adventuretime.jpg', 'Popular', 'popular'),
(5, 'Bolo Homem-Aranha', NULL, NULL, TRUE, 'images/bolos/bolo_infantil_spiderman.jpg', 'Popular', 'popular'),
(6, 'Bolo Verão Praiano', NULL, NULL, TRUE, 'images/bolos/bolo_duplo_aniversario.jpg', 'Destaque', 'destaque'),
(7, 'Bolo Dia das Mães', NULL, NULL, TRUE, 'images/bolos/bolo_mae.jpg', NULL, NULL),
(8, 'Brigadeiro', NULL, 100.00, FALSE, 'images/bolos/bolo_brigadeirov2.jpeg', NULL, NULL),
(9, 'Bolo de Cenoura', NULL, 100.00, FALSE, 'images/bolos/bolo_maracuja_LE_upscale_prime.jpg', 'Destaque', 'destaque'),
(10, 'Bolo de Chocolate', NULL, 100.00, FALSE, 'images/bolos/bolo_chocolate.jpeg', 'Popular', 'popular'),
(11, 'Bolo de Maracujá', NULL, 100.00, FALSE, 'images/bolos/bolo_padrao_maracuja.jpeg', NULL, NULL),
(12, 'Red Velvet', NULL, NULL, TRUE, 'images/bolos/bolo_redvelvet.jpeg', 'Destaque', 'destaque'),
(13, 'Bolo de Limão', NULL, 100.00, FALSE, 'images/bolos/bolo_limao.jpeg', NULL, NULL),
(14, 'Bolo de Laranja', NULL, 100.00, FALSE, 'images/bolos/bolo_laranja.jfif', NULL, NULL),
(15, 'Bolo Formigueiro', NULL, 100.00, FALSE, 'images/bolos/bolo_formigueiro.jpeg', NULL, NULL);

-- # 3. Relação Produtos ↔ Categorias
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 4), (2, 3), (2, 2), (3, 4), (4, 3), (4, 2), (5, 3), (5, 2), (6, 2), (7, 4), (8, 1), (9, 1), (10, 1), (11, 1), (12, 1), (13, 1), (14, 1), (15, 1);

-- # 4. Opções de Customização (pedidos.html)
INSERT INTO cake_sizes (description, base_price, display_order) VALUES
('1 Kilo', 0.00, 1), ('2 Kilos', 0.00, 2), ('3 Kilos', 0.00, 3), ('4 Kilos', 0.00, 4);

INSERT INTO option_groups (id, name, min_selection, max_selection, is_required, is_active, display_order) VALUES
(1, 'Tipo de Massa', 1, 1, TRUE, TRUE, 1),
(2, 'Sabor da Massa', 1, 1, TRUE, TRUE, 2),
(3, 'Recheio', 1, 1, TRUE, TRUE, 3),
(4, 'Adicionais', 0, 1, FALSE, TRUE, 4);

INSERT INTO cake_options (group_id, name, description, price_extra, is_active, display_order) VALUES
(1, 'Branca', NULL, 0.00, TRUE, 1), (1, 'Chocolate', NULL, 0.00, TRUE, 2),
(2, 'Baunilha', NULL, 0.00, TRUE, 1), (2, 'Laranja', NULL, 0.00, TRUE, 2), (2, 'Limão', NULL, 0.00, TRUE, 3), (2, 'Maracujá', NULL, 0.00, TRUE, 4), (2, 'Morango', NULL, 0.00, TRUE, 5),
(3, 'Abacaxi', NULL, 0.00, TRUE, 1), (3, 'Ameixa', NULL, 0.00, TRUE, 2), (3, 'Brigadeiro', NULL, 0.00, TRUE, 3), (3, 'Brigadeiro de Oreo', NULL, 0.00, TRUE, 4), (3, 'Castanha', NULL, 0.00, TRUE, 5), (3, 'Coco', NULL, 0.00, TRUE, 6), (3, 'Leite Ninho', NULL, 0.00, TRUE, 7), (3, 'Maracujá', NULL, 0.00, TRUE, 8), (3, 'Paçoca', NULL, 0.00, TRUE, 9),
(4, 'Crocante de amendoim', NULL, 0.00, TRUE, 1), (4, 'Geleia de morango', NULL, 0.00, TRUE, 2), (4, 'Nutella', NULL, 0.00, TRUE, 3), (4, 'Pedaços de chocolate', NULL, 0.00, TRUE, 4), (4, 'Pedaços de morango', NULL, 0.00, TRUE, 5), (4, 'Pedaços de Oreo', NULL, 0.00, TRUE, 6), (4, 'KitKat', NULL, 0.00, TRUE, 7);

INSERT INTO roles (name) VALUES ('ADMIN') ON DUPLICATE KEY UPDATE name=name; 
INSERT INTO users (role_id, name, email, password_hash, is_active) VALUES
((SELECT id FROM roles WHERE name='ADMIN'), 'Administrador', 'admin@jusce.com', 
'$2a$10$w8.3fD6/Fp7vY7H6jR.gfejF9n0s76HwPZgLOm/7M/fA5Kxtq5kAG', true); 
--Gere o hash BCrypt com: BCryptPasswordEncoder().encode("suaSenha").