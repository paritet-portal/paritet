// apps/web/src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk'] as const, // Используйте 'as const' для лучших типов
  defaultLocale: 'en', // Ваша дефолтная локаль
  localePrefix: 'as-needed', // или 'always'
  // pathnames: { ... } // если нужны кастомные пути
});
