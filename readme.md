# Codificar

## Tecnologias utilizadas

### Linguagem

- **TypeScript** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"/>

### Back-End

- **Node.js v24.12.0** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"/>
- **Express** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"/>
- **Prisma** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg"/>
- **MySQL v9.7.0** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"/>

### Front-End

- **Node.js v24.12.0** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"/>
- **Vite** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"/>
- **React** <img align = "center" height = "20" width = "20" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"/>
- **Zod** 🛡️

---

## Sobre o Projeto

Esta aplicação foi desenvolvida para oferecer um CRUD simples de chamados usando um back-end em TypeScript com Express e Prisma, conectado a um banco de dados MySQL. O front-end foi construído com React e Vite, com validação de formulários utilizando Zod.
Devido o curto prazo para a entrega do teste, tive que limitar bem nas questões de validações, espero que esteja dentro das suas expectativas.

## Como rodar o projeto

### 1. Instalar dependências na raiz

```bash
npm install
```

### 2. Criar os arquivos `.env`

- Copie `server/.env.example` para `server/.env` e preencha com as informações do seu banco de dados MySQL e porta do Express.
- Copie `client/.env.example` para `client/.env` e preencha com a URL da API e a porta do front-end.

> Todas as rotas, portas e a URL da API são definidas por você no arquivo `.env` de cada workspace.

### 3. Executar migração e gerar o Prisma no `server`

Entre em `server` e execute:

```bash
cd server
npx prisma migrate dev
npx prisma generate
```

Isso aplica as migrations existentes em `server/prisma/migrations` e gera o cliente Prisma usado pelo CRUD.

### 4. Popular o banco de dados

Ainda em `server`, execute:

```bash
npx tsx db/script.ts
```

Isso insere os dados iniciais no banco. Se preferir, pode popular o banco manualmente ou por outro método.

### 5. Iniciar o back-end primeiro

Ainda no diretório `server`, inicie o Express:

```bash
npm run dev
```

Ou, a partir da raiz do projeto:

```bash
npm run dev --workspace=server
```

### 6. Iniciar o front-end

Depois que o servidor estiver rodando, inicie o cliente:

```bash
cd ../client
npm run dev
```

Ou, a partir da raiz do projeto:

```bash
npm run dev --workspace=client
```

### 7. Acessar a aplicação

Abra o navegador em http://localhost na porta informada.

---

## Observações

- O `node_modules` está centralizado na raiz do projeto usando npm workspaces.
- A aplicação deve funcionar com MySQL 9.x ou superior.
- O gerenciador de pacotes utilizado foi o NPM na versão 11.6.2
