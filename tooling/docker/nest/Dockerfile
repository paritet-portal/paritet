# ==============================================================================
# Base image with Node.js and basic tools
# ==============================================================================
FROM node:20-alpine AS base
WORKDIR /app

# Declare build arguments that will be passed from the CI workflow
ARG APP_NAME             # e.g., 'backend'
ARG APP_SCOPE            # e.g., 'backend' (from package.json 'name' field)
ARG PRISMA_SCHEMA_PATH   # e.g., './apps/backend/prisma/schema.prisma' or empty

# ==============================================================================
# Turbo stage - Prunes the monorepo to only include necessary files
# ==============================================================================
FROM base AS turbo
# Install turborepo globally to use the 'prune' command
RUN npm install -g turbo
# Copy the entire monorepo structure
COPY . .
# Prune the monorepo to only include files and dependencies for the target app
RUN turbo prune --scope=${APP_SCOPE} --docker

# ==============================================================================
# Builder stage - Installs dependencies and builds the application
# ==============================================================================
FROM base AS builder

# Install build tools needed for native Node.js modules (e.g., for bcrypt)
RUN apk add --no-cache python3 make g++

# Copy only the package manifests from the pruned monorepo
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/package-lock.json ./package-lock.json

# Install all dependencies. We use --legacy-peer-deps to avoid strict peer
# dependency errors common in complex monorepos. Prisma auto-generation
# is disabled via a package.json override.
RUN --mount=type=cache,target=/var/cache/npm npm install --legacy-peer-deps

# Copy the full source code of the pruned application
COPY --from=turbo /app/out/full/ .

# Declare arguments for Turborepo remote caching (optional)
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API

# Manually run prisma generate ONLY IF a schema path was provided.
# The 'if [ -n "$VAR" ]' construct checks if the variable is not empty.
RUN if [ -n "$PRISMA_SCHEMA_PATH" ]; then npx prisma generate --schema="$PRISMA_SCHEMA_PATH"; fi

# Build the application using Turborepo
RUN npx turbo run build --filter=${APP_SCOPE}

# Remove development dependencies to reduce the final image size
# RUN npm prune --production

# ==============================================================================
# Runner stage - The final, small, and secure image to run the application
# ==============================================================================
FROM base AS runner

# Create a non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /app
USER user

# Copy the built application and production node_modules from the builder stage
COPY --from=builder --chown=user:nodejs /app .

# Set the working directory to the specific app's folder
WORKDIR /app/apps/${APP_SCOPE}

# The command to run when the container starts.
# It first applies database migrations and then starts the Node.js application.
CMD npm run db:migrate:deploy && node ./dist/main.js
