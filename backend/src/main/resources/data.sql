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
INSERT INTO products (id, name, price, is_price_on_request, image_url, badge, badge_class) VALUES
(1, 'Morango Natalino', NULL, TRUE, 'images/bolos/bolo_morango_LE_upscale_prime.jpg', 'Destaque', 'destaque'),
(2, 'Bolo Sonic', NULL, TRUE, 'images/bolos/bolo_sonic_infantil.jpg', NULL, NULL),
(3, 'Bolo Natalino', NULL, TRUE, 'images/bolos/bolo_natal_festivo.jpg', NULL, NULL),
(4, 'Bolo Hora de Aventura', NULL, TRUE, 'images/bolos/bolo_adventuretime.jpg', 'Popular', 'popular'),
(5, 'Bolo Homem-Aranha', NULL, TRUE, 'images/bolos/bolo_infantil_spiderman.jpg', 'Popular', 'popular'),
(6, 'Bolo Verão Praiano', NULL, TRUE, 'images/bolos/bolo_duplo_aniversario.jpg', 'Destaque', 'destaque'),
(7, 'Bolo Dia das Mães', NULL, TRUE, 'images/bolos/bolo_mae.jpg', NULL, NULL),
(8, 'Brigadeiro', 100.00, FALSE, 'images/bolos/bolo_brigadeirov2.jpeg', NULL, NULL),
(9, 'Bolo de Cenoura', 100.00, FALSE, 'images/bolos/bolo_maracuja_LE_upscale_prime.jpg', 'Destaque', 'destaque'),
(10, 'Bolo de Chocolate', 100.00, FALSE, 'images/bolos/bolo_chocolate.jpeg', 'Popular', 'popular'),
(11, 'Bolo de Maracujá', 100.00, FALSE, 'images/bolos/bolo_padrao_maracuja.jpeg', NULL, NULL),
(12, 'Red Velvet', NULL, TRUE, 'images/bolos/bolo_redvelvet.jpeg', 'Destaque', 'destaque'),
(13, 'Bolo de Limão', 100.00, FALSE, 'images/bolos/bolo_limao.jpeg', NULL, NULL),
(14, 'Bolo de Laranja', 100.00, FALSE, 'images/bolos/bolo_laranja.jfif', NULL, NULL),
(15, 'Bolo Formigueiro', 100.00, FALSE, 'images/bolos/bolo_formigueiro.jpeg', NULL, NULL);

-- # 3. Relação Produtos ↔ Categorias
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 4), (2, 3), (2, 2), (3, 4), (4, 3), (4, 2), (5, 3), (5, 2), (6, 2), (7, 4), (8, 1), (9, 1), (10, 1), (11, 1), (12, 1), (13, 1), (14, 1), (15, 1);

-- # 4. Opções de Customização (pedidos.html)
INSERT INTO cake_sizes (description, base_price, display_order) VALUES
('1 Kilo', 0.00, 1), ('2 Kilos', 0.00, 2), ('3 Kilos', 0.00, 3), ('4 Kilos', 0.00, 4);

INSERT INTO option_groups (id, name, min_selection, max_selection, is_required) VALUES
(1, 'Tipo de Massa', 1, 1, TRUE),
(2, 'Sabor da Massa', 1, 1, TRUE),
(3, 'Recheio', 1, 1, TRUE),
(4, 'Adicionais', 0, 1, FALSE);

INSERT INTO cake_options (group_id, name) VALUES
(1, 'Branca'), (1, 'Chocolate'),
(2, 'Baunilha'), (2, 'Laranja'), (2, 'Limão'), (2, 'Maracujá'), (2, 'Morango'),
(3, 'Abacaxi'), (3, 'Ameixa'), (3, 'Brigadeiro'), (3, 'Brigadeiro de Oreo'), (3, 'Castanha'), (3, 'Coco'), (3, 'Leite Ninho'), (3, 'Maracujá'), (3, 'Paçoca'),
(4, 'Crocante de amendoim'), (4, 'Geleia de morango'), (4, 'Nutella'), (4, 'Pedaços de chocolate'), (4, 'Pedaços de morango'), (4, 'Pedaços de Oreo'), (4, 'KitKat');