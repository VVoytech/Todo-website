FROM node:18-alpine AS build

# Definiuj argumenty budowania dla zmiennych środowiskowych
ARG VITE_API_URL
ARG VITE_OTHER_VAR

# Ustaw zmienne środowiskowe podczas procesu budowania
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_OTHER_VAR=$VITE_OTHER_VAR

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Buduj aplikację z dostępnymi zmiennymi
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
