#!/bin/sh
set -e
echo "Chat: Running DB seed script..."
npm run db:migrate
echo "Chat: DB seed script complete."
echo "Chat: Starting application..."
exec npm run start:app
