FROM node:20-alpine AS base
WORKDIR /app
FROM base AS turbo

COPY . .
ARG APP_SCOPE
RUN npx turbo prune --scope=${APP_SCOPE} --docker

RUN echo "DEBUG [turbo stage]: Recursive listing of /app/out for APP_SCOPE=${APP_SCOPE}" && \
    (ls -R /app/out || find /app/out -print || echo 'Could not list /app/out')

FROM base AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

COPY --from=turbo /app/out/full/package.json ./package.json

# --- ДОБАВЛЕНО: Показать содержимое package.json, используемого для установки ---
RUN echo "DEBUG [builder stage]: Content of /app/package.json (from turbo prune):" && (cat /app/package.json || echo "/app/package.json not found or empty")

COPY --from=turbo /app/out/package-lock.json ./package-lock.json


RUN echo "DEBUG [builder stage]: Listing of /app after copying package manifests:" && (ls -la /app || true)

RUN --mount=type=cache,target=/root/.npm npm install --legacy-peer-deps

# --- ДОБАВЛЕНО: Проверить наличие ключевых пакетов NestJS после npm install ---
RUN echo "DEBUG [builder stage]: Listing /app/node_modules/@nestjs/ after npm install:" && \
    (ls -lA /app/node_modules/@nestjs/ || echo "/app/node_modules/@nestjs/ NOT FOUND or empty") && \
    echo "DEBUG [builder stage]: Listing /app/node_modules/rxjs/ after npm install:" && \
    (ls -lA /app/node_modules/rxjs/ || echo "/app/node_modules/rxjs/ NOT FOUND or empty") && \
    echo "DEBUG [builder stage]: Listing /app/node_modules/reflect-metadata/ after npm install:" && \
    (ls -lA /app/node_modules/reflect-metadata/ || echo "/app/node_modules/reflect-metadata/ NOT FOUND or empty")

COPY --from=turbo /app/out/full/ .

RUN echo "DEBUG [builder stage]: Recursive listing of /app after copying full source code:" && (ls -R /app || true)

ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API
# ... на этапе builder, ПОСЛЕ всех COPY и npm install ...
# ... и ПЕРЕД RUN npx turbo run deploy:build ...

ARG APP_SCOPE

# ... на этапе builder, перед RUN npx turbo run deploy:build ...
RUN echo "DEBUG [builder]: Current directory: $(pwd)" && \
    echo "DEBUG [builder]: Listing /app/node_modules/.bin/ (symlinks for CLIs)" && \
    (ls -la /app/node_modules/.bin/ || echo "/app/node_modules/.bin/ NOT FOUND or empty") && \
    echo "DEBUG [builder]: Listing /app/node_modules/@nestjs/cli/ (checking for @nestjs/cli package)" && \
    (ls -laR /app/node_modules/@nestjs/cli/ || echo "/app/node_modules/@nestjs/cli/ NOT FOUND or empty") && \
    echo "DEBUG [builder]: Listing /app/node_modules/typescript/ (checking for typescript package)" && \
    (ls -laR /app/node_modules/typescript/ || echo "/app/node_modules/typescript/ NOT FOUND or empty")
# ИСПОЛЬЗУЙТЕ ${APP_SCOPE} БЕЗ @apps/ ЕСЛИ ИМЕНА ПАКЕТОВ ПРОСТЫЕ



ENV TURBO_TOKEN=${TURBO_TOKEN}
ENV TURBO_TEAMID=${TURBO_TEAMID}
ENV TURBO_API=${TURBO_API}


RUN npx turbo run deploy:build --filter=${APP_SCOPE}
# ...

RUN npm prune --omit=dev

FROM base AS runner
ARG APP_SCOPE

WORKDIR /app

RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules

COPY --from=builder --chown=appuser:appuser /app/apps/${APP_SCOPE}/dist ./apps/${APP_SCOPE}/dist

COPY --from=builder --chown=appuser:appuser /app/apps/${APP_SCOPE}/package.json ./apps/${APP_SCOPE}/package.json

# COPY --from=builder --chown=appuser:appuser /app/apps/${APP_SCOPE}/entrypoint.sh ./apps/${APP_SCOPE}/entrypoint.sh
COPY --chown=appuser:appuser apps/${APP_SCOPE}/entrypoint.sh ./apps/${APP_SCOPE}/entrypoint.sh

RUN chmod +x ./apps/${APP_SCOPE}/entrypoint.sh

USER appuser

WORKDIR /app/apps/${APP_SCOPE}


ENTRYPOINT ["./entrypoint.sh"]















# # ==============================================================================
# # Base image
# # ==============================================================================
# FROM node:20-alpine AS base
# WORKDIR /app # WORKDIR /app установлен здесь и будет наследоваться
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# # ==============================================================================
# # Turbo stage: Prune (работаем в /app, результат prune будет в /app/out)
# # ==============================================================================
# FROM base AS turbo
# # WORKDIR /app # Уже унаследован от base
# RUN npm install -g turbo
# COPY . . # Копируем все из контекста в /app
# ARG APP_SCOPE
# RUN turbo prune --scope=${APP_SCOPE} --docker # Результат будет в /app/out

# # Отладочный вывод
# RUN echo "DEBUG [turbo stage]: Recursive listing of /app/out for APP_SCOPE=${APP_SCOPE}" && (ls -R /app/out || find /app/out -print || echo 'Could not list /app/out')

