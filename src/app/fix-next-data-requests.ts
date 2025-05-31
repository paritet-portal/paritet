// app/fix-next-data-requests.ts
"use client"; // Важливо для App Router, щоб це виконувалося на клієнті

if (typeof window !== 'undefined') { // Перевірка, що це браузерне середовище
  const { fetch: originalFetch } = window;
  const nextDataRequestRegex = /^\/_next\/data\/.*\.json/;

  window.fetch = async (...args) => {
    const [url] = args;
    // Перевіряємо, чи це problematic `/_next/data/` запит
    if (nextDataRequestRegex.test(url)) {
      // Якщо це такий запит, ми відхиляємо його, щоб він не викликав 404
      // Це може призвести до того, що деякі дані не завантажуватимуться,
      // якщо вони потрібні для клієнтської навігації, але це обхідний шлях
      console.warn(`Blocked potentially problematic _next/data/ request: ${url}`);
      return Promise.reject(new Error(`Blocked _next/data/ request: ${url}`));
    }
    // В іншому випадку, виконуємо оригінальний fetch
    return originalFetch(...args);
  };
}