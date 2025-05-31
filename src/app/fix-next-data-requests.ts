// src/utils/fix-next-data-requests.ts (або utils/fix-next-data-requests.ts)
"use client"; // Важливо для App Router, щоб це виконувалося на клієнті

// Базовий шлях, який має бути доданий
const BASE_PATH = '/portal'; // <<<<<<< ВКАЖІТЬ ТУТ ВАШ БАЗОВИЙ ШЛЯХ

if (typeof window !== 'undefined' && window.fetch) {
  const { fetch: originalFetch } = window;

  // Регулярні вирази для перевірки problematic URL без basePath
  // Розширений, щоб включати .css, .js, .json, .svg, .woff2, .jpeg, .pnm
  // Також включає типові файли з public/ (next.svg, favicon.ico, robots.txt, sitemap.xml)
  const problematicPathsRegex = /^\/(_next\/(?:static|data)\/(?:css|chunks|media)\/.*(?:\.css|\.js|\.json|\.woff2|\.jpeg|\.pnm|\.svg)|(?:next\.svg|favicon\.ico|robots\.txt|sitemap\.xml|file\.svg|window\.svg|globe\.svg|.+\.(?:jpeg|pnm|svg|ico|txt|png|jpg|gif|webp)))$/;

  // Змінено типізацію для window.fetch
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => { // Коректна типізація fetch
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : ''; // Отримуємо URL як рядок

    if (url && problematicPathsRegex.test(url)) {
      // Якщо URL починається з /_next/static/ або /_next/data/
      // АБО це кореневий статичний файл (як next.svg)
      // І в ньому ВІДСУТНІЙ BASE_PATH
      if (!url.startsWith(BASE_PATH + '/')) { // Перевірка, що basePath ще не доданий
        const newUrl = `${BASE_PATH}${url}`; // Додаємо basePath до problematic URL
        console.warn(`[Client-side fix] Rewriting URL from "${url}" to "${newUrl}"`);
        // Перезаписуємо input з новим URL, залишаючи init без змін
        input = newUrl; 
      }
    }
    
    // Виконуємо оригінальний fetch з, можливо, зміненим URL
    return originalFetch(input, init);
  };
}