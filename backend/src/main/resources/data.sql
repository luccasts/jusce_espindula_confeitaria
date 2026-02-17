-- 1. Inserindo o Usuário Administrador (Responsável pelo cadastro)
-- Nota: A senha 'admin123' é apenas para teste local.
INSERT INTO users (email, senha, role) 
VALUES ('contato@confeitaria.com', 'admin123', 'ADMIN');

-- 2. Categorias focadas apenas em Bolos
INSERT INTO categorias (nome) VALUES ('Bolos Simples');
INSERT INTO categorias (nome) VALUES ('Bolos Recheados');
INSERT INTO categorias (nome) VALUES ('Bolos de Festa');

-- 3. Adicionais específicos para Bolos
INSERT INTO adicionais (nome, preco) VALUES ('Morango Fresco', 4.50);
INSERT INTO adicionais (nome, preco) VALUES ('Calda de Chocolate Belga', 7.00);
INSERT INTO adicionais (nome, preco) VALUES ('Extra de Chantilly', 3.00);
INSERT INTO adicionais (nome, preco) VALUES ('Granulado Colorido', 2.00);
INSERT INTO adicionais (nome, preco) VALUES ('Nozes Picadas', 6.50);

-- 4. Produtos (Bolos)
-- Vinculados ao User ID 1 e às suas respectivas categorias
INSERT INTO produtos (nome, preco, id_categorias, id_users) 
VALUES ('Bolo de Cenoura', 35.00, 1, 1);

INSERT INTO produtos (nome, preco, id_categorias, id_users) 
VALUES ('Bolo de Chocolate Supremo', 55.00, 2, 1);

INSERT INTO produtos (nome, preco, id_categorias, id_users) 
VALUES ('Red Velvet Especial', 85.00, 3, 1);

-- 5. Vinculando Adicionais aos Bolos (Tabela Intermediária)
-- Bolo de Cenoura (ID 1) recebe Calda de Chocolate (ID 2)
INSERT INTO produtos_adicionais (id_produto, id_adicionais) VALUES (1, 2);

-- Bolo de Chocolate Supremo (ID 2) recebe Morango (ID 1) e Chantilly (ID 3)
INSERT INTO produtos_adicionais (id_produto, id_adicionais) VALUES (2, 1);
INSERT INTO produtos_adicionais (id_produto, id_adicionais) VALUES (2, 3);

-- Red Velvet (ID 3) recebe Nozes (ID 5)
INSERT INTO produtos_adicionais (id_produto, id_adicionais) VALUES (3, 5);