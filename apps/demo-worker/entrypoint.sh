#!/bin/sh
set -e

# --- ОЖИДАНИЕ REDIS ---
# REDIS_HOST должно быть именем сервиса Redis в docker-compose.yml (например, 'redis')
# REDIS_PORT обычно 6379

echo "Notifications Service: Waiting for Redis (redis:6379)..."
# ./wait-for-it.sh должен находиться в той же директории, что и entrypoint.sh
./wait-for-it.sh redis:6379 -t 60 --strict -- echo "Notifications Service: Redis is up and running!"
# --- КОНЕЦ ОЖИДАНИЯ REDIS ---

echo "Notifications Service: Running pre-start (db:migrate)..."
# Если "db:migrate" для этого сервиса действительно что-то делает (например, проверки, сиды),
# или если это просто placeholder, убедитесь, что команда корректна.
# Для Redis обычно нет "миграций" в традиционном смысле.
npm run db:migrate # Эта команда будет выполнена после того, как Redis станет доступен.
echo "Notifications Service: Pre-start (db:migrate) complete."

echo "Notifications Service: Starting application..."
exec npm run start:app

# #!/bin/sh
# set -e
# echo "Notifications Service: Running pre-start (db:migrate)..."
# npm run db:migrate # Выведет echo
# echo "Notifications Service: Starting application..."
# exec npm run start:app
