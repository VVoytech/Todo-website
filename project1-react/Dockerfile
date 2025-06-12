FROM node:18-alpine as build

WORKDIR /app

# Dodaj pliki projektu i zainstaluj zależności
COPY package*.json ./
RUN npm install

# Skopiuj resztę kodu i .env do obrazu (plik .env będzie dostarczony z kontekstem budowania)
COPY . .

# Build aplikacji – .env zostanie odczytany przez React na tym etapie
RUN npm run build

# --- Druga faza, tylko zbudowane statyczne pliki ---
FROM nginx:alpine

# Skopiuj zbudowany frontend do katalogu Nginxa
COPY --from=build /app/build /usr/share/nginx/html

# Otwórz port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
