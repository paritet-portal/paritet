// Тип даних, що відправляються на сервер для логіну
export interface LoginCredentials {
    email: string;
    password: string;
}

// Тип даних для реєстрації споживача
export interface RegisterConsumerPayload {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string; // Опціональне поле
}

// Тип даних для реєстрації спеціаліста
export interface RegisterSpecialistPayload {
    specialistType: 'lawyer' | 'notary' | 'accountant' | 'auditor'; // Приклад з ТЗ
    companyName?: string;
    fullName: string;
    email: string;
    password: string;
    licenseNumber?: string;
    // ... інші поля з форми реєстрації спеціаліста
}

// Уніфікована відповідь від сервера після успішного логіну або реєстрації
export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role: 'client' | 'specialist'; // Роль, яку повертає бекенд
    };
}

// Тип для помилки валідації від API
export interface ApiError {
    message: string | string[];
    error: string;
    statusCode: number;
}

export function isApiError(payload: unknown): payload is ApiError {
    // Перевіряємо, що це не null і є об'єктом
    if (payload === null || typeof payload !== 'object') {
        return false;
    }
    // Перевіряємо наявність ключових полів
    return 'message' in payload && 'statusCode' in payload && 'error' in payload;
}