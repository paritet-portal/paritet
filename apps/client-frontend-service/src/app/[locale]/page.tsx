// paritet\apps\client-frontend-service\src\app\[locale]\page.tsx
'use client'; // <-- Добавляем эту директиву

import { Locale, t } from '@paritet/shared-i18n';
import { useParams } from 'next/navigation'; // Используем хук для получения параметров
import { useEffect, useState } from 'react';

// Интерфейс для параметров из useParams
interface Params {
  locale: Locale;
}

export default function LocalePage() {
  const params = useParams<Params>(); // Получаем параметры из хука
  const [currentLocale, setCurrentLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (params && params.locale) {
      // Проверяем, что локаль поддерживается
      if (params.locale === 'en' || params.locale === 'ru') {
        setCurrentLocale(params.locale);
      } else {
        console.warn(`Unsupported locale "${params.locale}" in URL. Using default 'en'.`);
        setCurrentLocale('en'); // Безопасное падение на 'en'
      }
    } else {
      // Если params.locale не найден (что не должно произойти в app/[locale]/...),
      // падаем на 'en'.
      console.warn('Locale not found in params. Using default "en".');
      setCurrentLocale('en');
    }
  }, [params]); // Пересчитываем, если params меняются

  if (!currentLocale) {
    // Показываем что-то во время загрузки, пока currentLocale не установлен
    return <div>Loading locale...</div>;
  }

  console.log(`Rendering page for locale: ${currentLocale} via src/app/[locale]/page.tsx (client component)`);
  console.log('Params object:', params);
  console.log('currentLocale:', currentLocale);

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>frontend-service Local</h1>
            <div>
              <h1>{t(currentLocale, 'pageTitle')}</h1>
              <p>{t(currentLocale, 'greeting', { name: 'Server User' })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}