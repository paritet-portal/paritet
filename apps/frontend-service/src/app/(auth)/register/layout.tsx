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
    <div className="container  min-h-screen flex flex-col items-center justify-start bg-white p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Зареєструватися</h1>

      <div className="flex mb-12 w-full ">
        <div className="w-1/2 flex justify-start  px-8">
          <Link href="/register/specialist">
            <button
              className={`text-xl font-medium p-3  ${currentPath === '/register/specialist'
                  ? 'text-white bg-blue-500 dark:bg-blue-600 rounded-md'
                  : 'text-gray-500 hover:text-blue-600'
                }`}
            >
              Як спеціаліст
            </button>
          </Link>
        </div>

        <div className="w-1/2 flex justify-start px-8">
          <Link href="/register/client">
            <button
              className={`text-xl font-medium p-3 ${currentPath === '/register/client'
                  ? 'text-white bg-blue-500 dark:bg-blue-600 rounded-md'
                  : 'text-gray-500 hover:text-blue-600'
                }`}
            >
              Як споживач
            </button>
          </Link>
        </div>
      </div>


      {children}
    </div>
  );
}
