# Этап 1: Сборка статических файлов Next.js
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

# Установи переменные окружения, которые будут использоваться во время сборки
# Если у тебя есть специфичные переменные окружения, необходимые для сборки (например, NEXT_PUBLIC_API_URL),
# раскомментируй и укажи их здесь. Иначе можешь удалить эту строку.
# ENV NEXT_PUBLIC_API_URL=https://api.workts.com.ua

WORKDIR /app

# Скопируй package.json и package-lock.json
# Это позволяет Docker кэшировать установку зависимостей
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
# Обязательно добавь все переменные, от которых зависит работа приложения
# Например, если у тебя есть переменная для API, которая нужна на фронтенде во время выполнения:
# ENV NEXT_PUBLIC_API_URL=https://api.workts.com.ua
#
# Если Next.js приложение не требует переменных окружения во время выполнения,
# и все переменные подставляются на этапе сборки (NEXT_PUBLIC_...), то эту строку можно удалить.
#
# Важно: Не включай сюда конфиденциальные переменные, такие как ключи API, базы данных и т.д.
# Их мы будем передавать через Docker Compose или переменные окружения VPS.

# Открой порт, на котором будет слушать Next.js
EXPOSE 3000

# Запусти приложение Next.js в production-режиме
CMD ["npm", "start"]