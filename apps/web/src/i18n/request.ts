// apps/web/src/i18n/request.ts
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; // Импорт из соседнего файла

// Этот лог поможет понять, загружается ли этот файл
console.log('[i18n/request.ts] File execution started (module loaded).');

export default getRequestConfig(async ({requestLocale}) => {
  console.log(`[i18n/request.ts] getRequestConfig called, trying to determine locale from requestLocale: "${await requestLocale}"`);

  // requestLocale это Promise<string> в Next.js 15
  const resolvedRequestLocale = await requestLocale;

  const locale = hasLocale(routing.locales, resolvedRequestLocale)
    ? resolvedRequestLocale
    : routing.defaultLocale;

  console.log(`[i18n/request.ts] Determined locale: "${locale}"`);

  try {
    // Путь от src/i18n/request.ts к src/messages/
    console.log(`[i18n/request.ts] Attempting to import messages: ../messages/${locale}.json`);
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(`[i18n/request.ts] Successfully loaded messages for locale: "${locale}"`);
    return {
      locale, // Важно вернуть locale здесь
      messages
    };
  } catch (error) {
    console.error(`[i18n/request.ts] Failed to import messages for locale "${locale}":`, error);
    // Можно вернуть пустые сообщения или вызывать notFound() из 'next/navigation'
    return { locale, messages: {} };
    // import {notFound} from 'next/navigation'; notFound();
  }
});
