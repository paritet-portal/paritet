# -----------------------------------------------------------------------------
# Этап 1: Установка зависимостей (deps)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN apk add --no-cache libc6-compat
RUN npm install 

# -----------------------------------------------------------------------------
# Этап 2: Сборка приложения (builder)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
ARG APP_NAME
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx nx build ${APP_NAME} --configuration=production


# -----------------------------------------------------------------------------
# Этап 3: Финальный образ (runner)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
ARG APP_NAME 
WORKDIR /app

ENV APP_NAME=${APP_NAME}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs


COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static/ ./apps/${APP_NAME}/.next/static/
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public/ ./apps/${APP_NAME}/public/

USER nextjs


CMD node apps/$APP_NAME/server.js
