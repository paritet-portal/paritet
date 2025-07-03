import Link from 'next/link';
import { Button } from '@paritet/shared/ui'; // Припустимо, у вас є спільна кнопка

export default function RegisterChoicePage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Зареєструватися як...</h1>
            <div className="flex gap-4">
                <Link href="/register/client" passHref>
                    <Button size="lg">Споживач</Button>
                </Link>
                <Link href="/register/specialist" passHref>
                    <Button size="lg" variant="outline">Спеціаліст</Button>
                </Link>
            </div>
        </div>
    );
}