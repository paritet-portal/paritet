import { AuthResponse } from '@paritet/shared-types';
import { redirectToRoleApp } from './redirect-to-role-app.js';

interface HandleAuthSuccessOptions {
    authData: AuthResponse;
    callbackUrl?: string | null;
}

export function handleAuthSuccess({ authData, callbackUrl }: HandleAuthSuccessOptions) {
    if (typeof window === 'undefined') return;

    // TODO: Якщо використовуєш Zustand:
    // import { useAuthStore } from '@paritet/shared-state';
    // useAuthStore.setState({ user: authData.user });

    if (callbackUrl) {
        window.location.href = callbackUrl;
        return;
    }

    redirectToRoleApp(authData.user);
}
