// apps/api/prisma/seed.ts

import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Створюємо екземпляр Prisma Client
const prisma = new PrismaClient();

// Основна асинхронна функція для сідингу
async function main() {
    console.log('Seeding started...');

    // 1. Хешуємо пароль (НІКОЛИ не зберігайте паролі у відкритому вигляді)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('P@ssword123', saltRounds);

    // 2. Видаляємо старі дані, щоб уникнути дублікатів (порядок важливий!)
    // Спочатку видаляємо залежні таблиці (профілі)
    await prisma.clientProfile.deleteMany({});
    await prisma.specialistProfile.deleteMany({});
    // Потім основну таблицю користувачів
    await prisma.user.deleteMany({});
    console.log('Deleted old data.');

    // 3. Створюємо користувача-клієнта разом з його профілем
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@paritet.com',
            password: hashedPassword,
            role: UserRole.CLIENT,
            isEmailVerified: true,
            phoneNumber: '+380501112233',
            // Вкладене створення профілю клієнта
            clientProfile: {
                create: {
                    // Тут можна додати поля, специфічні для профілю клієнта, коли вони з'являться
                },
            },
        },
    });
    console.log(`Created client user: ${clientUser.email}`);

    // 4. Створюємо користувача-спеціаліста разом з його профілем
    const specialistUser = await prisma.user.create({
        data: {
            email: 'specialist@paritet.com',
            password: hashedPassword,
            role: UserRole.SPECIALIST,
            isEmailVerified: true,
            phoneNumber: '+380971112233',
            // Вкладене створення профілю спеціаліста
            specialistProfile: {
                create: {
                    // Тут можна додати поля, специфічні для профілю спеціаліста, коли вони з'являться
                    // наприклад, resumeUrl, hourlyRate і т.д.
                },
            },
        },
    });
    console.log(`Created specialist user: ${specialistUser.email}`);

    // 5. Створюємо користувача-адміна (у нього немає окремого профілю згідно нашої схеми)
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@paritet.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
            isEmailVerified: true,
        },
    });
    console.log(`Created admin user: ${adminUser.email}`);

    console.log('Seeding finished.');
}

// Запускаємо основну функцію і обробляємо можливі помилки
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // В кінці обов'язково відключаємось від бази даних
        await prisma.$disconnect();
    });