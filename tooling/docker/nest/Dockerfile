# ==============================================================================
# Builder stage - Installs dependencies and builds the application
# ==============================================================================
FROM base AS builder

# Install build tools needed for native Node.js modules (e.g., for bcrypt)
RUN apk add --no-cache python3 make g++

# Установи Turbo CLI (глобально или как dev-зависимость)
RUN npm install -g turbo

# Copy only the package manifests from the pruned monorepo
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# Install all dependencies
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/var/cache/npm \
    npm ci --legacy-peer-deps

# Copy the full source code of the pruned application
COPY --from=turbo /app/out/full/ .

# Declare arguments for Turborepo remote caching (optional)
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API

# Prisma generate (если путь указан)
RUN if [ -n "$PRISMA_SCHEMA_PATH" ]; then npx prisma generate --schema="$PRISMA_SCHEMA_PATH"; fi

# ✅ BUILD step
RUN --mount=type=cache,target=/root/.cache/turbo \
    turbo run build --filter=${APP_SCOPE}

# Удаляем dev-зависимости
RUN npm prune --production
