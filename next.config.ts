/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/portal', // ЦЕЙ РЯДОК МАЄ БУТИ ТУТ!
  assetPrefix: '/portal/', // <<<<<<< ДОДАЙТЕ АБО ПЕРЕВІРТЕ ЦЕЙ РЯДОК!
  
  // Додайте або перевірте цей блок, якщо у вас є статичні зображення/файли в public/
  images: {
    unoptimized: true, // Рекомендовано для складних розгортань, якщо ви не використовуєте Next.js Image Optimization на сервері
  },

  // Якщо ви використовуєте app/router або експериментальні фічі
  experimental: {
    appDir: true, // Якщо використовуєте App Router
    // ... інші ваші експериментальні фічі
  },

  // ... інші ваші налаштування
};

module.exports = nextConfig;