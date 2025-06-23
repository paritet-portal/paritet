import { routing } from '@/i18n/routing'; // или относительный путь '../../i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server'; // Изменено здесь
import type { ReactNode } from 'react';

interface LocaleParams { locale: string; }
interface LayoutProps { children: ReactNode; params: Promise<LocaleParams>; }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!hasLocale(routing.locales, locale)) {
    const {notFound} = await import('next/navigation');
    notFound();
  }

  setRequestLocale(locale);



  return (
    <html lang={locale}>
      <body>
        {/* Для NextIntlClientProvider: если request.ts и плагин работают,
            то NextIntlClientProvider может не требовать явной передачи messages.
            Но если будут проблемы, можно попробовать передать messages, полученные через getMessages().
            Начните без явной передачи messages. */}
        <NextIntlClientProvider locale={locale} /* messages={messages} */ >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
