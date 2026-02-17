-- 1. Tabela de Usuários (Independente)
CREATE TABLE users (
    id_users INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- ex: 'ADMIN', 'CLIENTE'
    tempo_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabela de Categorias (Independente)
CREATE TABLE categorias (
    id_categorias INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tempo_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabela de Adicionais (Independente)
CREATE TABLE adicionais (
    id_adicionais INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    tempo_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Tabela de Produtos (Depende de Users e Categorias)
CREATE TABLE produtos (
    id_produtos INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    id_categorias INT NOT NULL,
    id_users INT NOT NULL,
    tempo_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Chaves Estrangeiras (Relacionamentos)
    CONSTRAINT fk_produtos_categoria FOREIGN KEY (id_categorias) REFERENCES categorias(id_categorias),
    CONSTRAINT fk_produtos_usuario FOREIGN KEY (id_users) REFERENCES users(id_users)
);

-- 5. Tabela Intermediária (Depende de Produtos e Adicionais)
CREATE TABLE produtos_adicionais (
    id_produtos_adicionais INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_adicionais INT NOT NULL,
    tempo_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Chaves Estrangeiras
    CONSTRAINT fk_pa_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produtos),
    CONSTRAINT fk_pa_adicional FOREIGN KEY (id_adicionais) REFERENCES adicionais(id_adicionais)
);