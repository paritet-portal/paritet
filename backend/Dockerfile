# Этап 1: Сборка Nest.js приложения
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

# Скопируй package.json и package-lock.json
COPY package.json package-lock.json ./

# Установи зависимости
RUN npm install

# Скопируй весь исходный код
COPY . .

# Собери Nest.js приложение в JavaScript
RUN npm run build

# Этап 2: Запуск Nest.js приложения в production-режиме
FROM public.ecr.aws/docker/library/node:20-alpine AS runner

# ... (закомментированный код пользователя)

WORKDIR /app

# Скопируй только необходимые production-зависимости и скомпилированный код из этапа builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
# ... (закомментированный код для public/static)

# Установи переменные окружения, необходимые для выполнения приложения
ENV PORT=3500 
# ENV DATABASE_URL=postgresql://user:password@host:port/database_name # Пример
# ENV JWT_SECRET=your_jwt_secret_for_backend # <--- ОБЯЗАТЕЛЬНО ИЗМЕНИ ЭТО!
# ... (остальные ENV переменные, если есть)

# Порт, на котором будет слушать Nest.js
EXPOSE 3500 

# Запусти скомпилированное Nest.js приложение
CMD ["node", "dist/main"]