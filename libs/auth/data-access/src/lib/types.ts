export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role: 'client' | 'specialist';
    };
}

export interface ApiError {
    message: string | string[];
    error: string;
    statusCode: number;
}

export function isApiError(payload: unknown): payload is ApiError {
    if (payload === null || typeof payload !== 'object') {
        return false;
    }
    return 'message' in payload && 'statusCode' in payload && 'error' in payload;
}