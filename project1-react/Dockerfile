FROM node:18-alpine AS build

# Definiuj argumenty budowania dla zmiennych środowiskowych
ARG REACT_APP_API_BASE_URL

# Ustaw zmienne środowiskowe podczas procesu budowania
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

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
