#!/bin/sh
set -e
echo "Backend: Applying database migrations..."
npm run db:migrate
echo "Backend: Migrations complete."
echo "Backend: Starting application..."
exec npm run start:app
