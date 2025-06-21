'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main>
      <h1>{t('title')}</h1>
      {/* <p>{t('welcomeMessage')}</p> */} {/* Закомментируйте, если этого ключа нет в упрощенном i18n.ts */}
    </main>
  );
}
