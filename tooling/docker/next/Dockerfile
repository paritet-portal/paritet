# ==============================================================================
# Base image
# ==============================================================================
FROM node:20-alpine AS base
WORKDIR /app

# Declare build arguments
ARG APP_NAME
ARG APP_SCOPE
ARG PRISMA_SCHEMA_PATH # Добавляем, даже если не используется, для единообразия

# ==============================================================================
# Turbo stage - Prune monorepo
# ==============================================================================
FROM base AS turbo
RUN npm install -g turbo
COPY . .
# --- ИЗМЕНЕНИЕ №1: Используем APP_SCOPE вместо @apps/APP_NAME ---
RUN turbo prune --scope=${APP_SCOPE} --docker

# ==============================================================================
# Builder stage - Install dependencies and build
# ==============================================================================
FROM base AS builder

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# Copy pruned manifests
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# Install dependencies
# RUN --mount=type=cache,target=/var/cache/npm npm install --legacy-peer-deps
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/var/cache/npm \
    npm ci --legacy-peer-deps


# Copy pruned source code
COPY --from=turbo /app/out/full/ .

# Declare optional remote cache args
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API

# --- ИЗМЕНЕНИЕ №2: Используем APP_SCOPE вместо @apps/APP_NAME ---
# Build the project
RUN --mount=type=cache,target=.turbo \
    --mount=type=cache,target=node_modules \
    npx turbo run build --filter=${APP_SCOPE}


# Prune dev dependencies
RUN npm prune --production

# ==============================================================================
# Runner stage - Final image
# ==============================================================================
FROM base AS runner

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# --- ИЗМЕНЕНИЕ №3: Используем APP_SCOPE для правильных путей ---
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_SCOPE}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_SCOPE}/.next/static ./apps/${APP_SCOPE}/.next/static
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_SCOPE}/public ./apps/${APP_SCOPE}/public

# --- ИЗМЕНЕНИЕ №4: Используем APP_SCOPE для рабочей директории ---
WORKDIR /app/apps/${APP_SCOPE}

CMD node server.js
