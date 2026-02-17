# 🗄️ Documentação de Dados e Infraestrutura - Confeitaria

## 🏗️ Estrutura do Banco de Dados
O banco foi modelado para gerenciar o catálogo de **bolos e seus adicionais**.

### Tabelas Principais:
* **users**: Gestão de acesso e controle de papéis (Admin/Cliente).
* **categorias**: Segmentação dos bolos (Simples, Recheados, Festa).
* **produtos**: O catálogo principal de bolos.
* **adicionais**: Itens extras para personalização (Morangos, Caldas, Nozes, etc.).
* **produtos_adicionais**: Tabela de junção que vincula os adicionais aos produtos.

---

## 🚀 Como Rodar (Setup)

### 1. Preparação do Ambiente
* Certifique-se de ter o **MySQL Server** rodando.
* Crie o banco de dados manualmente uma única vez:
  ```sql
  CREATE DATABASE jusce_espindula;
  ```

### 2. Automação via Spring Boot
Os scripts de estrutura e dados estão localizados em: `backend/src/main/resources/`.
* **`schema.sql`**: Define a criação de tabelas, chaves primárias e relacionamentos.
* **`data.sql`**: Popula o banco com categorias e bolos reais para teste.

### 3. Configuração de Conexão
No arquivo `application.properties`, utilize as seguintes chaves para garantir que o Spring reconheça seus scripts:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jusce_espindula?useSSL=false&serverTimezone=UTC
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# Inicialização automática de scripts
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=none
```

---

## 📝 Notas para o Back-end
* **Nomenclatura:** O banco utiliza `snake_case`. No Java, utilize `@Column(name = "nome_da_coluna")` para mapear as propriedades.
* **Auditoria:** As colunas `tempo_criacao` e `ultima_atualizacao` são preenchidas automaticamente pelo banco.

### 2. Automação via Spring Boot
Os scripts de estrutura e dados estão localizados em: `backend/src/main/resources/`.
* **`schema.sql`**: Define a criação de tabelas, chaves primárias e relacionamentos.
* **`data.sql`**: Popula o banco com categorias e bolos reais para teste.

### 3. Configuração de Conexão
No arquivo `application.properties`, utilize as seguintes chaves para garantir que o Spring reconheça seus scripts:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jusce_espindula?useSSL=false&serverTimezone=UTC
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# Inicialização automática de scripts
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=none
```

