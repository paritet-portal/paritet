// app/fix-next-data-requests.ts
"use client"; // Важливо для App Router, щоб це виконувалося на клієнті

if (typeof window !== 'undefined') { // Перевірка, що це браузерне середовище
  const { fetch: originalFetch } = window;
  const nextDataRequestRegex = /^\/_next\/data\/.*\.json/;

  // Перевизначення window.fetch з коректними типами
  // originalFetch може приймати (input: RequestInfo | URL, init?: RequestInit)
  // Ми знаємо, що Next.js зазвичай передає string як перший аргумент для /_next/data/
  // Тому можемо перевірити, чи перший аргумент є рядком перед тестуванням регулярного виразу
  window.fetch = async (...args: Parameters<typeof originalFetch>) => { // Коректне типізування args
    const [input] = args; // Змінено url на input
    
    // Перевіряємо, чи перший аргумент є рядком, і тільки тоді застосовуємо regex
    if (typeof input === 'string' && nextDataRequestRegex.test(input)) {
      console.warn(`Blocked potentially problematic _next/data/ request: ${input}`);
      return Promise.reject(new Error(`Blocked _next/data/ request: ${input}`));
    }
    // В іншому випадку, виконуємо оригінальний fetch з усіма аргументами
    return originalFetch(...args);
  };
}