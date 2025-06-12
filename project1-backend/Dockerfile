FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 9000

CMD [  "npm", "run", "start:dev" ]