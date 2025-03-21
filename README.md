# Restaurante API

## Descrição
A **Restaurante API** é uma API desenvolvida para gerenciar um sistema de restaurantes. A API foi projetada com suporte a **multi-tenant**, permitindo que diferentes restaurantes utilizem a mesma infraestrutura sem interferência entre si.

### Recursos principais:
- **Criação e gerenciamento de usuários**
- **Cadastro e gerenciamento de restaurantes**
- **Criação e controle de pedidos**
- **Gestão de mesas**
- **Gestão de contas e pagamentos**
- **Gestão financeira do estabelecimento**

## Tecnologias Utilizadas
A API foi desenvolvida utilizando as seguintes tecnologias:

- **[NestJS](https://nestjs.com/)** - Framework para Node.js escalável e modular
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - Gerenciamento e interação com banco de dados
- **Railway** - Hospedagem do banco de dados PostgreSQL

## Autenticação e Segurança
A API implementa um sistema de autenticação baseado em **JWT (JSON Web Token)**, garantindo segurança no acesso:
- **Access Tokens** para autenticação das requisições
- **Refresh Tokens** para renovação dos tokens de acesso

## Autorização Baseada em Funções (Role-Based Access Control - RBAC)
A API implementa um sistema de **autorização baseado em funções**, onde cada método e endpoint só pode ser acessado por usuários com permissão adequada.

Exemplos de funções:
- **Admin** - Controle total sobre o restaurante e seus funcionários
- **Gerente** - Gerenciamento de pedidos, mesas e contas
- **Garçom** - Criação e gestão de pedidos e mesas
- **Cozinheiro** - Controle de pedidos na cozinha
- **Caixa** - Gerenciamento de pagamentos e contas

## Configuração e Execução
### 1. Clonar o Repositório
```bash
git clone https://github.com/gsousa12/ordering-app.git
cd ordering-app
```

### 2. Instalar Dependências
```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:
```env
DATABASE_URL=postgresql://seu_usuario:senha@host:porta/database
JWT_SECRET=seu_segredo
JWT_REFRESH_SECRET=seu_refresh_segredo
PORT=3000
```

### 4. Executar Migrações do Prisma
```bash
pnpx prisma migrate dev
```

### 5. Iniciar a API
```bash
pnpm run start:dev
```

## Contribuição
Contribuições são bem-vindas! Para colaborar:
1. Faça um **fork** do projeto
2. Crie uma nova **branch**: `git checkout -b minha-feature`
3. Faça as suas **alterações** e commit: `git commit -m "Minha nova feature"`
4. Envie para o repositório remoto: `git push origin minha-feature`
5. Abra um **Pull Request**

