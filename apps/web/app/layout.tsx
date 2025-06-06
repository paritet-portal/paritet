import '../styles/globals.css';

import { Lexend } from 'next/font/google';
import React from 'react';
// import { ClerkProvider } from '@clerk/nextjs';

const lexend = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-svg ${lexend.className}`}>
        <div className="mx-auto max-w-7xl p-6">
              <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
