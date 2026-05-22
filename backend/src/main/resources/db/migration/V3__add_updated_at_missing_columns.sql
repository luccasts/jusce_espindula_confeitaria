-- V3__add_updated_at_missing_columns.sql

-- O V1 esqueceu de adicionar updated_at nessas duas tabelas,
-- o que impedia o projeto de iniciar.
-- Este V3 garante que novos ambientes já venham corretos.

-- Adiciona updated_at em option_groups
ALTER TABLE option_groups
    ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- Preenche updated_at com created_at nos registros já existentes
UPDATE option_groups
SET updated_at = created_at
WHERE updated_at IS NULL;

-- Adiciona updated_at em cake_options
ALTER TABLE cake_options
    ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP;

-- Preenche updated_at com created_at nos registros já existentes
UPDATE cake_options
SET updated_at = created_at
WHERE updated_at IS NULL;