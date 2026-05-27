-- V4__add_unique_name_to_categories.sql
-- Adiciona constraint UNIQUE na coluna `name` da tabela `categories`,
-- alinhando o banco com a anotação @Column(unique = true) em Category.java.

ALTER TABLE categories
    ADD CONSTRAINT uq_categories_name UNIQUE (name);