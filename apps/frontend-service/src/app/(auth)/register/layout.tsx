import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Хук для отримання поточного шляху на клієнті
'use client'; // Цей layout буде клієнтським, бо використовує хук usePathname для активного стану табів

// Можна створити окремий компонент для табів
const RegistrationTabs = () => {
    const pathname = usePathname();

    const getTabClassName = (path: string) => {
        return pathname === path
            ? 'bg-blue-600 text-white px-6 py-2 rounded-md' // Стиль для активного табу
            : 'bg-gray-200 text-gray-700 px-6 py-2 rounded-md'; // Стиль для неактивного
    };

    return (
        <div className="flex justify-center gap-2 mb-10">
            <Link href="/register/specialist" passHref>
                <button className={getTabClassName('/register/specialist')}>
                    Як спеціаліст
                </button>
            </Link>
            <Link href="/register/client" passHref>
                <button className={getTabClassName('/register/client')}>
                    Як споживач
                </button>
            </Link>
        </div>
    );
};


export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-6">
                    Зареєструватися
                </h1>

                {/* Наші спільні таби */}
                <RegistrationTabs />

                {/* Тут буде рендеритись вміст page.tsx з папок /register, /register/client або /register/specialist */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}