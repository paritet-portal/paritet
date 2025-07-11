export interface User {
    id: string;
    email: string;
    role: 'client' | 'specialist';
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}