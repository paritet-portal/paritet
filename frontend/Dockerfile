# Этап 1: Сборка статических файлов Next.js
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

# Скопируй package.json и package-lock.json
COPY package.json package-lock.json ./

# Установи зависимости
RUN npm install

# Скопируй весь код приложения
COPY . .

# Собери приложение Next.js для production
RUN npm run build

# Этап 2: Запуск приложения
FROM public.ecr.aws/docker/library/node:20-alpine AS runner

WORKDIR /app

# Скопируй зависимости Next.js, production-бинарники и статические файлы из этапа builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Установи переменные окружения, которые будут использоваться во время выполнения
ENV PORT=3000 
ENV NEXT_PUBLIC_API_URL=http://backend:3500/api 
# ... (остальные ENV переменные, если есть)

# Открой порт, на котором будет слушать Next.js
EXPOSE 3000 

# Запусти приложение Next.js в production-режиме
CMD ["npm", "start"]