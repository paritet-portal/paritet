# === Етап 1: Встановлення залежностей (Installer) ===
FROM node:20-slim AS installer
WORKDIR /app
RUN corepack enable
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# === Етап 2: Збірка проєкту (Builder) ===
FROM node:20-slim AS builder
WORKDIR /app
RUN corepack enable
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Збірка проєкту (через переданий APP_NAME)
ARG APP_NAME
RUN npx nx build apps/${APP_NAME} --skip-nx-cache

# === Етап 3: Фінальний образ (Runner) ===
FROM node:20-slim AS runner
WORKDIR /app
RUN groupadd -r nodejs && useradd -r -g nodejs nestjs

# Копіюємо залежності тільки runtime
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json

# Копіюємо білд проєкту
ARG APP_NAME
COPY --from=builder /app/apps/${APP_NAME}/dist ./dist

USER nestjs
CMD ["node", "dist/main.js"]
