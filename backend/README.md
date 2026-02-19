# 🍰 API Backend - Confeitaria Jusce Espindula

Este projeto consiste na API RESTFUL desenvolvida com **Spring Boot** para gerenciar o catálogo de produtos, vendas e usuários da Confeitaria Jusce Espindula.

## 🛠️ Tecnologias Utilizadas
* **Java 21 (LTS)**
* **Spring Boot 3.x**
* **MySQL** (Banco de Dados)
* **Maven** (Gerenciamento de dependências)

---
## ⚙️ Pré-requisitos e Instalação

Para rodar este projeto, você precisa ter o Java (JDK) e o MySQL instalados. Se você ainda não tem, siga o passo a passo abaixo:

### 1. Java Development Kit (JDK) 21

O projeto foi desenvolvido utilizando **Java 21 (LTS)**.

* **Como Baixar:**
    * Acesse o site da [Oracle](https://www.oracle.com/java/technologies/downloads/#java21) ou do [Eclipse Adoptium](https://adoptium.net/).
    * Selecione seu sistema operacional (Windows, macOS ou Linux).
    * Baixe o instalador (ex: `.exe` ou `.msi` para Windows).
* **Instalação:**
    * Execute o arquivo baixado e siga as instruções ("Next, Next, Finish").
* **Verificação:**
    * Abra seu terminal (CMD ou PowerShell) e digite:
        ```bash
        java -version
        ```
    * Deve aparecer algo como: `java version "21.0.x"`.

### 2. MySQL Server (Banco de Dados)

O banco de dados utilizado é o **MySQL**.

* **Como Baixar:**
    * Acesse a página do [MySQL Installer](https://dev.mysql.com/downloads/installer/).
    * Baixe a versão **"Community"**.
* **Instalação:**
    * Execute o instalador. Escolha a opção **"Server only"** ou **"Developer Default"** (que inclui o Workbench, ferramenta visual recomendada).
    * **IMPORTANTE:** Durante a configuração, você definirá uma senha para o usuário `root`. **Anote essa senha**, pois precisará dela no passo de configuração.

---

## 🚀 Guia de Configuração e Execução
Com as ferramentas instaladas, siga os passos abaixo para colocar a API no ar.

### 1. Preparar o Banco de Dados

O código precisa de um banco de dados vazio esperando por ele.

1.  Abra o programa **MySQL Workbench** (ou o terminal do MySQL).
2.  Abra uma nova janela de consulta SQL (geralmente um ícone de "SQL" ou "Query").
3.  Copie, cole e execute o comando abaixo:
    ```sql
    CREATE DATABASE jusce_espindula;
    ```
    *(Se der certo, aparecerá uma mensagem verde de confirmação na parte de baixo do programa).*



### 2. Configurar Credenciais

O sistema precisa saber a senha do seu banco para conseguir salvar os dados.

1.  Entre na pasta do projeto e navegue até: `backend/src/main/resources/`.
2.  Lá existe um arquivo chamado `application.properties`.
3.  Abra esse arquivo com o **Bloco de Notas** ou seu editor de código (VS Code).
4.  Procure as linhas `username` e `password` e mude para os seus dados:

    **Como está no arquivo:**
    ```properties
    spring.datasource.username=root
    spring.datasource.password=123456
    ```

    **O que você deve fazer:**
    Troque `123456` pela senha que você criou na instalação do MySQL. Se seu usuário não for `root`, troque também.
5.  Salve o arquivo.
### 3. Execução

Agora vamos rodar o servidor.

1.  Abra o terminal.
2.  Entre na pasta `backend` do projeto:
    ```powershell
    cd backend
    ```
3.  Rode o comando de inicialização:

    * **Se você usa Windows:**
        ```powershell
        ./mvnw spring-boot:run
        ```
    * **Se você usa Mac ou Linux:**
        ```bash
        ./mvnw spring-boot:run
        ```

> **Dica:** Na primeira vez, vai demorar uns minutos porque ele está baixando as ferramentas da internet. Quando aparecer a mensagem: `Tomcat started on port 8081`, significa que **está funcionando!** 🎉

---

## 🔌 Documentação da Rota de Teste (Integração)

Para validar se o Frontend consegue se comunicar com o Backend, utilize o endpoint de teste abaixo.

### Detalhes do Endpoint

* **URL:** `http://localhost:8081/api/ola`
* **Método:** `GET`
* **CORS:** Já configurado para aceitar qualquer origem (`*`).


---

