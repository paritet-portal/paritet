import { notFound } from 'next/navigation';

// Імпортуємо обидві "розумні" обгортки або форми з наших бібліотек
// Припустимо, ви створили їх у відповідних feature-бібліотеках
import { SpecialistRegistration } from '@paritet/auth/feature-register-specialist';
import { ClientRegistration } from '@paritet/auth/feature-register-client';

// Компонент сторінки отримує 'params' як пропс
export default function RegistrationPage({ params }: { params: { userType: string } }) {
    const { userType } = params;

    // Функція для рендерингу правильної форми
    const renderRegistrationForm = () => {
        if (userType === 'specialist') {
            // Якщо URL /register/specialist, показуємо компонент для спеціаліста
            return <SpecialistRegistration />;
        }

        if (userType === 'client') {
            // Якщо URL /register/client, показуємо компонент для клієнта
            return <ClientRegistration />;
        }

        // Якщо URL якийсь інший (напр. /register/foo), показуємо сторінку 404
        return notFound();
    };

    return (
        <div className="container mx-auto py-12">
            {/* Динамічно рендеримо потрібну форму */}
            {renderRegistrationForm()}
        </div>
    );
}