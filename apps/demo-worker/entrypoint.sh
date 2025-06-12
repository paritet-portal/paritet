#!/bin/sh
set -e
echo "Notifications Service: Running pre-start (db:migrate)..."
npm run db:migrate # Выведет echo
echo "Notifications Service: Starting application..."
exec npm run start:app
