//libs\auth\feature-register-client\src\lib\validation\register.schema.ts

import { z } from 'zod';

export const registerClientSchema = z.object({
    fullName: z.string().min(2, 'Введіть повне імʼя'),
    email: z.string().email('Невалідний email'),
    password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
    confirmPassword: z.string().min(6, 'Підтвердіть пароль'),
    phoneNumber: z.string().regex(/^\+38\d{10}$/, 'Невалідний номер телефону'),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'Ви повинні погодитись з правилами порталу' }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
});

export type RegisterClientFormData = z.infer<typeof registerClientSchema>;
