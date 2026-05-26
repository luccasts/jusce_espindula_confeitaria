-- V3__add_updated_at_missing_columns.sql

-- O V1 esqueceu de adicionar updated_at nessas duas tabelas,
-- Este V3 garante que novos ambientes já venham corretos.

-- Adiciona updated_at em option_groups
SET @exist_og := (
    SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'option_groups'
      AND column_name = 'updated_at'
);
SET @sql_og := IF(@exist_og = 0,
    'ALTER TABLE option_groups ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT 1'
);
PREPARE stmt FROM @sql_og;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Preenche updated_at com created_at nos registros já existentes
UPDATE option_groups
SET updated_at = created_at
WHERE updated_at IS NULL;

-- Adiciona updated_at em cake_options
SET @exist_co := (
    SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'cake_options'
      AND column_name = 'updated_at'
);
SET @sql_co := IF(@exist_co = 0,
    'ALTER TABLE cake_options ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT 1'
);
PREPARE stmt FROM @sql_co;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Preenche updated_at com created_at nos registros já existentes
UPDATE cake_options
SET updated_at = created_at
WHERE updated_at IS NULL;