# # ==============================================================================
# # Builder stage: Dependencies & Build
# # ==============================================================================
# FROM base AS builder
# # WORKDIR /app # Уже унаследован от base

# RUN apk add --no-cache libc6-compat python3 make g++

# # 1. Копируем package.json из /app/out/full/ (на этапе 'turbo') в /app (текущий WORKDIR builder'а)
# COPY --from=turbo /app/out/full/package.json ./package.json

# # 2. Копируем package-lock.json из /app/out/ (на этапе 'turbo') в /app (текущий WORKDIR builder'а)
# COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# # Отладочный вывод
# RUN echo "DEBUG [builder stage]: Listing of /app after copying package manifests:" && (ls -la /app || true)

# # 3. Устанавливаем ВСЕ зависимости
# RUN --mount=type=cache,target=/root/.npm npm install --legacy-peer-deps

# # 4. Копируем ПОЛНЫЙ код отфильтрованного приложения из /app/out/full/ (с этапа 'turbo') в /app
# COPY --from=turbo /app/out/full/ .

# # Отладочный вывод
# RUN echo "DEBUG [builder stage]: Recursive listing of /app after copying full source code:" && (ls -R /app || true)

# # Аргументы для Turborepo Remote Caching
# ARG TURBO_TOKEN
# ARG TURBO_TEAMID
# ARG TURBO_API
# ARG APP_SCOPE

# # 5. Собираем приложение
# RUN echo "Building application for scope: ${APP_SCOPE} using 'deploy:build' script..."
# RUN npx turbo run deploy:build --filter=${APP_SCOPE}

# # 6. Удаляем devDependencies
# RUN npm prune --omit=dev

# # ==============================================================================
# # Runner stage (остается почти таким же)
# # ==============================================================================
# FROM base AS runner
# ARG APP_SCOPE
# # WORKDIR /app # Уже унаследован от base

# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 appuser

# # Копируем артефакты из 'builder' (который работал в /app)
# COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=appuser:nodejs /app/apps/${APP_SCOPE}/dist ./apps/${APP_SCOPE}/dist
# COPY --from=builder --chown=appuser:nodejs /app/apps/${APP_SCOPE}/package.json ./apps/${APP_SCOPE}/package.json
# COPY --from=builder --chown=appuser:nodejs /app/apps/${APP_SCOPE}/entrypoint.sh ./apps/${APP_SCOPE}/entrypoint.sh
# RUN chmod +x ./apps/${APP_SCOPE}/entrypoint.sh

# USER appuser
# WORKDIR /app/apps/${APP_SCOPE}
# ENTRYPOINT ["./entrypoint.sh"]





















# # ==============================================================================
# # Base image with Node.js and basic tools
# # ==============================================================================
# FROM node:20-alpine AS base
# WORKDIR /app

# # Declare build arguments that will be passed from the CI workflow
# ARG APP_NAME             # e.g., 'backend'
# ARG APP_SCOPE            # e.g., 'backend' (from package.json 'name' field)
# ARG PRISMA_SCHEMA_PATH   # e.g., './apps/backend/prisma/schema.prisma' or empty

# # ==============================================================================
# # Turbo stage - Prunes the monorepo to only include necessary files
# # ==============================================================================
# FROM base AS turbo
# # Install turborepo globally to use the 'prune' command
# RUN npm install -g turbo
# # Copy the entire monorepo structure
# COPY . .
# # Prune the monorepo to only include files and dependencies for the target app
# RUN turbo prune --scope=${APP_SCOPE} --docker

# # ==============================================================================
# # Builder stage - Installs dependencies and builds the application
# # ==============================================================================
# FROM base AS builder

# # Install build tools needed for native Node.js modules (e.g., for bcrypt)
# RUN apk add --no-cache python3 make g++

# # Copy only the package manifests from the pruned monorepo
# COPY --from=turbo /app/out/json/ .
# COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# # Install all dependencies. We use --legacy-peer-deps to avoid strict peer
# # dependency errors common in complex monorepos. Prisma auto-generation
# # is disabled via a package.json override.
# RUN --mount=type=cache,target=/var/cache/npm npm install --legacy-peer-deps

# # Copy the full source code of the pruned application
# COPY --from=turbo /app/out/full/ .

# # Declare arguments for Turborepo remote caching (optional)
# ARG TURBO_TOKEN
# ARG TURBO_TEAMID
# ARG TURBO_API

# # Manually run prisma generate ONLY IF a schema path was provided.
# # The 'if [ -n "$VAR" ]' construct checks if the variable is not empty.
# RUN if [ -n "$PRISMA_SCHEMA_PATH" ]; then npx prisma generate --schema="$PRISMA_SCHEMA_PATH"; fi

# # Build the application using Turborepo
# RUN npx turbo run build --filter=${APP_SCOPE}

# # Remove development dependencies to reduce the final image size
# RUN npm prune --production

# # ==============================================================================
# # Runner stage - The final, small, and secure image to run the application
# # ==============================================================================
# FROM base AS runner

# # Create a non-root user for security best practices
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 user
# RUN chown -R user:nodejs /app
# USER user

# # Copy the built application and production node_modules from the builder stage
# COPY --from=builder --chown=user:nodejs /app .

# # Set the working directory to the specific app's folder
# WORKDIR /app/apps/${APP_SCOPE}

# # The command to run when the container starts.
# # It first applies database migrations and then starts the Node.js application.
# CMD npm run db:migrate:deploy && node ./dist/main.js
