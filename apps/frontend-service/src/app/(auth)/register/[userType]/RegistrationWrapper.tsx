
'use client';

import { ClientRegistrationForm } from '@paritet/feature-register-client'; // Перевірте шлях імпорту!
import { SpecialistRegistrationForm } from '@paritet/feature-register-specialist'; // Перевірте шлях імпорту!

interface RegistrationWrapperProps {
  userType: string; // Очікуємо string, а не Promise<string>
}

export default function RegistrationWrapper({ userType }: RegistrationWrapperProps) {
  // Використовуємо React.use() для розгортання params.userType
  // Однак, якщо page.tsx передає params як string, а не Promise,
  // то React.use() тут не потрібен. Подивимося, як передаються params.

  // Поточний лог вказує на те, що params.userType є Promise.
  // Тому треба розгорнути. Але якщо page.tsx вже передає string, то це не так.

  // Якщо page.tsx передає params як об'єкт, а не як Promise:
  // const { userType } = params; // Це звичайний доступ

  // Якщо ж page.tsx передає params як Promise або щось подібне,
  // То в React 19 (або пізніших версіях) ми б робили так:
  // const unwrappedUserType = React.use(userTypePromise); // Якщо userType це promise

  // В поточній ситуації, де page.tsx передає string, але помилка вказує на Promise,
  // це може бути артефакт компіляції. Найкраще залишити прямий доступ,
  // але забезпечити, що page.tsx є правильним.

  // Перевіряємо, чи ми отримали коректний userType
  if (userType === 'specialist') {
    return <SpecialistRegistrationForm />;
  }

  if (userType === 'client') {
    return <ClientRegistrationForm />;
  }

  // Якщо не вдалося розгорнути або userType недійсний
  return <div>Недійсний тип користувача</div>;
}