# 🍰 Confeitaria da Samy

Sistema simples de gestão de produtos e vendas para uma confeitaria.  
Desenvolvido com **Node.js**, **Express**, **Sequelize**, **EJS** e **MySQL (via Docker)**.

---

## 📋 Funcionalidades

- ✅ Cadastro de Produtos
- ✅ Registro de Vendas
- ✅ Histórico de Vendas

---

## 🚀 Como executar o projeto

### 1. Pré-requisitos

- Node.js (versão recomendada: **18.x ou superior**)
- Docker (para rodar o MySQL localmente)

---

### 2. Subir o banco de dados MySQL com Docker Compose

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá criar um container MySQL.

---

### 3. Instalar as dependências Node.js

```bash
npm install
```

---

### 4. Configuração do Sequelize

O projeto já está configurado para conectar no MySQL.

Se precisar alterar, edite o arquivo:

```
/config/database.js
```

---

### 5. Inicializar o banco (criação automática das tabelas)

O Sequelize já faz o `sync` automático ao iniciar o app.

---

### 6. Executar o servidor

```bash
npm start
```

O sistema estará disponível em:

[http://localhost:3000](http://localhost:3000)

---

### 7. Parar o banco de dados MySQL

```bash
docker-compose down
```
