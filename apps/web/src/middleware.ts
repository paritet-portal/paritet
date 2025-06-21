// apps/web/src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing'; // Импортируем routing.ts

export default function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing); // Передаем объект routing
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.json|sw.js|.*\\.[\\w]+$).*)', '/']
};
