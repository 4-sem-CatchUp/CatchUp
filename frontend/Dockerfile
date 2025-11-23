# --- 1) Build stage ---
FROM node:20-alpine AS build

# Sæt arbejdsdirectory
WORKDIR /app

# Kopiér dependency-filer
COPY package*.json ./

# Installer dependencies
RUN npm install

# Kopiér resten af projektet
COPY . .

# Byg production bundle
RUN npm run build


# --- 2) Serve stage (Nginx) ---
FROM nginx:alpine

# Slet default Nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Kopiér build-output fra build-staget
COPY --from=build /app/dist /usr/share/nginx/html

# Eksponer port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
