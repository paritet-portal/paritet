import { create } from 'zustand';
import { User } from '@paritet/shared-types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),

    logout: () => set({ user: null, isAuthenticated: false }),
}));