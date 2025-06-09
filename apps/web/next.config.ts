// apps/web/next.config.js

import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// В ESM __dirname отсутствует, поэтому создаем его вручную. Это стандартная практика.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {NextConfig}
 */
const nextConfig = {
  // Включаем строгий режим React для выявления потенциальных проблем
  reactStrictMode: true,

  // --- НАСТРОЙКИ ДЛЯ ПРОДАКШЕН-СБОРКИ И DOCKER ---

  /**
   * Создает изолированную папку `.next/standalone`, которая содержит
   * только необходимые для запуска файлы.
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
   */
  output: 'standalone',

  /**
   * В монорепозитории эта опция говорит Next.js, откуда начинать поиск
   * зависимостей. Мы указываем корень проекта (две папки вверх).
   * Это КРИТИЧЕСКИ ВАЖНО для правильной работы в монорепо.
   */
  outputFileTracingRoot: path.join(__dirname, '../../'),


  // --- ОПЦИИ, КОТОРЫЕ МОЖНО ДОБАВИТЬ ПОЗЖЕ, ЕСЛИ ПОНАДОБЯТСЯ ---

  // Если вам нужно транспилировать общие пакеты (например, @package/ui):
  // transpilePackages: ['@package/ui'],

  // Если вам нужно обрабатывать изображения с внешних доменов:
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //     },
  //   ],
  // },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

