// libs/auth/feature-register-specialist/src/lib/validation/register.schema.ts
import { z } from 'zod';

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "ПІБ або назва компанії є обов'язковим полем" }),

    email: z
      .string()
      .email({ message: "Неправильний формат Email" }),

    password: z
      .string()
      .min(6, { message: "Пароль має містити щонайменше 6 символів" }),

    confirmPassword: z
      .string()
      .min(6, { message: "Пароль має містити щонайменше 6 символів" }),

    specialistType: z
      .string()
      .min(1, { message: "Тип спеціаліста є обов'язковим полем" }),

    locationCountry: z
      .string()
      .min(1, { message: "Країна проживання є обов'язковою" }),

    locationCity: z
      .string()
      .min(1, { message: "Місто/село є обов'язковим полем" }),

    phone: z
      .string()
      .min(7, { message: "Номер телефону має містити щонайменше 7 цифр" }),

    countryCode: z
      .string()
      .min(1, { message: "Код країни є обов'язковим" }),
      
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Ви повинні погодитись з правилами порталу' }),
    }),

    licenseNumber: z
      .string()
      .min(1, { message: "Номер ліцензії є обов'язковим полем" }),

    referrer: z.string().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type RegisterSpecialistSchema = z.infer<typeof registerSchema>;
