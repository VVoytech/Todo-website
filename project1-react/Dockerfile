# Etap build – budowanie React
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# budujemy produkcyjną wersję React – używa zmiennych z .env
RUN npm run build


# Etap produkcyjny – Nginx serwujący statyczne pliki
FROM nginx:alpine

# Skopiuj zbudowany frontend
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
