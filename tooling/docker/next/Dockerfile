# ==============================================================================
# Builder stage - Install dependencies and build
# ==============================================================================
FROM base AS builder

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# ✅ УСТАНОВИ TURBO CLI
RUN npm install -g turbo

# Copy pruned manifests
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# Install dependencies
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/var/cache/npm \
    npm ci --legacy-peer-deps

# Copy pruned source code
COPY --from=turbo /app/out/full/ .

# Declare optional remote cache args
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API

# ✅ Запускаем turbo напрямую (уже установлен глобально)
RUN --mount=type=cache,target=/root/.cache/turbo \
    turbo run build --filter=${APP_SCOPE}

# Prune dev dependencies
RUN npm prune --production
