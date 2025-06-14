#!/bin/sh
# Используем /bin/sh. Если wait-for-it.sh строго требует bash,
# то первая строка должна быть #!/bin/bash и bash должен быть установлен в Dockerfile.
set -e

# --- ОЖИДАНИЕ MONGODB ---
# MONGO_HOST должно быть именем сервиса MongoDB в docker-compose.yml (например, 'mongo')
# MONGO_PORT обычно 27017

echo "Chat: Waiting for MongoDB (mongo:27017)..."
# ./wait-for-it.sh должен находиться в той же директории, что и entrypoint.sh
# (т.е. /app/apps/chat/wait-for-it.sh в контейнере, если WORKDIR=/app/apps/chat)
./wait-for-it.sh mongo:27017 -t 60 --strict -- echo "Chat: MongoDB is up and running!"
# --- КОНЕЦ ОЖИДАНИЯ MONGODB ---

echo "Chat: Running DB seed script..." # Или "Applying migrations", если это миграции
# Убедитесь, что конфигурация подключения к MongoDB в вашем приложении (используемая npm run db:migrate)
# берет хост и порт из переменных окружения, которые указывают на 'mongo:27017',
# а не на 'localhost'. И что строка подключения (например, CHAT_MONGODB_URI) правильная.
npm run db:migrate # Если это действительно команда для MongoDB, или db:seed
echo "Chat: DB seed script complete."

echo "Chat: Starting application..."
exec npm run start:app

# #!/bin/sh
# set -e
# echo "Chat: Running DB seed script..."
# npm run db:migrate
# echo "Chat: DB seed script complete."
# echo "Chat: Starting application..."
# exec npm run start:app
