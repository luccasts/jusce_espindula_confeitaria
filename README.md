# 🎂 Jusce Confeitaria

Sistema completo para gerenciamento de confeitaria, catálogo de produtos e pedidos personalizados.

O projeto é dividido em duas partes:

* **Frontend**: interface web da confeitaria e painel administrativo.
* **Backend**: API REST desenvolvida com Spring Boot.

---

# 📚 Sumário

* [Visão Geral](#-visão-geral)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Funcionalidades](#-funcionalidades)
* [Pré-requisitos](#-pré-requisitos)
* [Como Rodar o Projeto](#-como-rodar-o-projeto)
* [Banco de Dados](#-banco-de-dados)
* [Configuração da API](#-configuração-da-api)
* [Painel Administrativo](#-painel-administrativo)
* [Principais Endpoints](#-principais-endpoints)
* [Fluxo do Sistema](#-fluxo-do-sistema)
* [Possíveis Problemas](#-possíveis-problemas)
* [Melhorias Futuras](#-melhorias-futuras)
* [Licença](#-licença)

---

# 📖 Visão Geral

A aplicação foi criada para atender uma confeitaria com foco em:

* Exibição de produtos.
* Personalização de bolos.
* Organização por categorias.
* Registro de pedidos.
* Integração com WhatsApp.
* Dashboard administrativo.
* Gerenciamento de produtos e categorias.

O sistema possui um frontend simples e leve em HTML/CSS/JavaScript puro e um backend utilizando Spring Boot com MySQL.

---

# 🛠 Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript Vanilla

## Backend

* Java 21+
* Spring Boot
* Spring Data JPA
* Maven
* MySQL

---

# 📁 Estrutura do Projeto

```bash
.
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── pedidos.html
│   ├── dashboard.html
│   └── bolos.html
│
├── README.md
├── QUICK_START.md
├── DASHBOARD_IMPLEMENTATION.md
└── bd.md
```

---

# ✨ Funcionalidades

## 🧁 Catálogo de Produtos

* Listagem de bolos.
* Categorias organizadas.
* Exibição de imagens.
* Destaques com badges.
* Produtos com preço fixo ou sob consulta.

## 🎂 Sistema de Personalização

O cliente pode:

* Escolher tamanho.
* Escolher massa.
* Escolher recheio.
* Selecionar adicionais.
* Inserir observações.
* Calcular valor total automaticamente.

## 📦 Pedidos

* Registro de pedidos no backend.
* Envio automático para WhatsApp.
* Resumo do pedido em tempo real.

## 🛠 Dashboard Administrativo

* CRUD de produtos.
* CRUD de categorias.
* Soft delete.
* Interface responsiva.
* Formulários dinâmicos.

---

# ⚙ Pré-requisitos

Antes de começar, instale:

## Necessários

* Java JDK 21 ou superior
* MySQL Server
* Git

## Recomendados

* VS Code
* IntelliJ IDEA
* MySQL Workbench

---

# 🚀 Como Rodar o Projeto

## 1️⃣ Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd nome-do-projeto
```

---

## 2️⃣ Configure o Banco de Dados

Abra o MySQL e execute:

```sql
CREATE DATABASE jusce_espindula;
```

---

## 3️⃣ Configure o application.properties

Arquivo:

```bash
backend/src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jusce_espindula?useSSL=false&serverTimezone=UTC
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

# O Flyway cuida do banco automaticamente — não altere as linhas abaixo
spring.jpa.hibernate.ddl-auto=validate
spring.sql.init.mode=never

spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migrations
spring.flyway.baseline-on-migrate=true
spring.flyway.baseline-version=0
```

---

## 4️⃣ Rode o Backend

### Windows

```powershell
cd backend
.\mvnw spring-boot:run
```

### Linux/Mac

```bash
cd backend
./mvnw spring-boot:run
```

O backend ficará disponível em:

```txt
http://localhost:8081
```

---

## 5️⃣ Rode o Frontend

Você pode:

### Opção 1 — Abrir diretamente

Abrir os arquivos HTML no navegador.

Exemplo:

```txt
frontend/index.html
```

### Opção 2 — Usar Live Server (recomendado)

No VS Code:

1. Instale a extensão Live Server.
2. Clique com botão direito em `index.html`.
3. Clique em `Open with Live Server`.

---

# 🗄 Banco de Dados

## Migrations (Flyway)

O banco de dados é gerenciado automaticamente pelo **Flyway**.
Ao iniciar o backend, ele aplica as migrations na ordem correta — sem
necessidade de rodar scripts manualmente.

As migrations ficam em:

    backend/src/main/resources/db/migrations/

| Arquivo                      | O que faz                                        |
|------------------------------|--------------------------------------------------|
| V1__baseline__schema.sql     | Cria todas as tabelas, índices e constraints     |
| V2__initial__data.sql        | Popula categorias, produtos e dados iniciais     |

### Para fazer alterações no banco no futuro

Nunca edite as tabelas diretamente nem altere os arquivos V1 e V2.
Crie um novo arquivo seguindo o padrão:

    V3__descricao_da_mudanca.sql
    V4__outra_mudanca.sql

O Flyway detecta e aplica automaticamente na próxima inicialização.

> Os arquivos `schema.sql` e `data.sql` na raiz de `resources/` são
> mantidos apenas como referência histórica e **não são mais executados**.

---

# 🔌 Configuração da API

Arquivo:

```txt
frontend/js/config.js
```

Configuração atual:

```javascript
const API_BASE_URL = 'http://localhost:8081/api';
```

Se mudar a porta do backend, atualize esse valor.

---

# 🖥 Painel Administrativo

Arquivo principal:

```txt
frontend/dashboard.html
```

## Funcionalidades

### Produtos

* Criar produto.
* Editar produto.
* Excluir produto.
* Listar produtos.

### Categorias

* Criar categoria.
* Editar categoria.
* Excluir categoria.
* Listar categorias.

## Observações

* Exclusão é feita via soft delete.
* Produtos não são apagados fisicamente do banco.

---

# 📡 Principais Endpoints

## Produtos

| Método | Endpoint             | Descrição        |
| ------ | -------------------- | ---------------- |
| GET    | `/api/produtos`      | Lista produtos   |
| GET    | `/api/produtos/{id}` | Busca produto    |
| POST   | `/api/produtos`      | Cria produto     |
| PUT    | `/api/produtos/{id}` | Atualiza produto |
| DELETE | `/api/produtos/{id}` | Remove produto   |

---

## Categorias

| Método | Endpoint               | Descrição          |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/categorias`      | Lista categorias   |
| GET    | `/api/categorias/{id}` | Busca categoria    |
| POST   | `/api/categorias`      | Cria categoria     |
| PUT    | `/api/categorias/{id}` | Atualiza categoria |
| DELETE | `/api/categorias/{id}` | Remove categoria   |

---

## Pedidos

| Método | Endpoint       | Descrição   |
| ------ | -------------- | ----------- |
| POST   | `/api/pedidos` | Cria pedido |

---

# 🔄 Fluxo do Sistema

```txt
Cliente acessa o frontend
        ↓
Seleciona opções do bolo
        ↓
Frontend calcula valor
        ↓
Pedido é enviado para API
        ↓
Pedido é registrado no banco
        ↓
Mensagem é enviada para WhatsApp
```

---

# 🧪 Testando a API

Você pode utilizar:

* Postman
* Insomnia
* Thunder Client

Exemplo:

```http
GET http://localhost:8081/api/produtos
```

---

# ⚠ Possíveis Problemas

## Backend não inicia

Verifique:

* Se o MySQL está ligado.
* Se o banco existe.
* Usuário e senha do MySQL.
* Porta 8081 disponível.

---

## Erro de CORS

O projeto já possui configuração liberando origens:

```java
@CrossOrigin(origins = "*", allowedHeaders = "*")
```

Caso ocorra:

* Reinicie o backend.
* Limpe cache do navegador.

---

## Frontend não carrega dados

Verifique:

* Backend rodando.
* URL da API.
* Console do navegador.

Abra:

```txt
F12 → Console
```

---

# 📱 Responsividade

O projeto possui suporte para:

* Desktop
* Tablet
* Mobile

---

# 🔒 Melhorias Futuras

Sugestões para evolução do projeto:

* Sistema de login.
* JWT Authentication.
* Upload de imagens.
* Painel financeiro.
* Dashboard com gráficos.
* Histórico de pedidos.
* Integração com pagamento.
* Notificações automáticas.
* Área do cliente.
* Sistema de cupons.

---

# 🤝 Contribuição

## Passos

1. Faça um fork.
2. Crie uma branch.
3. Faça commit.
4. Envie um pull request.

---

# 📄 Licença

Projeto utilizado para fins educacionais e comerciais da confeitaria.

---

# 👨‍💻 Desenvolvedor

Desenvolvido para o projeto Jusce Confeitaria.
