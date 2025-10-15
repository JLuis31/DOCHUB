# Etapa 1: build Angular
FROM node:20 AS build
WORKDIR /app

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar
COPY . .
RUN npm run build --prod

# Etapa 2: servir con Nginx
FROM nginx:latest
COPY --from=build /app/dist/dochub-frontend/ /usr/share/nginx/html

# Exponer el puerto 80 para servir la app
EXPOSE 80

# (Opcional) Cambiar configuración por defecto de Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf
