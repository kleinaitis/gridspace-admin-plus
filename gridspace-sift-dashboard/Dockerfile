FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public
COPY backend/server.js .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]