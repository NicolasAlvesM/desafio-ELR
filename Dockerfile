FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate:db_clients

RUN npm run build

RUN npm prune --production

RUN npm run prisma:generate:db_clients

EXPOSE 3000

CMD ["node", "dist/main"]