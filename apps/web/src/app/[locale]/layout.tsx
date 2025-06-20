import { NextIntlClientProvider, useMessages } from 'next-intl';
import "../globals.css"; 

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}