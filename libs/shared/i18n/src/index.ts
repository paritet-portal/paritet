// export * from './lib/i18n.js';
// libs/shared/i18n/src/index.ts

// Импортируем JSON файлы с переводами
import enLocales from './locales/en.json';
import ruLocales from './locales/ru.json';

// Определяем поддерживаемые локали (можно расширить)
type Locale = 'en' | 'ru';

// Храним все локали в одном объекте
const locales: Record<Locale, Record<string, string>> = {
  en: enLocales,
  ru: ruLocales,
};

// Переменная для хранения текущей выбранной локали
let currentLocale: Locale = 'en'; // По умолчанию английский

// Функция для установки текущей локали
export const setLocale = (locale: Locale) => {
  if (locales[locale]) {
    currentLocale = locale;
    // В реальном приложении здесь может быть обновление состояния
    // или сохранение в localStorage/sessionStorage
  } else {
    console.warn(`Locale "${locale}" not supported. Using "${currentLocale}" instead.`);
  }
};

// Основная функция для получения перевода (translation function)
export const t = (key: string, values?: Record<string, any>): string => {
  // Получаем перевод для текущей локали, если ключ существует
  let translation = locales[currentLocale]?.[key];

  // Если перевод не найден для текущей локали, возвращаем сам ключ
  if (translation === undefined) {
    console.warn(`Translation key "${key}" not found for locale "${currentLocale}".`);
    return key;
  }

  // Заменяем плейсхолдеры в переводе, если они есть
  if (values) {
    for (const valueKey in values) {
      // Простая замена. Для более сложных случаев (например, форматирование чисел/дат)
      // стоит использовать библиотеки типа i18next.
      translation = translation.replace(`{${valueKey}}`, String(values[valueKey]));
    }
  }

  return translation;
};

// Экспорт текущей локали, если нужно
export const getCurrentLocale = (): Locale => currentLocale;

// Можно также экспортировать все доступные локали, если это потребуется другим частям приложения
export { locales };
