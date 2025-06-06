# apps/api/Dockerfile

# 1. Base image
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# 2. Dependencies
FROM base AS dependencies
COPY package.json package-lock.json* ./
RUN npm install

# 3. Build
FROM base AS build
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
# Копіюємо .env з кореня, якщо він потрібен при білді
# COPY ../../.env ./.env 
RUN npm run build

# 4. Production
FROM base AS production
COPY --from=build /usr/src/app/dist ./dist
COPY package.json package-lock.json* ./
# Встановлюємо лише production залежності
RUN npm ci --omit=dev
CMD ["node", "dist/main"]