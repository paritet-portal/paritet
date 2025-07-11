export interface RegisterClientPayload {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

export interface RegisterSpecialistPayload {
    fullName: string;
    email: string;
    // Пароль может не отправляться на бэк в payload, но если отправляется, то укажите
    password: string; 
    specialistType: string;
    locationCountry: string;
    locationCity: string;
    phone: string; // Обратите внимание на формат телефона! Он будет полным, с кодом страны.
    countryCode: string;
    licenseNumber: string;
    referrer?: string; // Опциональное поле
    // recaptchaToken: string; // Если токен отправляется на бэк
}