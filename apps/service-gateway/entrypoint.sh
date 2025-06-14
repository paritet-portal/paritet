#!/bin/sh
# Используем /bin/sh, так как Alpine по умолчанию имеет ash, который совместим с sh.
# Если wait-for-it.sh строго требует bash, то первая строка должна быть #!/bin/bash
# и bash должен быть установлен в Dockerfile. Давайте попробуем с sh.
set -e

# --- ОЖИДАНИЕ POSTGRESQL ---
# POSTGRES_HOST должно быть именем сервиса PostgreSQL в docker-compose.yml (например, 'postgres')
# POSTGRES_PORT обычно 5432
# Эти значения можно передать как переменные окружения или захардкодить, если они статичны.
# Для примера, используем 'postgres' и '5432' напрямую.

# ./wait-for-it.sh должен находиться в той же директории, что и entrypoint.sh
# (т.е. /app/apps/backend/wait-for-it.sh в контейнере, если WORKDIR=/app/apps/backend)

echo "Backend: Waiting for PostgreSQL (postgres:5432)..."
./wait-for-it.sh postgres:5432 -t 60 --strict -- echo "Backend: PostgreSQL is up and running!"
# --- КОНЕЦ ОЖИДАНИЯ POSTGRESQL ---

echo "Backend: Applying database migrations..."
# Убедитесь, что конфигурация подключения к БД в вашем приложении (используемая npm run db:migrate)
# берет хост и порт из переменных окружения, которые указывают на 'postgres:5432',
# а не на 'localhost'.
npm run db:migrate
echo "Backend: Migrations complete."

echo "Backend: Starting application..."
exec npm run start:app

# #!/bin/sh
# set -e
# echo "Notifications Service: Running pre-start (db:migrate)..."
# npm run db:migrate # Выведет echo
# echo "Notifications Service: Starting application..."
# exec npm run start:app
