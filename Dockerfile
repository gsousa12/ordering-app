# Usa a imagem oficial do Node.js 18
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Copia os arquivos de definição de dependências
COPY package.json pnpm-lock.yaml ./

# Instala as dependências do projeto
RUN pnpm install

# Copia o schema do Prisma e outros arquivos necessários
COPY prisma ./prisma

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto
RUN pnpm run build

EXPOSE 8080

# Comando para rodar a aplicação
CMD [ "pnpm", "run", "start:dev" ]

# Gera o Prisma Client
RUN pnpm exec prisma generate