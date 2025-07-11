import { User } from '@paritet/shared-types';

export function redirectToRoleApp(user: User, fallbackUrl?: string) {
    if (typeof window === 'undefined') return;

    if (user.role === 'specialist') {
        window.location.href = process.env.NEXT_PUBLIC_SPECIALIST_APP_URL ?? fallbackUrl ?? '/';
    } else {
        window.location.href = process.env.NEXT_PUBLIC_CLIENT_APP_URL ?? fallbackUrl ?? '/';
    }
}
