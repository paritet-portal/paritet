'use client'; 

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4">{t('welcomeMessage')}</p>
    </main>
  );
}
