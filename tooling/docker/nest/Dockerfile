
FROM node:20-alpine AS installer
WORKDIR /app
RUN corepack enable

COPY package.json package-lock.json* ./

RUN npm install --omit=dev





FROM node:20-alpine AS builder
ARG APP_NAME
WORKDIR /app
# ENV APP_NAME=${APP_NAME}
RUN corepack enable

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npx nx sync --force
# RUN npx nx build ${APP_NAME} --skip-nx-cache
RUN npx nx run-many --target=build --projects=${APP_NAME} --with-deps --skip-nx-cache






FROM node:20-alpine AS runner
ARG APP_NAME 
WORKDIR /app

# ENV APP_NAME=${APP_NAME}
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json

COPY --from=builder /app/apps/${APP_NAME}/dist ./dist


USER nextjs

CMD ["node", "dist/main.js"]