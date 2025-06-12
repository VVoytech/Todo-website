# Etap 1: Budowanie frontendu
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Tutaj .env jest wykorzystywany przez np. react-scripts
RUN npm run build

# Etap 2: Serwowanie przez Nginx
FROM nginx:alpine

# Skopiuj zbudowaną aplikację z poprzedniego etapu
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
