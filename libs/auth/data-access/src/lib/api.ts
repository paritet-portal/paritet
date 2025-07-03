import {
    LoginCredentials,
    RegisterConsumerPayload,
    RegisterSpecialistPayload,
    AuthResponse,
    ApiError,
    isApiError,
} from "./types.js";



// Базовий URL до нашого API Gateway. Береться зі змінних середовища.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api';

/**
 * Універсальний обробник відповідей від fetch.
 * @param response - об'єкт Response від fetch
 */
async function handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
        return response.json() as Promise<T>;
    }

    const errorPayload = await response.json(); // Отримуємо payload, тип `any` або `unknown`

    // Перевіряємо, чи є це нашою очікуваною помилкою API
    if (isApiError(errorPayload)) {
        const message = Array.isArray(errorPayload.message)
            ? errorPayload.message.join(', ')
            : errorPayload.message;
        throw new Error(message);
    }

    // Якщо це не наша помилка, кидаємо загальну помилку
    throw new Error(`Request failed with status ${response.status}`);
}

/**
 * Об'єкт, що містить усі методи для взаємодії з Auth Service API.
 */
export const authApi = {
    /**
     * Надсилає запит на вхід користувача.
     * @param credentials - email та пароль
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    /**
     * Надсилає запит на реєстрацію нового споживача (клієнта).
     * @param payload - дані з форми реєстрації
     */
    registerConsumer: async (payload: RegisterConsumerPayload): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/register/consumer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return handleResponse<AuthResponse>(response);
    },

    /**
     * Надсилає запит на реєстрацію нового спеціаліста.
     * @param payload - дані з форми реєстрації
     */
    registerSpecialist: async (payload: RegisterSpecialistPayload): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/register/specialist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return handleResponse<AuthResponse>(response);
    },

    /**
     * Надсилає запит на вихід з системи.
     * У реальному житті цей запит може відправляти токен, щоб додати його в чорний список.
     */
    logout: async (): Promise<void> => {
        // Припустимо, на бекенді є ендпоінт для логауту
        // const token = localStorage.getItem('accessToken');
        // await fetch(`${API_BASE_URL}/auth/logout`, {
        //   method: 'POST',
        //   headers: { 'Authorization': `Bearer ${token}` },
        // });

        // Для простоти, просто імітуємо запит
        console.log('Logout request sent.');
        return Promise.resolve();
    },
};