import { RegisterClientDto, RegisterSpecialistDto } from '@paritet/auth-dtos';
import { API_BASE_URL } from '@paritet/config';
import { handleResponse } from './handle-response.js';
import { AuthResponse, LoginCredentials } from './types.js';

export type RegisterClientPayload = RegisterClientDto;
export type RegisterSpecialistPayload = RegisterSpecialistDto;

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse<AuthResponse>(response);
    },

    registerClient: async (
        payload: RegisterClientPayload
    ): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/register/client`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return handleResponse<AuthResponse>(response);
    },

    registerSpecialist: async (
        payload: RegisterSpecialistPayload
    ): Promise<AuthResponse> => {
        const response = await fetch(`${API_BASE_URL}/auth/register/specialist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return handleResponse<AuthResponse>(response);
    },


    logout: async (): Promise<void> => {
        console.log('Logout request sent.');
        return Promise.resolve();
    },
};
