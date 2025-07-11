'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Зареєструватися</h1>

      <div className="flex space-x-8 mb-12">
        <Link href="/register/specialist">
          <button
            className={`text-xl font-medium pb-2 px-4 ${
              currentPath === '/register/specialist'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Як спеціаліст
          </button>
        </Link>

        <Link href="/register/client">
          <button
            className={`text-xl font-medium pb-2 px-4 ${
              currentPath === '/register/client'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Як споживач
          </button>
        </Link>
      </div>

      {children}
    </div>
  );
}
