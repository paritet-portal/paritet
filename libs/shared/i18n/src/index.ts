// libs/shared/i18n/src/index.ts

// Импорты ваших JSON файлов с локализациями
import enLocales from './locales/en.json';
import ruLocales from './locales/ru.json';

// Определение типа для ваших языков. Убедитесь, что это совпадает с ключами объекта locales.
type Locale = 'en' | 'ru';

// Определение объекта, который хранит все ваши локализованные строки
// Record<Locale, Record<string, string>> означает:
// - Это объект (Record)
// - Ключи этого объекта - это типы Locale ('en' или 'ru')
// - Значениями являются другие объекты (Record)
//   - Ключи этих вложенных объектов - строки (ключи переводов)
//   - Значениями являются строки (сам перевод)
const locales: Record<Locale, Record<string, string>> = {
  en: enLocales,
  ru: ruLocales,
};

// Функция для получения перевода, которая также обрабатывает подстановку значений
export const t = (
  locale: Locale,
  key: string,
  values?: Record<string, any> // Необязательные значения для подстановки в строку перевода
): string => {
  // Пытаемся получить перевод для указанной локали и ключа
  let translation = locales[locale]?.[key];

  // Если перевод не найден, выводим предупреждение и возвращаем сам ключ
  if (translation === undefined) {
    console.warn(`Translation key "${key}" not found for locale "${locale}".`);
    return key; // Возвращаем ключ как запасной вариант
  }

  // Если есть значения для подстановки, проходим по ним и заменяем в строке перевода
  if (values) {
    for (const valueKey in values) {
      // Заменяем {ключ} на значение
      translation = translation.replace(`{${valueKey}}`, String(values[valueKey]));
    }
  }
  return translation;
};

// Экспортируем тип Locale и объект locales, чтобы их можно было использовать в других частях приложения
// Например, в next.config.js или в компонентах Next.js для настройки i18n.
export { Locale, locales };


