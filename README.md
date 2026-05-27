# 🎂 Jusce Confeitaria

Sistema completo para gerenciamento de confeitaria, catálogo de produtos e pedidos personalizados.

O projeto é dividido em duas partes:

* **Frontend**: interface web da confeitaria e painel administrativo (Vite + HTML/CSS/JS).
* **Backend**: API REST desenvolvida com Spring Boot 4.

---

# 📚 Sumário

* [Visão Geral](#-visão-geral)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Funcionalidades](#-funcionalidades)
* [Pré-requisitos](#-pré-requisitos)
* [Como Rodar o Projeto](#-como-rodar-o-projeto)
* [Variáveis de Ambiente](#-variáveis-de-ambiente)
* [Banco de Dados](#-banco-de-dados)
* [Upload de Imagens](#-upload-de-imagens)
* [Painel Administrativo](#-painel-administrativo)
* [Principais Endpoints](#-principais-endpoints)
* [Infraestrutura de Produção](#-infraestrutura-de-produção)
* [Possíveis Problemas](#-possíveis-problemas)

---

# 📖 Visão Geral

A aplicação foi criada para atender uma confeitaria com foco em:

* Exibição de produtos com imagens hospedadas no Cloudinary.
* Personalização de bolos com seleção de tamanho, massa, recheio e adicionais.
* Organização por categorias.
* Registro de pedidos.
* Integração com WhatsApp.
* Dashboard administrativo com CRUD completo.
* Autenticação via JWT.

---

# 🛠 Tecnologias Utilizadas

## Frontend

* HTML5, CSS3, JavaScript Vanilla
* Vite 8 (bundler e dev server)
* Cloudinary (upload de imagens direto do browser)

## Backend

* Java 21
* Spring Boot 4.0.2
* Spring Security + JWT (JJWT 0.12)
* Spring Data JPA + Hibernate
* Flyway (migrations)
* Maven

## Banco de Dados

* MySQL 8.0 (local)
* TiDB (produção via Koyeb)

## Infraestrutura

* **Frontend**: Vercel
* **Backend**: Koyeb
* **Imagens**: Cloudinary

---

# 📁 Estrutura do Projeto

```bash
.
├── backend/
│   ├── src/main/java/com/jusceconfeitaria/
│   │   ├── config/          # CORS, Flyway, Security
│   │   ├── controller/      # Endpoints REST
│   │   ├── model/           # Entidades JPA
│   │   ├── repository/      # Interfaces Spring Data
│   │   ├── security/        # JWT, filtros
│   │   ├── service/         # FileStorageService
│   │   └── util/            # CreateAdminFromFileUtil
│   ├── src/main/resources/
│   │   ├── db/migrations/   # Scripts Flyway
│   │   ├── application.properties        # Config local
│   │   └── application-prod.properties   # Config produção
│   ├── admin-config.txt     # Credenciais do admin local
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── css/
│   ├── js/
│   │   ├── config.js        # URL base da API
│   │   ├── dashboard.js     # Painel admin (CRUD + Cloudinary)
│   │   ├── bolos.js
│   │   ├── pedidos.js
│   │   └── script.js
│   ├── images/
│   ├── index.html
│   ├── bolos.html
│   ├── pedidos.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── .env.development     # Variáveis locais (não sobe no git)
│   ├── .env.production      # Variáveis de produção (não sobe no git)
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# ✨ Funcionalidades

## 🧁 Catálogo de Produtos

* Listagem de bolos com imagens do Cloudinary.
* Filtro por categorias.
* Badges de destaque e popularidade.
* Produtos com preço fixo ou sob consulta.

## 🎂 Sistema de Personalização

O cliente pode:

* Escolher tamanho (kilos).
* Escolher tipo e sabor de massa.
* Escolher recheio.
* Selecionar adicionais.
* Inserir observações.
* Calcular valor total automaticamente.

## 📦 Pedidos

* Registro de pedidos no backend.
* Envio automático para WhatsApp.
* Resumo do pedido em tempo real.

## 🛠 Dashboard Administrativo

* Login com JWT.
* CRUD de produtos com upload de imagem via Cloudinary.
* CRUD de categorias.
* Soft delete de produtos.
* Interface responsiva.

---

# ⚙ Pré-requisitos

* Java JDK 21 ou superior
* MySQL 8.0
* Node.js (para o frontend com Vite)
* Git

Recomendados:

* VS Code ou IntelliJ IDEA
* MySQL Workbench

---

# 🚀 Como Rodar o Projeto

## 1️⃣ Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd nome-do-projeto
```

Você verá a estrutura com as pastas `backend/` e `frontend/` na raiz do projeto.

---

## 2️⃣ Verifique se o MySQL está rodando

Antes de qualquer coisa, confirme que o MySQL está ativo na sua máquina.

### Windows (PowerShell como administrador)

```powershell
Get-Service -Name MySQL*
```

Se aparecer `Stopped`, inicie com:

```powershell
net start MySQL80
```

Se o MySQL não estiver instalado, baixe em: https://dev.mysql.com/downloads/mysql/

---

## 3️⃣ Crie o Banco de Dados

Abra o **MySQL Workbench** ou o terminal MySQL e execute:

```sql
CREATE DATABASE jusce_espindula;
```

Verifique que foi criado:

```sql
SHOW DATABASES;
```

Deve aparecer `jusce_espindula` na lista.

---

## 4️⃣ Configure o application.properties

Abra o arquivo:

```
backend/src/main/resources/application.properties
```

Ajuste as linhas de conexão com o seu usuário e senha do MySQL local:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jusce_espindula?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

> ⚠️ O `allowPublicKeyRetrieval=true` é necessário para o MySQL 8.0. Não remova.

Verifique também se o CORS está apontando para o Vite:

```properties
app.cors.allowed-origin=http://localhost:5173
```

---

## 5️⃣ Rode o Backend

Abra um terminal na pasta raiz do projeto e execute:

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

> Na primeira execução, o Maven vai baixar todas as dependências — pode demorar alguns minutos.

Quando o backend estiver pronto, você verá no terminal:

```
Started JusceBackendApplication in X.XXX seconds
```

O backend ficará disponível em:

```
http://localhost:8081
```

> O **Flyway** criará automaticamente todas as tabelas e populará os dados iniciais (produtos, categorias e usuário admin) na primeira execução. Não é necessário rodar nenhum script SQL manualmente.

Para confirmar que está rodando, acesse no navegador:

```
http://localhost:8081/api/health
```

Deve retornar uma resposta JSON confirmando que a API está no ar.

---

## 6️⃣ Configure o Frontend

Na pasta `frontend/`, crie o arquivo `.env.development`:

```
frontend/.env.development
```

Com o seguinte conteúdo:

```env
VITE_API_BASE_URL=http://localhost:8081
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset
```

Substitua `seu_cloud_name` e `seu_upload_preset` pelos valores da sua conta no Cloudinary.

> Veja a seção [Upload de Imagens](#-upload-de-imagens) para saber como obter esses valores.

> ⚠️ Os arquivos `.env` **não vêm no clone do repositório** — eles estão no `.gitignore` por segurança. Cada desenvolvedor precisa criar o seu próprio `.env.development` manualmente com suas credenciais. Nunca suba esses arquivos para o Git.

---

## 7️⃣ Instale as Dependências do Frontend

```bash
cd frontend
npm install
```

> Isso cria a pasta `node_modules/` com todas as dependências do Vite. Só precisa rodar uma vez, ou quando o `package.json` for atualizado.

---

## 8️⃣ Rode o Frontend

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento. Você verá algo como:

```
VITE v8.0.14  ready in 168 ms

→ Local:   http://localhost:5173/
→ Network: use --host to expose
```

Acesse no navegador:

```
http://localhost:5173
```

---

## 9️⃣ Acesse o Painel Administrativo

Para acessar a área de login do painel admin:

```
http://localhost:5173/admin.html
```

Credenciais padrão criadas pelo Flyway na primeira execução:

```
Email: admin@jusce.com
Senha: admin123
```

Após o login você será redirecionado para o dashboard em:

```
http://localhost:5173/dashboard.html
```

> ⚠️ Se o login retornar "E-mail ou senha incorretos", verifique se o banco foi populado corretamente pelo Flyway. Confirme no MySQL Workbench:
> ```sql
> SELECT email FROM jusce_espindula.users;
> ```
> Deve aparecer `admin@jusce.com`.

---

# 🔐 Variáveis de Ambiente

## Frontend (`frontend/.env.development`)

| Variável                       | Descrição                          |
|--------------------------------|------------------------------------|
| `VITE_API_BASE_URL`            | URL do backend                     |
| `VITE_CLOUDINARY_CLOUD_NAME`   | Cloud name do Cloudinary           |
| `VITE_CLOUDINARY_UPLOAD_PRESET`| Upload preset (unsigned) do Cloudinary |

## Backend (`application.properties`)

| Variável                        | Descrição                        |
|---------------------------------|----------------------------------|
| `app.cors.allowed-origin`       | Origem permitida pelo CORS       |
| `app.jwt.secret`                | Chave secreta do JWT             |
| `app.cloudinary.cloud-name`     | Cloud name do Cloudinary         |
| `app.cloudinary.api-key`        | API Key do Cloudinary            |
| `app.cloudinary.api-secret`     | API Secret do Cloudinary         |

---

# 🗄 Banco de Dados

O banco é gerenciado automaticamente pelo **Flyway**.
Ao iniciar o backend, as migrations são aplicadas na ordem correta.

As migrations ficam em:

```
backend/src/main/resources/db/migrations/
```

| Arquivo                               | O que faz                                    |
|---------------------------------------|----------------------------------------------|
| `V1__baseline_schema.sql`             | Cria todas as tabelas, índices e constraints |
| `V2__initial_data.sql`                | Popula categorias, produtos e admin inicial  |
| `V3__add_missing_updated_at_columns.sql` | Adiciona colunas updated_at faltantes     |

### Para fazer alterações futuras no banco

Nunca edite V1, V2 ou V3. Crie um novo arquivo:

```
V4__descricao_da_mudanca.sql
```

O Flyway detecta e aplica automaticamente na próxima inicialização.

---

# 🖼 Upload de Imagens

O upload é feito **diretamente do frontend para o Cloudinary** (sem passar pelo backend), usando um **Upload Preset unsigned**.

### Como configurar o Cloudinary

1. Crie uma conta em [cloudinary.com](https://cloudinary.com)
2. Acesse **Settings → Upload → Upload presets**
3. Crie um preset com:
   * **Preset name:** `jusce_preset` (ou o nome que preferir)
   * **Signing mode:** `Unsigned`
4. Adicione as variáveis nos arquivos `.env`

---

# 🖥 Painel Administrativo

Arquivo principal: `frontend/admin.html` (login) e `frontend/dashboard.html` (painel)

## Funcionalidades

### Produtos

* Criar produto com imagem (upload via Cloudinary).
* Editar produto.
* Excluir produto (soft delete).
* Listar produtos com miniaturas.

### Categorias

* Criar, editar, excluir e listar categorias.

---

# 📡 Principais Endpoints

## Autenticação

| Método | Endpoint         | Descrição        | Auth |
|--------|------------------|------------------|------|
| POST   | `/api/auth/login`| Login do admin   | ❌   |

## Produtos

| Método | Endpoint              | Descrição        | Auth |
|--------|-----------------------|------------------|------|
| GET    | `/api/produtos`       | Lista produtos   | ❌   |
| GET    | `/api/produtos/{id}`  | Busca produto    | ❌   |
| POST   | `/api/produtos`       | Cria produto     | ✅   |
| PUT    | `/api/produtos/{id}`  | Atualiza produto | ✅   |
| DELETE | `/api/produtos/{id}`  | Remove produto   | ✅   |

## Categorias

| Método | Endpoint                | Descrição          | Auth |
|--------|-------------------------|--------------------|------|
| GET    | `/api/categorias`       | Lista categorias   | ❌   |
| GET    | `/api/categorias/{id}`  | Busca categoria    | ❌   |
| POST   | `/api/categorias`       | Cria categoria     | ✅   |
| PUT    | `/api/categorias/{id}`  | Atualiza categoria | ✅   |
| DELETE | `/api/categorias/{id}`  | Remove categoria   | ✅   |

## Pedidos e Customização

| Método | Endpoint                    | Descrição                | Auth |
|--------|-----------------------------|--------------------------|------|
| POST   | `/api/pedidos`              | Registra pedido          | ❌   |
| GET    | `/api/tamanhos`             | Lista tamanhos de bolo   | ❌   |
| GET    | `/api/grupos-opcoes`        | Lista grupos de opções   | ❌   |
| GET    | `/api/grupos-opcoes/{id}/opcoes` | Lista opções do grupo | ❌  |

---

# ☁ Infraestrutura de Produção

| Serviço    | Plataforma | Observação                              |
|------------|------------|-----------------------------------------|
| Frontend   | Vercel     | Deploy automático via GitHub            |
| Backend    | Koyeb      | Dockerfile, perfil `prod` ativo         |
| Banco      | TiDB       | Variáveis via env vars no Koyeb         |
| Imagens    | Cloudinary | Upload preset unsigned do frontend      |

### Variáveis de ambiente no Koyeb

Configure no painel do Koyeb → seu serviço → Environment Variables:

```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Variáveis de ambiente no Vercel

Configure no painel do Vercel → seu projeto → Settings → Environment Variables:

```
VITE_API_BASE_URL
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

---

# ⚠ Possíveis Problemas

## Backend não inicia

* MySQL rodando?
* Banco `jusce_espindula` criado?
* Usuário e senha corretos no `application.properties`?
* Porta 8081 disponível?

## Erro de CORS

O `application.properties` local deve ter:

```properties
app.cors.allowed-origin=http://localhost:5173
```

## Frontend não carrega dados

* Backend rodando na porta 8081?
* `.env.development` com `VITE_API_BASE_URL=http://localhost:8081`?
* Abra o `F12 → Console` e `F12 → Network` para verificar os erros.

## Flyway: migration com erro

Se uma migration falhou e o Flyway travar:

```sql
SET SQL_SAFE_UPDATES = 0;
DELETE FROM jusce_espindula.flyway_schema_history WHERE version = 'X' AND success = 0;
SET SQL_SAFE_UPDATES = 1;
```

Corrija o script e reinicie o backend.

## Upload de imagem não funciona

* Variáveis `VITE_CLOUDINARY_CLOUD_NAME` e `VITE_CLOUDINARY_UPLOAD_PRESET` configuradas?
* Upload preset criado como **Unsigned** no Cloudinary?
* Reiniciou o `npm run dev` após editar o `.env`?

---

# 📄 Licença

Projeto desenvolvido para uso comercial da Jusce Espíndula Confeitaria.

---

# 🚀 Deploy em Produção

O projeto usa deploy automático via GitHub. A cada `git push` na branch principal, o Vercel e o Koyeb detectam as mudanças e fazem o deploy automaticamente.

## Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com) e conecte seu repositório GitHub
2. Configure as variáveis de ambiente em **Settings → Environment Variables**:
   ```
   VITE_API_BASE_URL=https://sua-url-do-koyeb.koyeb.app
   VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset
   ```
3. A cada push no GitHub, o Vercel faz o build com `npm run build` e publica automaticamente

## Backend (Koyeb)

1. Acesse [koyeb.com](https://koyeb.com) e conecte seu repositório GitHub
2. O Koyeb usa o `Dockerfile` na raiz do `backend/` para buildar a aplicação
3. Configure as variáveis de ambiente no painel do serviço:
   ```
   SPRING_DATASOURCE_URL
   SPRING_DATASOURCE_USERNAME
   SPRING_DATASOURCE_PASSWORD
   JWT_SECRET
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   ```
4. O perfil `prod` é ativado automaticamente via variável de ambiente `SPRING_PROFILES_ACTIVE=prod`

> ⚠️ O arquivo `application-prod.properties` é carregado automaticamente quando o perfil `prod` está ativo — nunca coloque credenciais reais nele, use sempre variáveis de ambiente.